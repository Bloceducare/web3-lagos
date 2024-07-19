# serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework.exceptions import MethodNotAllowed

class SignupSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'other_name', 'github_username']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            other_name=validated_data['other_name'],
            github_username=validated_data['github_username']
        )
        return user



# signin endpoint
class SigninSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)


class CustomUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'other_name', 'github_username']
        read_only_fields = ['verified']


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class CompletePasswordResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    confirm_new_password = serializers.CharField(write_only=True)