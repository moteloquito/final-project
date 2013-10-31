define([
  'jquery',
  'backbone',
  'fondo/models/ticketModel',
  'fondo/collections/csrfCollection'
], function($, Backbone, TicketModel, C) {

  var Tickets = C.extend({

    model: TicketModel,

    url: function() {
      return 'rest/fondo/tickets/' + this.fondo_id;
    },

    initialize: function() {
      this.id = -1;
      this.pagination = {
        page:1,
        size: 5
      };
    },

    setId: function(fondo_id) {
      this.fondo_id = fondo_id;
    },

    setPagination: function(pagination) {
      this.pagination = pagination;
    },

    fetch: function() {
      var options = {
        data: {
          page: this.pagination.page,
          size: this.pagination.size
        }
      };
      return C.prototype.fetch.call(this, options);
    },

    parse: function(data) {
      var results = [];
      _.each(data, function(ticket) {
	var t = {
	  id: ticket.id,
	  description: ticket.description,
	  value: ticket.value,
	  date: ticket.date
	};
	results.push(t);
      });
      return results;
    }

  });

  return Tickets;

});
