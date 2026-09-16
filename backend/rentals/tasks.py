from celery import shared_task
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
import os
import logging

from rentals.models.rental import Rental
from rentals.services.pdf_service import InvoicePDF

logger = logging.getLogger(__name__)


@shared_task
def cancel_overdue_reservations():
    from django.db import transaction
    from fleet.models.car import Car

    threshold_time = timezone.now() - timedelta(hours=2)

    overdue_rentals = Rental.objects.filter(
        status="reserved", start_date__lte=threshold_time
    )

    car_ids = list(overdue_rentals.values_list("car_id", flat=True))

    with transaction.atomic():
        updated_count = overdue_rentals.update(
            status="cancelled", actual_return_date=None
        )

        if car_ids:
            Car.objects.filter(id__in=car_ids).update(car_status="available")
    return f"Completed. {updated_count} was cancelled."


@shared_task
def generate_invoice_task(rental_id):
    rental = Rental.objects.select_related("car", "user").get(id=rental_id)

    pdf = InvoicePDF(rental)
    pdf.build_content()

    reports_dir = os.path.join(settings.BASE_DIR, "media", "reports")
    os.makedirs(reports_dir, exist_ok=True)

    file_name = f"report_{rental.id}.pdf"
    file_path = os.path.join(reports_dir, file_name)
    pdf.output(file_path)

    return f"File generated: {file_name}"
