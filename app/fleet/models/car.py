from django.db import models
from fleet.services.car_services import check_car_year

class Car(models.Model):
    class Meta: 
        verbose_name = "Car"
        verbose_name_plural = "Car"

    ENGINE_CHOISES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
    ]
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    hp = models.PositiveIntegerField(verbose_name = "Horse Power")
    engine_type = models.CharField(max_length= 50, 
                                   choices = ENGINE_CHOISES,
                                    default = 'petrol')
    number_plate = models.CharField(max_length = 10, unique = True, verbose_name="Number Plate")
    vin = models.CharField(max_length = 17, unique = True, verbose_name="VIN Number")
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    

    def clean(self):
        super().clean()

        check_car_year(self.year)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    


