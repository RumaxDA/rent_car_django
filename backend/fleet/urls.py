from rest_framework.routers import DefaultRouter
from .views.car_views import CarViewSet

router = DefaultRouter()
router.register("cars", CarViewSet)

urlpatterns = router.urls
