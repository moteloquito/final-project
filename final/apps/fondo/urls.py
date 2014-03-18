from django.conf.urls import patterns, include, url
from django.contrib.auth.forms import AuthenticationForm
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter
from final.apps.fondo.views import FondoViewSet, TicketViewSet

router = DefaultRouter()
router.register(r'rest/fondo', FondoViewSet)
router.register(r'rest/ticket', TicketViewSet)

urlpatterns = patterns(
    'final.apps.fondo',
    url(r'^main$', 'views.main', name='main'),
    url(r'^fondo/status/(?P<fondo_id>\d+)$', 'views.get_fondo_status'),
    url(r'^', include(router.urls)),
    url(r'^rest/fondo/tickets/(?P<fondo_id>\d+)$', 'views.get_ticket_for_fondo', name='tickets'),
    url(r'^template/(\w+)/$', 'views.template_pages'),
)
