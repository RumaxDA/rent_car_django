import datetime
from django.core.exceptions import ValidationError
from django.db import transaction
import django.utils.timezone
from django.utils import timezone


def get_max_date(start_date):
    if not start_date:
        return datetime.date.today() + datetime.timedelta(days=365 * 5)

    return start_date + datetime.timedelta(days=365 * 5)


def check_start_date(start_date):
    if start_date < datetime.date.today():
        raise ValidationError("Start date cannot be in the past")


def check_car_availability(car, start_date, end_date, current_rental_id=None):
    from rentals.models.rental import Rental

    overlapping_rentals = (
        Rental.objects.filter(
            car=car,
            start_date__lt=end_date,
            end_date__gt=start_date,
        )
        .exclude(status="cancelled")
        .exclude(status="completed")
    )

    if current_rental_id:
        overlapping_rentals = overlapping_rentals.exclude(id=current_rental_id)

    if overlapping_rentals.exists():
        raise ValidationError("This car is already hired.")


def calculate_total_price(price_per_day, start_date, end_date):
    days = (end_date - start_date).days
    days = max(1, days)
    total_price = price_per_day * days
    return total_price


def activate_rental(rental_id):
    from rentals.models.rental import Rental

    with transaction.atomic():
        rental = Rental.objects.select_for_update().get(id=rental_id)

        if rental.status != "reserved":
            raise ValidationError(
                f"Cannot activate reservation with status {rental.status}."
                " Only 'reserved' status is allowed!"
            )

        if rental.start_date > datetime.date.today():
            raise ValidationError(
                "Too early! The client has a reservation for a later date."
            )

        rental.status = "active"
        rental.car.car_status = "rented"
        rental.start_mileage = rental.car.mileage
        rental.car.save()
        rental.save()


def complete_rental(rental_id, end_mileage):
    from rentals.models.rental import Rental
    from invoices.models.invoice import Invoice

    with transaction.atomic():
        rental = Rental.objects.select_for_update().get(id=rental_id)

        if rental.status != "active":
            raise ValidationError(
                f"Cannot complete reservation with status {rental.status}."
                " Only 'active' status is allowed!"
            )

        if end_mileage < rental.start_mileage:
            raise ValidationError(
                "The mileage cannot be lower than at the start of the rental"
            )

        rental.status = "completed"
        rental.car.car_status = "available"

        rental.end_mileage = end_mileage
        rental.car.mileage = rental.end_mileage

        rental.actual_return_date = django.utils.timezone.now()  # RRRR-MM-DD HH-MM
        convert_return_date = rental.actual_return_date.date()  # Only Date

        actual_total_price = calculate_total_price(
            rental.price_per_day, rental.start_date, convert_return_date
        )
        rental.total_price = actual_total_price

        rental.car.save()
        rental.save()

        current_vat_rate = 0.23
        net = round(actual_total_price/(1+current_vat_rate),2)
        vat = round(actual_total_price-net,2)

        Invoice.objects.create(
            rental = rental,
            invoice_number = f"FV/{timezone.now().strftime('%Y/%m')}/{rental.id}",
            net_amount=net,
            gross_amount = actual_total_price,
            vat_rate = current_vat_rate,
            vat_amount = vat,
        )


def cancel_rental(rental_id):
    from rentals.models.rental import Rental

    with transaction.atomic():
        rental = Rental.objects.select_for_update().get(id=rental_id)

        if rental.status != "reserved":
            raise ValidationError(
                f"Cannot cancel reservation with status {rental.status}. Only 'reserved' status is allowed!"
            )

        rental.status = "cancelled"
        rental.actual_return_date = None

        rental.save()
