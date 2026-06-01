# Car Rental API

[![Python Code Linter](https://github.com/RumaxDA/rent_car_django/actions/workflows/linter.yml/badge.svg)](https://github.com/RumaxDA/rent_car_django/actions)
[![Django Tests](https://github.com/RumaxDA/rent_car_django/actions/workflows/tests.yml/badge.svg)](https://github.com/RumaxDA/rent_car_django/actions)

A robust, backend-only RESTful API built for managing a car rental service. Designed with a clear separation of business logic (Service Layer pattern) and heavy emphasis on data validation, security, and role-based access control.

## Tech Stack

- **Framework:** Django & Django REST Framework (DRF)
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** PostgreSQL 17
- **CI:** GitHub Actions (Automated Linting via Flake8 & Black, Automated Testing via Pytest)
- **Server & Static Files:** Gunicorn, WhiteNoise
- **Testing:** Pytest (with fixtures)
- **Documentation:** OpenAPI / Swagger UI
- **Infrastructure:** Docker & Docker Compose
- _(Upcoming)_: Redis & Celery (for async tasks: email notifications and PDF report generation)

## Key Features

1. **Role-Based Access Control (RBAC):** Strict endpoint protection distinguishing between Admin, Logged-in Users, and Anonymous Users. Sensitive data is scoped exclusively to the data owner or administrators.
2. **Advanced Business Validation:** Prevents logical errors during rentals (e.g., overlapping rental dates, booking cars that are too old or out of service).
3. **External API Integration:** Automatically fetches car models from external providers.
4. **Service Layer Architecture:** Business logic is decoupled from views/serializers, ensuring clean, testable, and maintainable code.
5. **Comprehensive Testing:** Automated test suite powered by `pytest` and fixtures.
6. **Core CRUD Operations:** Complete management of Users, Cars, and Rentals.
7. **Query Optimization:** Built-in filtering and pagination for large datasets.
8. **Continuous Integration (CI):** Automated workflows enforcing strict PEP8 code quality standards and executing automated test suites (Pytest) on every pull request and push to the main branch.

## How to run

The project is fully containerized. You don't need to install Python or PostgreSQL on your local machine.

### Prerequisites

- Docker and Docker Compose installed.
- Docker Desktop or Docker Engine installed.

### Installation

**Step 1. Clone the repository**

```bash
git clone https://github.com/RumaxDA/rent_car_django
cd rent_car_django
```

**Step 2. Configure Environment**
Copy the example environment file and adjust the values if necessary (the defaults are fine for local development):

```bash
cp .env.example .env
```

**Step 3. Build and Run the Containers**

```bash
docker compose up -d --build
```

**Step 4. Apply Migrations**
Open a new terminal and run migrations inside the backend container:

```bash
docker compose exec backend python manage.py makemigrations
```

**Step 5. Apply Migrations**
Create a Superuser (Admin):

```bash
docker compose exec backend python manage.py createsuperuser
```

### Accessing the API

**API Endpoints:** http://localhost:8000/  
**Swagger UI Documentation:** http://localhost:8000/api/docs/  
**Database Access:** port 5433

### Running Tests

The application uses pytest for automated testing. To run the test suite inside the Docker container:

```bash
docker compose exec backend pytest
```
