from rest_framework.viewsets import ModelViewSet
from fleet.models.car import Car
from fleet.serializers.car_serializer import CarSerializer
from rest_framework.decorators import action 
from rest_framework.response import Response 
from rest_framework import status 
from drf_spectacular.utils import extend_schema, OpenApiParameter
from ..services.car_services import CarExternalApiService

class CarViewSet(ModelViewSet):
    queryset = Car.objects.all().order_by("id")
    serializer_class = CarSerializer

    @action(detail = False, methods = ['post'], url_path = 'bulk-create')
    def bulk_create_cars(self, request):
        if not isinstance(request.data, list):
            return Response(
                {'error':'List of objects required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data, many= True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @extend_schema(
        parameters=[
            OpenApiParameter(name='make', description='Car Brand (ex. Toyota)', required=True, type=str),
        ],
        description="Downloading car brand list from external API-Ninjas"
    )
    
    @action(detail = False, methods=['get'], url_path = 'external-models')
    def external_models(self, request):
        make = request.query_params.get('make')
        if not make:
            return Response({"error": "'make' parameter is required"})
        
        data = CarExternalApiService.get_models(make)
        return Response(data)