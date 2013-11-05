define([
  'fondo/models/ticketModel',
  'fondo/models/pagination',
  'fondo/collections/csrfCollection',
  'jquery',
  'backbone'
], function(TicketModel, Pagination, C) {

  var Tickets = C.extend({

    // model: 

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
      var results = {};
      var tickets = [];
      var pagination = new Pagination(data.pagination);
      _.each(data.tickets, function(ticket) {
        var t = new TicketModel(ticket);
        // var t = {
        //   id: ticket.id,
        //   description: ticket.description,
        //   value: ticket.value,
        //   date: ticket.date
        // };
        tickets.push(t);
      });
      results.tickets = tickets;
      results.pagination = pagination;
      return results;
    }

  });

  return Tickets;

});
