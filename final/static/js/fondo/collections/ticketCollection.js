define([
  'backbone',
  'fondo/models/ticketModel'
], function(Backbone, TicketModel) {

  var Tickets = Backbone.Collection.extend({

    model: TicketModel,

    url: function() {
      return 'rest/fondo/tickets/' + this._meta['id'];
    },

    initialize: function() {
      this._meta = {};
    },

    parse: function(data) {
      var results = [];
      _.each(data, function(ticket) {
	var t = {
	  id: ticket.pk,
	  description: ticket.fields.description,
	  value: ticket.fields.value,
	  date: ticket.fields.date
	};
	results.push(t);
      });
      return results;
    },

    meta: function(prop, value) {
      if (value === undefined) {
	return this._meta[prop];
      } else {
	this._meta[prop] = value;
        return value;
      }
    }

  });

  return Tickets;

});
