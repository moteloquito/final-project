from django.conf.urls import patterns, include, url
from django.views.generic import RedirectView
from .settings.common import STATIC_ROOT
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^$', 'django.contrib.auth.views.login', name='login'),
    url(r'^login$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout$', 'django.contrib.auth.views.logout', {'template_name': 'registration/login.html'}),    
    url(r'^fondo/', include('final.apps.fondo.urls')),
        
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
