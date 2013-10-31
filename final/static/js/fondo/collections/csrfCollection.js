define([
  'jquery',
  'backbone'
], function($, B) {

  var CSRFCollection = B.Collection.extend({

    fetch: function(params) {
      var options = params || {};
      var csrftoken = this.getCookie('csrftoken');

      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      };

      options.type = 'POST';
      options.contentType = 'application/json';
      options.reset = true;
      
      return B.Collection.prototype.fetch.call(this, options);
    },

    getCookie: function(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          }
        }
      }
      return cookieValue;
    }

  });

  return CSRFCollection;
});
