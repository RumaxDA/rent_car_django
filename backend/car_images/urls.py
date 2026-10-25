from rest_framework.routers import DefaultRouter
from .views.car_images_views import CarImageViewSet

router = DefaultRouter()
router.register("car_images", CarImageViewSet)

urlpatterns = router.urls
