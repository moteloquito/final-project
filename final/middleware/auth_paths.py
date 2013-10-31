from django.core.exceptions import ImproperlyConfigured
from django.conf import settings
from django.http import HttpResponseForbidden
from django.contrib.auth.views import redirect_to_login
from re import compile
import logging

_logger = logging.getLogger('middleware')

class AuthenticatedPathsMiddleware(object):

    def __init__(self):
        self.secure_paths_regexps = getattr(settings, 'SECURE_PATHS', '')
        self.secure_paths = [compile(regx) for regx in self.secure_paths_regexps]

    """
    If a request path need authentication, checks if the user is already
    logged in, if not redirect to login page.
    """
    def process_request(self, request):

        # AuthenticationMiddleware is required so that request.user exists.
        if not hasattr(request, 'user'):
            raise ImproperlyConfigured(
                "The Secure middleware requires the authentication"
                " middleware to be installed.  Edit your MIDDLEWARE_CLASSES"
                " setting to insert"
                " 'django.contrib.auth.middleware.AuthenticationMiddleware'"
                " before the SecureMiddleware class.")

        path = request.path

        # If request is on login page, we do nothing
        _logger.debug("Checking against login: '%s' : '%s' " % (path, settings.LOGIN_URL))
        if path == settings.LOGIN_URL:
            return

        # If request is to log-out, we do nothing
        if path == settings.LOGOUT_URL:
            return

        _logger.debug('Checking path: ' + path)
        for m in self.secure_paths:
            _logger.debug('Against: %s' % m.pattern)
            # if any(m.match(path) for m in self.secure_paths):
            if m.match(path):
                if not request.user.is_authenticated():
                    if request.is_ajax():
                        _logger.debug('User needs authentication. Access forbidden!')
                        return HttpResponseForbidden()
                    else:
                        _logger.debug('User is not authenticated. Redirecting to login page.')
                        return redirect_to_login(path)

        return
