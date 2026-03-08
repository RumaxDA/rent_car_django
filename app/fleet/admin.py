from django.contrib import admin
from .models.car import Car

@admin.register(Car)
class AdminCar(admin.ModelAdmin):
    list_display = ("brand", "model", "year", "hp", "engine_type")

    list_filter = ('brand', 'model')

    search_fields = ('brand', 'model')

    ordering = ('brand', 'model')