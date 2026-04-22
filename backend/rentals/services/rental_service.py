import datetime
from django.core.exceptions import ValidationError
from datetime import date

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
    
def calculate_total_price(price_per_day, start_date, end_date):
    days = (end_date - start_date).days
    days = max(1, days)
    total_price = price_per_day * days
    return total_price

def change_status_and_give_mileage():
    # zapisujemy status aktualny
    # Pętla for raz dziennie do end_date + 1
        # jeśli data dzisiejsza jest < od start_date to:
            # ustawiany status na "Reserved"
        # jeśli data dzisiejsza jest == z start_date to:
            # ustawiamy status na "Active"
            # pobieramy mileage z modelu Car i ustawiamy w start_mileage
        # jeśli data dzisiejsza jest > od end_date to:
            # ustawiamy status na "Completed"
            # ustawiamy mileage w modelu Car == end_mileage
    pass




