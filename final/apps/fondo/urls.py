from django.conf.urls import patterns, include, url
from django.contrib.auth.forms import AuthenticationForm

from rest_framework.routers import DefaultRouter
from final.apps.fondo.views import FondoViewSet

router = DefaultRouter()
router.register(r'rest/fondo', FondoViewSet)

urlpatterns = patterns(
    'final.apps.fondo',
    url(r'^main$', 'views.main', name='main'),
    url(r'^', include(router.urls)),
    url(r'^rest/fondo/tickets/(?P<fondo_id>\d+)$', 'views.get_ticket_for_fondo', name='tickets'),
)
