from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from invoices.models.invoice import Invoice
from invoices.serializers.invoice_serializer import InvoiceSerializer


class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]
    queryset = Invoice.objects.all().order_by("id")

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Invoice.objects.all().order_by("id")
        return Invoice.objects.filter(rental__user=user)
