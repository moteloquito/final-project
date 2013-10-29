define([
    'jquery',
    'underscore',
    'backbone',
    'tpl!fondo/templates/user/tickets.tpl'
], function($, _, Backbone, ticketsTemplate) {

    var TicketsView = Backbone.View.extend({

	/* el: '#ticketsList', */
	template: ticketsTemplate,

	initialize: function() {
	},

	render: function() {
	    var self = this;
	    this.$el.empty();
	    self.renderTickets();
	    return this;
	},

	renderTickets: function() {
	    this.$el.html(ticketsTemplate());
	}
    });

    return TicketsView;
});
    
