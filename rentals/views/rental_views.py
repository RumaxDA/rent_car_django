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
from rentals.tasks import generate_invoice_task
import os
from django.http import FileResponse
from django.conf import settings


class RentalViewSet(ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all().order_by("id")
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.action in [
            "update",
            "partial_update",
            "destroy",
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

    @extend_schema(
            request= None,
            responses={202:dict},
            description='Instructs asynchronous generation of a PDF report for the rental.'
    )
    @action(
        detail=True,
        methods=['post'],
        permission_classes=[IsAuthenticated],
        url_path = 'generate-invoice'
    )
    def generate_invoice(self, request, pk=None):
        rental = self.get_object()

        generate_invoice_task.delay(rental.id)

        return Response(
            {'message': "Report generation has been requested. The file will appear in the system soon."},
            status = status.HTTP_202_ACCEPTED
        )
    

    @action(
        detail = True,
        methods=['get'],
        url_path='download-invoice',
    )
    def download_invoice(self, request, pk=None):
        rental = self.get_object()
        file_name = f'invoice_{rental.id}.pdf'
        file_path = os.path.join(settings.BASE_DIR, 'media', 'reports', file_name)

        if os.path.exists(file_path):
            file = open(file_name, 'rb')
            return FileResponse(
                file,
                as_attachment=True,
                filename=file_name,
                content_type='application/pdf'
            )
        else:
            return Response(
                {'status': 'PROCESSING', 'message': 'Invoice generate...'}
            )
    