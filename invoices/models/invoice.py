from django.db import models
from rentals.models.rental import Rental


class Invoice(models.Model):
    rental = models.OneToOneField(
        Rental, on_delete=models.PROTECT, related_name="invoice"
    )

    invoice_number = models.CharField(max_length=50, unique=True)
    issue_date = models.DateTimeField(auto_now_add=True)

    net_amount = models.DecimalField(max_digits=10, decimal_places=2)
    gross_amount = models.DecimalField(max_digits=10, decimal_places=2)
    vat_rate = models.DecimalField(max_digits=4, decimal_places=2)
    vat_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.invoice_number
