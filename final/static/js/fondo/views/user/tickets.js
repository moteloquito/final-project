define([
  'tpl!/fondo/template/tickets.html',
  //'tpl!fondo/templates/user/tickets.tpl',
  'fondo/collections/ticketCollection',
  'formatNumber',
  'fondo/models/ticketModel',
  'backbone'
], function(ticketsTemplate, Tickets, formatNumber, TicketModel) {

  var TicketsView = Backbone.View.extend({

    template: ticketsTemplate,
    tagName: "div",
    className: "ticketsList",

    events: {
      "click .ticketok": "submit_ticket"
    },

    initialize: function(parameters) {
      this.el = $(".ticketList");
      this.fondo_id = parameters.fondo_id;
      this.status = parameters.status;
      this.title = parameters.title;
      //this.model.on('change', this.render, this);
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
          tickets: this.tickets.models,
          pagination: this.tickets.pagination,
          formatNumber: formatNumber,
          status: this.status
        })
      );
    },

    renderTicketsError: function() {
      var tickets = [];
      this.$el.html(ticketsTemplate({ tickets: tickets }));
    },

    submit_ticket: function(data) {
      var ticket_id = $(data.target).data('id');
      var ticket = this.tickets.get(ticket_id);
      ticket.set({status: "SUBM"});
      ticket.save({patch: true});
    }

  });

  return TicketsView;
});
