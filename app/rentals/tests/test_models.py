import pytest
from rentals.models.rental import Rental
from datetime import date
from django.core.exceptions import ValidationError

@pytest.mark.django_db
def test_should_create_rental(sample_car, sample_user): 
    rental = Rental.objects.create(
        car = sample_car, 
        user = sample_user,
        start_date = date(2026,5,1), 
        end_date = date(2026,5,5),
        start_mileage = 1000,
        status = 'reserved'
        )
    
    assert rental.car == sample_car
    assert rental.id is not None
    assert rental.start_mileage == 1000

@pytest.mark.django_db
def test_should_fail_when_end_date_is_before_start_date(sample_car, sample_user):
    rental = Rental(
        car = sample_car,
        user = sample_user,
        start_date = date(2026,5,5),
        end_date = date(2025,5,5),
    )
    with pytest.raises(ValidationError):
        rental.full_clean()

@pytest.mark.django_db
def test_if_car_could_be_hire_when_already_reserved(sample_rental, sample_car, sample_user):
    rental_v2 = Rental(
        car = sample_car,
        user = sample_user,
        start_date = date(2026,5,3),
        end_date = date(2026,5,10),
        start_mileage = 10000
    )


    with pytest.raises(ValidationError) as excinfo:
        rental_v2.full_clean()

    assert 'car' in excinfo.value.message_dict or '__all__' in excinfo.value.message_dict
    
    assert Rental.objects.count() == 1
    existing_rental = Rental.objects.first()
    assert existing_rental.id == sample_rental.id
        
