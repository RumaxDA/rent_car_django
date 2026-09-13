import pytest
from rentals.models.rental import Rental
from datetime import timedelta
from django.core.exceptions import ValidationError
from django.utils import timezone
from rentals.services.rental_service import complete_rental, check_car_availability


@pytest.mark.django_db
def test_should_create_rental(sample_car, sample_user):
    rental = Rental.objects.create(
        car=sample_car,
        user=sample_user,
        start_date=timezone.now() + timedelta(days=30),
        end_date=timezone.now() + timedelta(days=60),
        start_mileage=1000,
        status="reserved",
    )

    assert rental.car == sample_car
    assert rental.id is not None
    assert rental.start_mileage == 1000


@pytest.mark.django_db
def test_shouldnt_create_rental(sample_car, sample_user):
    rental = Rental(
        car=sample_car,
        user=sample_user,
        start_date=timezone.now() + timedelta(days=30),
        end_date=timezone.now(),
        start_mileage=1000,
        status="reserved",
    )

    with pytest.raises(ValidationError) as excinfo:
        rental.full_clean()

    assert "end_date" in excinfo.value.message_dict


@pytest.mark.django_db
def test_should_fail_when_end_date_is_before_start_date(sample_car, sample_user):
    rental = Rental(
        car=sample_car,
        user=sample_user,
        start_date=timezone.now() + timedelta(days=30),
        end_date=timezone.now(),
    )
    with pytest.raises(ValidationError):
        rental.full_clean()


@pytest.mark.django_db
def test_if_car_could_be_hire_when_already_reserved(
    sample_rental, sample_car, sample_user
):
    from django.contrib.auth import get_user_model

    User = get_user_model()
    other_user = User.objects.create_user(username="other_user", password="password123")

    rental_v2 = Rental(
        car=sample_car,
        user=other_user,
        start_date=sample_rental.start_date,
        end_date=sample_rental.end_date,
        start_mileage=10000,
    )

    with pytest.raises(ValidationError) as excinfo:
        rental_v2.full_clean()

    assert (
        "car" in excinfo.value.message_dict or "__all__" in excinfo.value.message_dict
    )

    assert Rental.objects.count() == 1
    existing_rental = Rental.objects.first()
    assert existing_rental.id == sample_rental.id


@pytest.mark.django_db
def test_sample_rental_with_penalty(db, sample_rental):
    from rentals.services.rental_service import calculate_total_price

    now = timezone.now()

    # Shift the rental back into the past
    sample_rental.start_date = now - timedelta(days=5)
    sample_rental.end_date = now - timedelta(hours=2, minutes=30)
    sample_rental.status = "active"
    sample_rental.save()

    # Return the car now (2.5 hours past the planned end_date)
    complete_rental(sample_rental.id, end_mileage=sample_rental.start_mileage + 100)

    sample_rental.refresh_from_db()

    # Expected base price for the actual duration (from start_date to actual_return_date)
    expected_base_price = calculate_total_price(
        sample_rental.price_per_day,
        sample_rental.start_date,
        sample_rental.actual_return_date,
    )

    # 2h 30m delay -> ceil(2.5) = 3 hours * 50 PLN = 150 PLN penalty
    expected_penalty = 3 * 50

    assert sample_rental.status == "completed"
    assert sample_rental.total_price == expected_base_price + expected_penalty


@pytest.mark.django_db
def test_user_cannot_access_other_users_rental(api_client, sample_user, sample_car):
    from django.contrib.auth import get_user_model
    from rest_framework.reverse import reverse

    User = get_user_model()

    # Create User B and a rental belonging to him
    user_b = User.objects.create_user(username="user_b", password="password123")
    rental_b = Rental.objects.create(
        car=sample_car,
        user=user_b,
        start_date=timezone.now() + timedelta(days=1),
        end_date=timezone.now() + timedelta(days=5),
        start_mileage=1000,
        status="reserved",
    )

    # Authenticate the client as User A (sample_user)
    api_client.force_authenticate(user=sample_user)

    # Try to fetch details of the rental belonging to User B
    # (DRF routing name depends on your router, e.g., 'rental-detail')
    url = reverse("rental-detail", kwargs={"pk": rental_b.id})
    response = api_client.get(url)

    assert response.status_code == 404


@pytest.mark.django_db
def test_cannot_create_overlapping_rental_via_api(
    api_client, sample_rental, sample_user
):
    from rest_framework.reverse import reverse

    # Authenticate user
    api_client.force_authenticate(user=sample_user)

    # Try to create a rental for the same car during an overlapping timeframe
    url = reverse(
        "rental-list"
    )  # Adjust to your routing name for rental listing/creation
    payload = {
        "car": sample_rental.car.id,
        "start_date": sample_rental.start_date.isoformat(),
        "end_date": sample_rental.end_date.isoformat(),
        "start_mileage": sample_rental.start_mileage,
    }

    response = api_client.post(url, payload, format="json")

    assert response.status_code == 400
    # Optionally check if the error concerns the car field or dates
    assert (
        "car" in response.data
        or "non_field_errors" in response.data
        or "__all__" in response.data
    )


@pytest.mark.django_db
def test_user_cannot_create_multiple_active_or_reserved_rentals(
    api_client, sample_user, sample_car
):
    import uuid
    from rest_framework.reverse import reverse
    from fleet.models.car import Car
    from rentals.models.rental import Rental

    # Create the first active/reserved rental for the user
    Rental.objects.create(
        car=sample_car,
        user=sample_user,
        start_date=timezone.now() + timedelta(days=10),
        end_date=timezone.now() + timedelta(days=15),
        start_mileage=1000,
        status="reserved",
    )

    # Create a second car with unique VIN and number plate using uuid
    unique_suffix = uuid.uuid4().hex[:6].upper()
    second_car = Car.objects.create(
        brand="Tesla",
        model="Model S",
        year=2024,
        hp=670,
        engine_type="petrol",
        vin=f"1234567890{unique_suffix}",
        number_plate=f"W{unique_suffix}",
    )

    # Authenticate user
    api_client.force_authenticate(user=sample_user)

    # Try to create a second rental while the first one is still reserved
    url = reverse("rental-list")
    payload = {
        "car": second_car.id,
        "start_date": (timezone.now() + timedelta(days=20)).isoformat(),
        "end_date": (timezone.now() + timedelta(days=25)).isoformat(),
    }

    response = api_client.post(url, payload, format="json")

    assert response.status_code == 400
    assert "non_field_errors" in response.data


@pytest.mark.django_db
def test_complete_rental_fails_on_lower_mileage(sample_rental):
    sample_rental.status = "active"
    sample_rental.save()

    with pytest.raises(ValidationError) as excinfo:
        complete_rental(sample_rental.id, end_mileage=100)

    assert "The mileage cannot be lower than at the start of the rental" in str(
        excinfo.value
    )


@pytest.mark.django_db
def test_calculate_total_price_minimum_one_day(sample_rental):
    from decimal import Decimal

    sample_rental.status = "active"
    sample_rental.start_date = timezone.now() - timedelta(hours=1)
    sample_rental.save()

    complete_rental(sample_rental.id, sample_rental.start_mileage + 10)
    sample_rental.refresh_from_db()

    assert sample_rental.total_price == Decimal("150")


@pytest.mark.django_db
def test_car_availability_ignores_cancelled_and_completed(
    sample_rental, sample_user, sample_car
):
    sample_rental.status = "active"
    sample_rental.save()

    with pytest.raises(ValidationError) as excinfo:
        check_car_availability(
            car=sample_car,
            start_date=sample_rental.start_date,
            end_date=sample_rental.end_date,
        )

    assert "This car is already hired." in str(excinfo.value)

    # Cancel first rental and create new one
    sample_rental.status = "cancelled"
    sample_rental.save()

    try:
        check_car_availability(
            car=sample_car,
            start_date=sample_rental.start_date,
            end_date=sample_rental.end_date,
        )
    except ValidationError:
        pytest.fail(
            "check_car_availability raised  ValidationError for a cancelled rental!"
        )

    test_rental = Rental.objects.create(
        car=sample_car,
        user=sample_user,
        start_date=sample_rental.start_date,
        end_date=sample_rental.end_date,
    )

    test_rental.refresh_from_db()

    assert test_rental.status == "reserved"
