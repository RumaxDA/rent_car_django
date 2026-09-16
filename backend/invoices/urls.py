from rest_framework.routers import DefaultRouter
from .views.invoice_views import InvoiceViewSet

router = DefaultRouter()
router.register("invoices", InvoiceViewSet)

urlpatterns = router.urls
