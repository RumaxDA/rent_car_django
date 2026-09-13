from decimal import Decimal
import pytest
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from invoices.services.invoice_service import (
    create_invoice_record,
    generate_invoice_for_rental,
)

User = get_user_model()


@pytest.mark.django_db
def test_create_invoice_record_success(sample_rental):
    # Ensure rental is completed and has a total price
    sample_rental.status = "completed"
    sample_rental.total_price = Decimal("123.00")
    sample_rental.save()

    invoice = create_invoice_record(sample_rental)

    assert invoice.pk is not None
    assert invoice.rental == sample_rental
    assert invoice.gross_amount == Decimal("123.00")
    assert invoice.vat_rate == Decimal("0.23")
    # Gross 123.00 with 23% VAT: net = 100.00, vat = 23.00
    assert invoice.net_amount == Decimal("100.00")
    assert invoice.vat_amount == Decimal("23.00")
    assert invoice.invoice_number.startswith("FV/")


@pytest.mark.django_db
def test_create_invoice_record_fails_if_not_completed(sample_rental):
    # Rental status is 'reserved' or 'active', not 'completed'
    sample_rental.status = "active"
    sample_rental.total_price = Decimal("100.00")
    sample_rental.save()

    with pytest.raises(ValidationError) as excinfo:
        create_invoice_record(sample_rental)

    assert "Cannot generate an invoice for a rental that is not completed" in str(
        excinfo.value
    )


@pytest.mark.django_db
def test_create_invoice_record_fails_if_already_exists(sample_rental):
    sample_rental.status = "completed"
    sample_rental.total_price = Decimal("100.00")
    sample_rental.save()

    # Create the first invoice
    create_invoice_record(sample_rental)

    # Attempt to create a second invoice for the same rental
    with pytest.raises(ValidationError) as excinfo:
        create_invoice_record(sample_rental)

    assert "Invoice for this rental already exists" in str(excinfo.value)


@pytest.mark.django_db
def test_generate_invoice_for_rental_success(sample_rental, sample_user):
    sample_rental.status = "completed"
    sample_rental.total_price = Decimal("246.00")
    sample_rental.save()

    invoice = generate_invoice_for_rental(sample_rental.id, sample_user)

    assert invoice.pk is not None
    assert invoice.gross_amount == Decimal("246.00")


@pytest.mark.django_db
def test_generate_invoice_for_rental_fails_for_wrong_user(sample_rental):
    sample_rental.status = "completed"
    sample_rental.total_price = Decimal("246.00")
    sample_rental.save()

    other_user = User.objects.create_user(username="intruder", password="password123")

    with pytest.raises(ValidationError) as excinfo:
        generate_invoice_for_rental(sample_rental.id, other_user)

    assert "You can only generate an invoice for your own rental" in str(excinfo.value)


@pytest.mark.django_db
def test_generate_invoice_for_rental_fails_when_not_found():
    fake_id = 99999
    dummy_user = User.objects.create_user(username="dummy", password="password123")

    with pytest.raises(ValidationError) as excinfo:
        generate_invoice_for_rental(fake_id, dummy_user)

    assert "Rental not found" in str(excinfo.value)
