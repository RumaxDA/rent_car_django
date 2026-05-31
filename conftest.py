import pytest
from fleet.models.car import Car
from rentals.models.rental import Rental
from accounts.models.user import User
import datetime
from datetime import timedelta


@pytest.fixture
def sample_car(db):
    return Car.objects.create(
        brand="Tesla",
        model="Model S",
        year=2024,
        hp=670,
        engine_type="petrol",
        vin="12345678901234567",
        number_plate="NBA32143",
    )


@pytest.fixture
def sample_user(db):
    return User.objects.create(
        username="Dawid",
        password="Ex@mple123",
    )


@pytest.fixture
def sample_rental(db, sample_car, sample_user):
    return Rental.objects.create(
        car=sample_car,
        user=sample_user,
        start_date=datetime.date.today(),
        end_date=datetime.date.today() + timedelta(days=30),
        start_mileage=10000,
    )


# BULK / zewnętrzne API
