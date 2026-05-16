from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PerfilEstudio

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PerfilEstudioSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()

    class Meta:
        model = PerfilEstudio
        fields = ['usuario', 'nome_estudio', 'cpf_cnpj', 'telefone']

    def create(self, validated_data):
        user_data = validated_data.pop('usuario')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        perfil = PerfilEstudio.objects.create(usuario=user, **validated_data)
        return perfil