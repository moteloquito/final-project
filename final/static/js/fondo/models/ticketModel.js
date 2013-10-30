define([
    'backbone'
], function(Backbone) {

    var TicketModel = Backbone.Model.extend({

	defaults: {
	    id: -1,
	    description: '',
	    date: '2013-01-01',
	    value: 0.00
	},

	initialize: function() {
	}

    });

    return TicketModel;

});
