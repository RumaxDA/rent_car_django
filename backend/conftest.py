import pytest
from backend.fleet.models.car import Car
from backend.rentals.models.rental import Rental
from backend.accounts.models.user import User
from datetime import timedelta
from django.utils import timezone
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


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
        start_date=timezone.now() + timedelta(minutes=30),
        end_date=timezone.now() + timedelta(days=30),
        start_mileage=10000,
    )


@pytest.fixture
def sample_invoice(db, sample_rental):
    """
    Fixtura tworząca przykładową opłaconą i zakończoną rezerwację wraz z powiązaną fakturą.
    """
    from decimal import Decimal
    from backend.invoices.services.invoice_service import create_invoice_record

    sample_rental.status = "completed"
    sample_rental.total_price = Decimal("200.00")
    sample_rental.save()

    return create_invoice_record(sample_rental)


# BULK / zewnętrzne API
