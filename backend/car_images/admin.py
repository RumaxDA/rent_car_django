from django.contrib import admin
from .models.car_image import CarImage


@admin.register(CarImage)
class AdminCarImage(admin.ModelAdmin):
    list_display = ("car", "image", "is_main", "order")
