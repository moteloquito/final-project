define([
  'jquerycookie',
  'backbone'
], function() {

  var TicketModel = Backbone.Model.extend({

    url: function() {
      return 'rest/ticket/' + this.id + '/';
    },

    defaults: {
      id: -1
    },

    initialize: function() {
      this.id = this.get('id');
      this.description = this.get('description');
      this.date = this.get('date');
      this.value = this.get('value');
      this.status = this.get('status');
    },

    sync: function(method, model, options) {
      options.beforeSend = function(xhr){
	xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
      };
      return Backbone.Model.prototype.sync(method, model, options);
    }
  });

  return TicketModel;

});
