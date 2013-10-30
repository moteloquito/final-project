define([
    'jquery',
    'underscore',
    'backbone',
    'tpl!fondo/templates/user/tickets.tpl',
    'fondo/collections/ticketCollection'
], function($, _, Backbone, ticketsTemplate, Tickets) {

    var TicketsView = Backbone.View.extend({

	template: ticketsTemplate,

	initialize: function(parameters) {
	    this.fondo_id = parameters.fondo_id;
	},

	render: function() {
	    var self = this;
	    this.$el.empty();

	    this.tickets = new Tickets();
	    this.tickets.meta('id', this.fondo_id);
	    this.listenTo(this.tickets, 'sync', this.renderTickets);
	    this.listenTo(this.tickets, 'error', this.renderTicketsError);
	    this.tickets.fetch();

	    return this;
	},

	renderTickets: function() {
	    this.$el.html(ticketsTemplate({ tickets: this.tickets.models }));
	},

	renderTicketsError: function() {
	    var tickets = [];
	    this.$el.html(ticketsTemplate({ tickets: tickets }));
	}
    });

    return TicketsView;
});
    
