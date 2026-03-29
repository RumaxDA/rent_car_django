import datetime
from django.core.exceptions import ValidationError

def get_max_date(start_date):
    if not start_date:
        return datetime.date.today() + datetime.timedelta(days = 365*5)
    
    return start_date + datetime.timedelta(days = 365*5)

def check_start_date(start_date):
    if start_date < datetime.date.today():
        raise ValidationError("Start date cannot be in the past")
    
def check_car_availability(car, start_date, end_date, current_rental_id = None):
    from rentals.models.rental import Rental

    overlapping_rentals = Rental.objects.filter(
        car = car,
        start_date__lt = end_date,
        end_date__gt = start_date,
    ).exclude(status = 'cancelled')

    if current_rental_id:
        overlapping_rentals = overlapping_rentals.exclude(id = current_rental_id)
    
    if overlapping_rentals.exists():
        raise ValidationError("This car is already hired.")
