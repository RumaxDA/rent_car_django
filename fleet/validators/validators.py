from django.core.exceptions import ValidationError
from datetime import datetime


def check_car_year(year):
    if year < 1800:
        raise ValidationError({"year": "Production car year should be above 1800."})
    if year > datetime.now().year + 1:
        raise ValidationError(
            {"year": "Wrong car year production. This is the future date."}
        )
