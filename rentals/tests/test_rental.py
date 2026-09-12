import pytest
from rentals.models.rental import Rental
from datetime import timedelta
from django.core.exceptions import ValidationError
from django.utils import timezone
from rentals.services.rental_service import complete_rental


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
    rental_v2 = Rental(
        car=sample_car,
        user=sample_user,
        start_date=timezone.now() + timedelta(days=1),
        end_date=timezone.now() + timedelta(days=15),
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

    # Cofamy wypożyczenie w przeszłość
    sample_rental.start_date = now - timedelta(days=5)
    sample_rental.end_date = now - timedelta(hours=2, minutes=30)
    sample_rental.status = "active"
    sample_rental.save()

    # Zwracamy samochód teraz (2.5 godziny po planowanym end_date)
    complete_rental(sample_rental.id, end_mileage=sample_rental.start_mileage + 100)

    sample_rental.refresh_from_db()

    # Oczekiwana cena bazowa za faktyczny czas trwania (od start_date do actual_return_date)
    expected_base_price = calculate_total_price(
        sample_rental.price_per_day,
        sample_rental.start_date,
        sample_rental.actual_return_date,
    )

    # 2h 30 min spóźnienia -> ceil(2.5) = 3 godziny * 50 zł = 150 zł kary
    expected_penalty = 3 * 50

    assert sample_rental.status == "completed"
    assert sample_rental.total_price == expected_base_price + expected_penalty
