from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage
from django.core.serializers.json import DjangoJSONEncoder
from django.http.response import HttpResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404, render_to_response, render
from django.template import RequestContext
from django.utils import simplejson

from django.http import Http404
from django.template import TemplateDoesNotExist
# from django.views.generic.simple import direct_to_template

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from final.apps.fondo.domain.serializers import FondoSerializer, TicketSerializer, QuerySetSerializer
from final.apps.fondo.models import Fondo, Ticket
import logging

_logger = logging.getLogger(__name__)

def main(request):
    u = request.user
    fondos = u.fondo_set.all()
    return render_to_response('fondo/main.html', {'fondos': fondos})

def get_fondo_status(request, fondo_id):
    """ Gets the current status.
    """
    fondo = get_object_or_404(Fondo, pk=fondo_id)
    submited = fondo.ticket_set.filter(status='SUBM')
    aproved = fondo.ticket_set.filter(status='OPEN')

    total_submited = 0.0
    total_aproved = 0.0
    if submited:
        total_submited = sum(t.value for t in submited)
    if aproved:
        total_aproved = sum(t.value for t in aproved)

    print ("Status: submited %s, aproved %s" % (total_submited, total_aproved))
    data = {}
    data['submited'] = total_submited
    data['aproved'] = total_aproved
 
    return HttpResponse(simplejson.dumps(data, cls=DjangoJSONEncoder), mimetype='application/json')

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
        pagination['page'] = page
        pagination['size'] = size
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


class TicketViewSet(viewsets.ModelViewSet):

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def list(self, request):

        status = request.GET.get('status')
        fondo_id = request.GET.get('fondo')
        _logger.debug("Getting tickets for fondo %s and status %s" % (fondo_id, status))
        
        user = request.user
        fondo = get_object_or_404(Fondo, pk=fondo_id)

        if status is not None:
            q = Ticket.objects.filter(fondo=fondo, status=status)
        else:
            q = Ticket.objects.filter(fondo=fondo)
        
        return Response(TicketSerializer(q).data)


def template_pages(request, page):
    try:
        template_name = "template/%s.html" % page
        return render_to_response(template_name, {}, context_instance=RequestContext(request))
    except TemplateDoesNotExist:
        raise Http404()
