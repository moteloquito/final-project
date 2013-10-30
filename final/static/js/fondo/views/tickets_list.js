define([
  'backbone'
], function(Backbone, ticketsListTemplate, Tickets) {

  var TicketsListView = Backbone.View.extend({

    template: ticketsListTemplate,

    initialize: function() {
      this.fondo_id = -1;
      this.pagination = {page: 1, size: 5};
    },

    render: function(parameters) {
      this.$el.empty();
      
      this.tickets = new Tickets();
      this.tickets.meta('id', this.fondo_id);
      this.listenTo(this.tickets, 'sync', this.renderTickets);
      this.listenTo(this.tickets, 'error', this.renderTicketsError);
      this.fetchTickets();

      return this;
    },

    fetchTickets: function() {
      this.tickets.fetch({
        data: {
          page: this.pagination.page,
          size: this.pagination.size
        },
        type: 'POST',
        contentType: 'application/json',
        reset: true
      });
    },

    renderTickets: function() {
      this.$el.html(ticketsListTemplate({ tickets: this.tickets.models }));
    },

    renderTicketsError: function() {
      var tickets = [];
      this.$el.html(ticketsListTemplate({ tickets: tickets }));
    },

    setFondoId: function(id) {
      this.fondo_id = id;
    },

    setPagination: function(pagination) {
      this.pagination.page = pagination.page;
      this.pagination.size = pagination.size;
    }

  });
});
