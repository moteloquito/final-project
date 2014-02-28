define([
  'fondo/models/ticketModel',
  'fondo/models/pagination',
  'fondo/collections/csrfCollection',
  'jquery',
  'backbone'
], function(TicketModel, Pagination, C) {

  // var Tickets = C.extend({
  var Tickets = Backbone.Collection.extend({

    // model: 

    url: function() {
      params = [];
      if (this.fondo_id !== undefined) {
        params.push('fondo=' + this.fondo_id);
      }
      if (this.status !== undefined) {
        params.push('status=' + this.status);
      }
      
      return 'rest/ticket/' + (
        params.length > 0 ? ('?' + params.join('&')) : ''
      )
      // return 'rest/fondo/tickets/' + this.fondo_id;
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

    setStatus: function(status) {
      this.status = status;
    },

    setPagination: function(pagination) {
      this.pagination = pagination;
    },

    /* fetch: function() {
    var options = {
    data: {
    page: this.pagination.page,
    size: this.pagination.size
  }
  };
    return C.prototype.fetch.call(this, options);
  }, */

    parse: function(data) {
      var results = {};
      var tickets = [];
      var pagination = new Pagination(data.pagination);
      _.each(data, function(ticket) {
        var t = new TicketModel(ticket);
        tickets.push(t);
      });
      results.tickets = tickets;
      results.pagination = pagination;
      return results;
    }

  });

  return Tickets;

});
