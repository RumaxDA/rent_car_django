from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.conf import settings
import datetime
from rentals.services import rental_service

class Rental(models.Model):
    RENT_CHOICES = [
        ("reserved","Reserved"),
        ("active","Active"),
        ("completed","Completed"),
        ("cancelled","Cancelled"),
    ]
    car = models.ForeignKey("fleet.car", on_delete = models.PROTECT, related_name='rentals')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.PROTECT, related_name = 'rentals')

    start_date = models.DateField(
        validators=[
            MinValueValidator(datetime.date.today),
        ]
    )
    end_date = models.DateField(
        validators=[
            MinValueValidator(datetime.date.today),
            MaxValueValidator(rental_service.get_max_date())]
    )
    actual_return_date = models.DateTimeField(null= True, blank = True)

    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, validators=[
        MinValueValidator(0)
    ])
    status = models.CharField(choices=RENT_CHOICES, default='active')
    start_mileage = models.PositiveIntegerField()
    end_mileage = models.PositiveIntegerField(null = True, blank = True)

    def clean(self):
        # End date vs Start date
        if self.start_date and self.end_date and self.end_date < self.start_date:
            raise ValidationError({"end_date": "End date "})

    def __str__(self):
        return f"{self.user} - {self.car} ({self.start_date})"