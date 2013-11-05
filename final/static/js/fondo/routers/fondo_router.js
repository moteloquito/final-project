define([
  'fondo/routers/base_router'
], function (BaseRouter) {
  
  var FondoRouter = BaseRouter.extend({

    routes: {
      "dashboard": "on_dashboard",
      "fondos" : "on_fondos",
      "tickets/:fondoid" : "on_tickets"
    },

    on_dashboard: function() {
      var self = this;
     
      require(['fondo/views/user/dashboard'], function(DashboardView) {

        var view = new DashboardView();
        self.render(view);

      });
    },

    on_fondos: function() {
      var self = this;

      require(['fondo/views/mainView'], function(MainView) {
	var view = new MainView();
	self.render(view);
      });
    },

    on_tickets: function(fondoid) {
      var self = this;

      require(['fondo/views/tickets'], function(TicketsView) {
	var view = new TicketsView({ fondo_id: fondoid });
	self.render(view);
      });
    }
    
  });

  return FondoRouter;
});
