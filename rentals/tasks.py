from celery import shared_task
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
import os
import logging

from rentals.models.rental import Rental
from rentals.services.pdf_service import InvoicePDF
from rentals.services.rental_service import cancel_rental

logger = logging.getLogger(__name__)


@shared_task
def cancel_overdue_reservations():
    threshold_time = timezone.now() - timedelta(hours=2)

    overdue_rentals = Rental.objects.filter(
        status="reserved", start_date__lte=threshold_time
    )

    cancelled_count = 0

    for rental in overdue_rentals:
        try:
            cancel_rental(rental.id)
            cancelled_count += 1
            logger.info(f"Automatically canceled overdue reservation ID: {rental.id}")
        except Exception:
            logger.error(
                f"Error during automatic canceling reservation ID: {rental.id}"
            )

    return f"Completed. {cancelled_count} was cancelled."


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
