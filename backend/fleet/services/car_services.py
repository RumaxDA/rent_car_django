import requests
import random
import string
from fleet.models.car import Car
class CarExternalApiService:
    BASE_URL = "https://carapi.app/api/engines/v2"

    @classmethod
    def get_models(cls, make_name):
        params = {
            'make': make_name,
            'verbose': 'yes' 
        }
        try:
            response = requests.get(cls.BASE_URL, params=params, timeout=10)
            
            if response.status_code == 200:
                full_json = response.json()
                raw_cars = full_json.get('data', [])
                
                return cls._map_results(raw_cars)
            
            return {
                "error": f"API status: {response.status_code}", 
                "detail": response.text
            }
        except requests.exceptions.RequestException as e:
            return {"error": "Connection Error", "detail": str(e)}
        
    @staticmethod
    def _generate_unique_plate(forbidden_set):
        """Używa przekazanego zbioru do sprawdzenia unikalności."""
        while True:
            prefix = ''.join(random.choices(string.ascii_uppercase, k=3))
            suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
            plate = f"{prefix}{suffix}"
            if plate not in forbidden_set:
                return plate

    @classmethod
    def _map_results(cls, results):
        db_plates = set(Car.objects.values_list('number_plate', flat=True))
        mapped_data = []
        generated_in_batch = set()

        for item in results:
            current_forbidden = db_plates | generated_in_batch
            
            new_plate = cls._generate_unique_plate(current_forbidden)
            generated_in_batch.add(new_plate)
        
            mapped_data.append({
                "brand": item.get("make"),
                "model": item.get("model"),
                "year": item.get("year"),
                "hp": item.get("horsepower_hp") or 0,
                "engine_type": item.get("engine_type") or "petrol",
                "vin": f"CAPI-V2-{item.get('id')}",
                "number_plate": new_plate 
            })
        return mapped_data