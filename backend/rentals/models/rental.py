from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.conf import settings
from rentals.services.rental_service import get_max_date, check_car_availability, check_start_date

class Rental(models.Model):
    RENT_CHOICES = [
        ("reserved","Reserved"),
        ("active","Active"),
        ("completed","Completed"),
        ("cancelled","Cancelled"),
    ]
    car = models.ForeignKey("fleet.car", on_delete = models.PROTECT, related_name='rentals')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.PROTECT, related_name = 'rentals')

    start_date = models.DateField()
    end_date = models.DateField()
    actual_return_date = models.DateTimeField(null= True, blank = True)

    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, validators=[
        MinValueValidator(0)
    ])
    status = models.CharField(choices=RENT_CHOICES, default='active')
    start_mileage = models.PositiveIntegerField(null = True, blank = True)
    end_mileage = models.PositiveIntegerField(null = True, blank = True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places = 2, validators=[MinValueValidator(0)], null = True, blank = True)

    def clean(self):
        super().clean()

        check_start_date(self.start_date)

        if not self.start_date or not self.end_date:
            return

        # End date vs Start date
        if self.end_date < self.start_date:
            raise ValidationError({'end_date':'End date must be after start date'})

        max_allowed_date = get_max_date(self.start_date)

        if self.end_date > max_allowed_date:
            raise ValidationError({'end_date':"Hire is allowed for only 5 years, not more"})
        
        # Overlapping
        check_car_availability(self.car, self.start_date, self.end_date, current_rental_id= self.id)

    def save(self, *args, **kwargs):
        if not self.price_per_day:
            self.price_per_day = self.car.price
        self.full_clean()
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.user} - {self.car} ({self.start_date})"