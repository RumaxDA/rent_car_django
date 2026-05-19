"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView, SpectacularRedocView
) 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from fleet.urls import router as fleet_router
from accounts.urls import router as users_router
from rentals.urls import router as rentals_router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name = "token_obtain_pair"),
    path('api/refresh/', TokenRefreshView.as_view(), name = "token_refresh"),
    path("api/schema/",SpectacularAPIView.as_view(), name = "schema"),
    path("api/docs/",SpectacularSwaggerView.as_view(url_name ="schema"), name = "swagger-ui"),
    path("api/redoc/",SpectacularRedocView.as_view(url_name ="schema"), name = "redoc"),
    path("api/", include(fleet_router.urls)),
    path("api/", include(users_router.urls)),
    path("api/", include(rentals_router.urls)),
]
