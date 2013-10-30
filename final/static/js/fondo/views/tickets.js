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
	    this.tickets.fetch();

	    return this;
	},

	renderTickets: function() {
	    this.$el.html(ticketsTemplate({ tickets: this.tickets.models }));
	}
    });

    return TicketsView;
});
    
