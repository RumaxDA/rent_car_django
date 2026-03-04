from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime 

class Car(models.Model):

    ENGINE_CHOISES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
    ]
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField(
        validators= [
            MinValueValidator(1900),
            MaxValueValidator(datetime.date.today().year + 1)
    ])
    hp = models.PositiveIntegerField(verbose_name = "Horse Power")
    engine_type = models.CharField(max_length= 50, 
                                   choices = ENGINE_CHOISES,
                                    default = 'petrol')
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    
    class Meta:
        verbose_name = "Car"
        verbose_name_plural = "Car"
