define([
  'jquery',
  'jquerycookie',
  'backbone'
], function($, Cookie, B) {

  var CSRFCollection = B.Collection.extend({

    fetch: function(params) {
      var options = params || {};

      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
      };

      options.type = 'POST';
      options.contentType = 'application/json';
      options.reset = true;
      
      return B.Collection.prototype.fetch.call(this, options);
    }

  });

  return CSRFCollection;
});
