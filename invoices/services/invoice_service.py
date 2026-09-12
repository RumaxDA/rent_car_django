from decimal import Decimal
from django.core.exceptions import ValidationError
from django.db import transaction
from invoices.models.invoice import Invoice
from rentals.models.rental import Rental


def create_invoice_record(rental):
    """
    Core domain logic: generates and persists an invoice for a given rental.
    Assumes business rules and ownership are already validated.
    """
    # Prevent duplicate invoices
    if hasattr(rental, "invoice"):
        raise ValidationError("Invoice for this rental already exists.")

    # Invoices can only be generated for completed rentals
    if rental.status != "completed":
        raise ValidationError(
            "Cannot generate an invoice for a rental that is not completed."
        )

    vat_rate = Decimal("0.23")
    gross_amount = rental.total_price
    net_amount = (gross_amount / (Decimal("1") + vat_rate)).quantize(Decimal("0.01"))
    vat_amount = (gross_amount - net_amount).quantize(Decimal("0.01"))

    invoice_number = f"FV/{rental.id}/{rental.start_date.strftime('%Y%m')}"

    return Invoice.objects.create(
        rental=rental,
        invoice_number=invoice_number,
        net_amount=net_amount,
        gross_amount=gross_amount,
        vat_rate=vat_rate,
        vat_amount=vat_amount,
    )


def generate_invoice_for_rental(rental_id, user):
    """
    API service layer: handles secure fetching, ownership validation,
    and transaction boundary for manual/external requests.
    """
    with transaction.atomic():
        try:
            rental = Rental.objects.select_for_update().get(id=rental_id)
        except Rental.DoesNotExist:
            raise ValidationError("Rental not found.")

        # Security check: Ensure the user owns the rental
        if rental.user != user:
            raise ValidationError(
                "You can only generate an invoice for your own rental."
            )

        return create_invoice_record(rental)
