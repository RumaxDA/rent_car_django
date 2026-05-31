from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rentals.models.rental import Rental
from rentals.serializers.rental_serializer import (
    RentalSerializer,
    CreateRentalSerializer,
)
from common.pagination import CustomPagination
from rest_framework.decorators import action
from rest_framework.response import Response


class RentalViewSet(ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all().order_by("id")
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.action in ["list", "update", "partial_update", "destroy", "retrieve"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateRentalSerializer
        return RentalSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Rental.objects.all().order_by("id")
        return Rental.objects.filter(user=user).order_by("id")

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def my(self, request):
        rentals = self.get_queryset()
        serializer = RentalSerializer(rentals, many=True)
        return Response(serializer.data)
