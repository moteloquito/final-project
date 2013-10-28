define([
    'routers/base_router'
], function (BaseRouter) {
    
    var FondoRouter = BaseRouter.extend({

	routes: {
	    "start" : "on_start",
	    "detail" : "on_detail"
	},

	on_start: function() {
	    var self = this;

	    require(['views/start/startView'], function(StartView) {
		var view = new StartView();
		self.render(view);
	    });
	},

	on_detail: function() {
	    var self = this;

	    require(['views/detail/detailView'], function(DetailView) {
		var view = new DetailView();
		self.render(view);
	    });
	}
	    
    });

    return FondoRouter;
});
