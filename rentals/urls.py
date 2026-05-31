from rest_framework.routers import DefaultRouter
from .views.rental_views import RentalViewSet

router = DefaultRouter()
router.register("rentals", RentalViewSet)

urlpatterns = router.urls
