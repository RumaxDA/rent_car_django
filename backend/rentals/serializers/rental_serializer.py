from rest_framework import serializers
from rentals.models.rental import Rental
from django.core.exceptions import ValidationError as DjangoValidationError
from fleet.serializers.car_serializer import CarSerializer

class RentalSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    car = CarSerializer(read_only = True)
    class Meta:
        model = Rental
        fields = ['id','car','user', 'start_date','end_date', 'start_mileage','price_per_day', 'total_price']

class CreateRentalSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    class Meta:
        model = Rental
        fields = ['car', 'user', 'start_date', 'end_date']

    def validate(self,data):
        user = self.context['request'].user

        try: 
            instance = Rental(user = user, **data)
            instance.full_clean()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        return data