from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    BasePermission,
)
from accounts.models.user import User
from accounts.serializers.user_serializer import UserSerializer, RegisterUserSerializer


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all().order_by("id")
        return User.objects.filter(id=user.id)

    def get_serializer_class(self):
        if self.action == "create":
            return RegisterUserSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]
