from django.conf import settings
from django.http import HttpResponsePermanentRedirect
from re import compile
import logging

_logger = logging.getLogger(__name__)

class SecureRequiredMiddleware(object):
    def __init__(self):
        self.secure_paths_regexps = getattr(settings, 'HTTPS_REQUIRED_PATHS', '')
        self.secure_paths = [compile(regx) for regx in self.secure_paths_regexps]
        self.enabled = self.secure_paths and getattr(settings, 'HTTPS_SUPPORT')

    def process_request(self, request):
		_logger.debug("ADSFASDFASDF")
		return None
        #if self.enabled and not request.is_secure():
        #    if any(m.match(request.path) for m in self.secure_paths):
        #        if request.get_full_path().startswith(request.path):
        #            request_url = request.build_absolute_uri(request.get_full_path())
        #            # secure_url = request_url.replace('http://', 'https://')
		#			_logger.debug("AAAAAAAAAAAA")
        #            return HttpResponsePermanentRedirect(request_url)
        #return None
