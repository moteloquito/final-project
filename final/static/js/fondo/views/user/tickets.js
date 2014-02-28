define([
  'tpl!fondo/templates/user/tickets.tpl',
  'fondo/collections/ticketCollection',
  'formatNumber',
  'backbone'
], function(ticketsTemplate, Tickets, formatNumber) {

  var TicketsView = Backbone.View.extend({

    template: ticketsTemplate,
    tagName: "div",
    className: "ticketsList",

    initialize: function(parameters) {
      this.el = $(".ticketList");
      this.fondo_id = parameters.fondo_id;
      this.status = parameters.status;
      this.title = parameters.title;
    },

    render: function() {
      this.$el.empty();
      
      this.tickets = new Tickets();
      this.tickets.setId(this.fondo_id);
      this.tickets.setStatus(this.status);
      this.listenTo(this.tickets, 'sync', this.renderTickets);
      this.listenTo(this.tickets, 'error', this.renderTicketsError);
      this.tickets.fetch();

      return this;
    },

    renderTickets: function() {
      this.$el.html(ticketsTemplate(
        {
	  title: this.title,
          tickets: this.tickets.models[0].get('tickets'),
          pagination: this.tickets.models[0].get('pagination'),
          formatNumber: formatNumber,
	  status: this.status
        })
      );
    },

    renderTicketsError: function() {
      var tickets = [];
      this.$el.html(ticketsTemplate({ tickets: tickets }));
    }

  });

  return TicketsView;
});
