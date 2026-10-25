from rest_framework import serializers
from car_images.models.car_image import CarImage
from fleet.models.car import Car


class CarImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)

    class Meta:
        model = CarImage
        fields = ["id", "image", "is_main", "order"]


class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = ["id", "brand", "model", "price", "image", "images"]
