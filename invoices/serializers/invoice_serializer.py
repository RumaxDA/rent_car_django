from rest_framework import serializers
from invoices.models.invoice import Invoice


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = [
            "id",
            "rental",
            "issue_date",
            "net_amount",
            "gross_amount",
            "vat_rate",
            "vat_amount",
        ]
