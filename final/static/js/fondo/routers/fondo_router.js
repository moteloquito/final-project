define([
    'fondo/routers/base_router'
], function (BaseRouter) {
    
    var FondoRouter = BaseRouter.extend({

	routes: {
	    "fondos" : "on_fondos",
	    "tickets" : "on_tickets"
	},

	on_fondos: function() {
	    var self = this;

	    require(['fondo/views/mainView'], function(MainView) {
		var view = new MainView();
		self.render(view);
	    });
	},

	on_tickets: function() {
	    var self = this;

	    require(['fondo/views/tickets'], function(TicketsView) {
		var view = new TicketsView();
		self.render(view);
	    });
	}
	    
    });

    return FondoRouter;
});
