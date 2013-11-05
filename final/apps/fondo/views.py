from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage
from django.http.response import HttpResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404, render_to_response, render
from django.template import RequestContext
from django.utils import simplejson
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from final.apps.fondo.domain.serializers import FondoSerializer, QuerySetSerializer
from final.apps.fondo.models import Fondo, Ticket
import logging

_logger = logging.getLogger(__name__)

def main(request):
    u = request.user
    fondos = u.fondo_set.all()
    return render_to_response('fondo/main.html', {'fondos': fondos})

def get_ticket_for_fondo(request, fondo_id):

    page = 1
    size = 5
    if request.POST.get('page'):
        page = request.POST['page']
    if request.POST.get('size'):
        size = request.POST['size']
        
    _logger.debug("Page: %s, size: %s" % (page, size))
    fondo = get_object_or_404(Fondo, pk=fondo_id)
    tickets = fondo.ticket_set.all()
    p = Paginator(tickets, size)
    try:
        pag = p.page(page)
        # tickets = QuerySetSerializer().serialize(pag)
        tickets = []
        for t in pag:
            ticket = {}
            ticket['id'] = str(t.id)
            ticket['value'] = str(t.value)
            ticket['description'] = str(t.description)
            ticket['date'] = str(t.date)
            tickets.append(ticket)

        pagination = {}
        pagination['has_previous'] = pag.has_previous()
        pagination['has_next'] = pag.has_next()
        pagination['current'] = page
        data = {}
        data['tickets'] = tickets
        data['pagination'] = pagination
        # data = simplejson.dumps(pagination)
        # tickets = serializers.serialize('json', p.page(page))
    except EmptyPage:
        return HttpResponse({'error': 'Object is not your own'}, status=status.HTTP_404_NOT_FOUND, mimetype='application/json')
        
    return HttpResponse(simplejson.dumps(data), mimetype='application/json')


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
