class NoCache(object):
    def process_response(self, request, response):
        """
        set the "Cache-Control" header to "must-revalidate, no-cache"
        """
        print "Check for serving static file: %s" % request.path
        if request.path.startswith('/static/'):
            print "Serving static file: %s" % request.path
            response['Cache-Control'] = 'must-revalidate, no-cache'
        
        return response

