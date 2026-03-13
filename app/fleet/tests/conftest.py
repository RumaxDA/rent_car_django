import pytest 
from fleet.models.car import Car 

@pytest.fixture
def sample_car(db):
    return Car.objects.create(
    brand="Tesla",
    model="Model S",
    year=2024,
    hp=670
)