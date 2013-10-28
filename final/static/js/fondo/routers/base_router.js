define([
    'backbone'
], function(Backbone) {

    var BaseRouter = Backbone.Router.extend({

	render: function(view, callback) {
	    if (this.currentView) {
		if (this.currentView.beforeClose) {
		    this.currentView.beforeClose();
		}
		this.currentView.remove();
	    }
	    view.render();
	    $('.content-view').append(view.el);
	    this.currentView = view;
	    if (callback) {
		callback();
	    }
	    return this;
	}
    });

    return BaseRouter;
});
