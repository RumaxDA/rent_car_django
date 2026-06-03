from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rentals.models.rental import Rental
from rentals.serializers.rental_serializer import (
    RentalSerializer,
    CreateRentalSerializer,
    FinalizeRentalSerializer,
    UpdateRentalSerializer,
)
from rest_framework import status
from common.pagination import CustomPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rentals.services.rental_service import (
    activate_rental,
    complete_rental,
    cancel_rental,
)
from drf_spectacular.utils import extend_schema
from django.core.exceptions import ValidationError


class RentalViewSet(ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all().order_by("id")
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.action in [
            "list",
            "update",
            "partial_update",
            "destroy",
            "retrieve",
            "activate_reservation",
            "finalize_rental",
        ]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateRentalSerializer
        elif self.action == "finalize_rental":
            return FinalizeRentalSerializer
        elif self.action in ["update", "partial_update"]:
            return UpdateRentalSerializer
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

    @extend_schema(
        request=None,
        responses={200: RentalSerializer},
        description="Rental Activation. No body required",
    )
    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdminUser],
        url_path="activate",
    )
    def activate_reservation(self, request, pk=None):
        rental = self.get_object()

        try:
            activate_rental(rental.id)
        except ValidationError as e:
            return Response(
                {"error": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST
            )

        rental.refresh_from_db()

        output_serializer = self.get_serializer(rental)

        return Response(output_serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=FinalizeRentalSerializer,
        responses={200: RentalSerializer},
        description="Rental Finalization",
    )
    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdminUser],
        url_path="completed",
    )
    def finalize_rental(self, request, pk=None):
        rental = self.get_object()
        input_serializer = FinalizeRentalSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        mileage = input_serializer.validated_data["end_mileage"]

        try:
            complete_rental(rental.id, mileage)
        except ValidationError as e:
            return Response(
                {"error": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST
            )

        rental.refresh_from_db()

        serializer = self.get_serializer(rental)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=None,
        responses={200: RentalSerializer},
        description="Cancels a reserved rental",
    )
    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated],
        url_path="cancelled",
    )
    def cancel_rental(self, request, pk=None):
        rental = self.get_object()

        try:
            cancel_rental(rental.id)
        except ValidationError as e:
            return Response(
                {"error": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST
            )
        rental.refresh_from_db()

        rental.refresh_from_db()
        serializer = self.get_serializer(rental)
        return Response(serializer.data, status=status.HTTP_200_OK)
