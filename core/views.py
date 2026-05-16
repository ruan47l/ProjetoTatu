from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import PerfilEstudio
from .serializers import  PerfilEstudioSerializer

class LoginVerificacaoView(APIView):
    def post(self, request):
        login_informado = request.data.get('login')
        senha_informada = request.data.get('password') 

        user = authenticate(username=login_informado, password=senha_informada)
        
        if user is not None:

            has_studio = PerfilEstudio.objects.filter(usuario=user).exists()
            
            return Response({
                "mensagem": "Autenticado com sucesso!",
                "has_studio": has_studio,
            }, status=status.HTTP_200_OK)
            
        else:
            return Response(
                {"mensagem": "Credenciais inválidas. Verifique os dados ou cadastre-se."},
                status=status.HTTP_401_UNAUTHORIZED 
            )


class CadastroEstudioView(APIView):
    def post(self, request):
        serializer = PerfilEstudioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)