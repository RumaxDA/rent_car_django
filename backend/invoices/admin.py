from django.contrib import admin
from .models.invoice import Invoice


@admin.register(Invoice)
class AdminCar(admin.ModelAdmin):
    list_display = (
        "rental",
        "invoice_number",
        "issue_date",
        "net_amount",
        "gross_amount",
        "vat_rate",
        "vat_amount",
    )

    list_filter = ("invoice_number", "issue_date")

    search_fields = ("invoice_number", "issue_date")

    ordering = ("issue_date", "rental")
