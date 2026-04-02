from rest_framework import serializers
from fleet.models.car import Car
from django.core.exceptions import ValidationError as DjangoValidationError

class CarSerializer(serializers.ModelSerializer):
    vin = serializers.CharField(write_only = True)
    class Meta:
        model = Car
        fields = "__all__"
        
    def validate(self,data):
        try: 
            instance = Car(**data)
            instance.full_clean()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        return data
