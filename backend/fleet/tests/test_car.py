import pytest
from fleet.models.car import Car
from django.core.exceptions import ValidationError
from fleet.validators.validators import check_car_year

@pytest.mark.django_db
def test_car_year_production_under():
    car = Car(
        brand = "BMW",
        model = "X5",
        year = 1700,
        hp = 170,
    )

    with pytest.raises(ValidationError) as excinfo:
        car.full_clean()

    assert 'year' in excinfo.value.message_dict


@pytest.mark.django_db
def test_check_car_year_logic():
    with pytest.raises(ValidationError):
        check_car_year(1760)