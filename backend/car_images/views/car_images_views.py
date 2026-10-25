from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser
from car_images.models.car_image import CarImage
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from car_images.serializers.car_image_serializer import CarImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class CarImageViewSet(ModelViewSet):
    queryset = CarImage.objects.all().order_by("id")
    serializer_class = CarImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = ["car"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        else:
            return [IsAdminUser()]
