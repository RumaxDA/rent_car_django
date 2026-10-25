from django.db import models
from fleet.models.car import Car


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="cars/gallery/")
    is_main = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
