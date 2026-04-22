from django.db import models
from fleet.validators.validators import check_car_year
from django.core.validators import MinValueValidator 

class Car(models.Model):
    class Meta: 
        verbose_name = "Car"
        verbose_name_plural = "Car"

    ENGINE_CHOISES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
        ('gas', 'Gas')
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
    image = models.ImageField(upload_to='cars/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)], null=True, blank=True, default = 150)
    mileage = models.DecimalField(max_digits= 10, decimal_places =2, validators=[MinValueValidator(0)], null=True, blank = True)
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    

    def clean(self):
        super().clean()

        check_car_year(self.year)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    


