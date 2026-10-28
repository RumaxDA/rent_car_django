from django.db import models
from fleet.models.car import Car


def car_gallery_directory_path(instance, filename):
    return f"cars/gallery/{instance.car.id}/{filename}"


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=car_gallery_directory_path)
    is_main = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
