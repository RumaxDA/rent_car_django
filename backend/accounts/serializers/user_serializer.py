from rest_framework import serializers
from accounts.models.user import User
from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email',]

class RegisterUserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm',]
        extra_kwargs = {
            'password': {'write_only':True},
            'email':{'required':True}
        }

    def validate(self,data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        
        try:
            validate_password(data['password'])
        except DjangoValidationError as e:
            raise serializers.ValidationError({'password': list(e.messages)})

        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')

        user = User.objects.create_user(**validated_data)
        return user
