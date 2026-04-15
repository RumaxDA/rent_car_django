import pytest
from fleet.services.car_services import CarExternalApiService

@pytest.mark.django_db
def test_map_results_creates_unique_plates(mocker):
    raw_data = [
        {"make": "BMW", "model": "M3", "year": 2020, "horsepower_hp": 450, "id": 99},
        {"make": "BMW", "model": "M5", "year": 2021, "horsepower_hp": 600, "id": 100},
    ]

    result = CarExternalApiService._map_results(raw_data)

    assert result[0]['brand'] == "BMW"
    assert result[0]['hp'] == 450

    plate1 = result[0]['number_plate']
    plate2 = result[1]['number_plate']

    assert plate1 != plate2
    assert len(plate1) == 7
    assert plate1[:3].isalpha()

@pytest.mark.django_db
def test_get_models_api_error(mocker):
    mock_get = mocker.patch('requests.get')
    mock_get.return_value.status_code = 500
    mock_get.return_value.text = "Internal Server Error"

    response = CarExternalApiService.get_models("Toyota")

    assert "error" in response
    assert "API status: 500" in response['error']


@pytest.mark.django_db
def test_map_results_avoids_plates_already_in_db(mocker):
    # 1. ARRANGE: We put the "unlucky" board into the database
    blocked_plate = "ABC1234"
    from fleet.models.car import Car
    Car.objects.create(
        brand="Fiat", 
        model="126p", 
        year=1990, 
        hp=24, 
        engine_type="petrol", 
        number_plate=blocked_plate,
        vin="OLD-DATABASE-VIN"
    )

    
    # 2. MOCK: We force the generator to first draw the SAME array
    # This is a "hack" for testers - we simulate an incredible coincidence
    mocker.patch(
        'fleet.services.car_services.random.choices', 
        side_effect=[
            list("ABC"), list("1234"), # Pierwsze losowanie (kolizja)
            list("XYZ"), list("9999")  # Drugie losowanie (sukces)
        ]
    )
    raw_data = [{"make": "Tesla", "model": "S", "year": 2024, "id": 555}]

    # 3. ACT
    result = CarExternalApiService._map_results(raw_data)

    # 4. ASSERT
    new_plate = result[0]['number_plate']
    assert new_plate != blocked_plate
    assert new_plate == "XYZ9999"
    print(f"Generator poprawnie ominął zajętą blachę: {blocked_plate}")