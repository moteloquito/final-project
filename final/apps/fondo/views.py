from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.http.response import HttpResponseForbidden
from django.shortcuts import render_to_response, render
from django.template import RequestContext
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from final.apps.fondo.domain.serializers import FondoSerializer
from final.apps.fondo.models import Fondo

def main(request):
    u = request.user
    fondos = u.fondo_set.all()
    return render_to_response('fondo/main.html', {'fondos': fondos})


class FondoViewSet(viewsets.ModelViewSet):

    queryset = Fondo.objects.all()
    serializer_class = FondoSerializer

    def list(self, request):
        
        if self.is_superuser(request):
            q = Fondo.objects.all()
        else:
            q = request.user.fondo_set.all()

        return Response(FondoSerializer(q).data)

    def retrieve(self, request, pk=None):

        try:
            f = Fondo.objects.get(pk=pk)
        except Fondo.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = FondoSerializer(f)
        if self.is_superuser(request) or f.owner.id == request.user.id:
            return Response(serializer.data)

        return Response({'error': 'Object is not your own'}, status=status.HTTP_404_NOT_FOUND)

    

    
    def is_superuser(self, request):
        """
        Indicates if user is a superuser
        """
        if hasattr(request, 'user') and request.user.is_superuser:
            return True
        return False

