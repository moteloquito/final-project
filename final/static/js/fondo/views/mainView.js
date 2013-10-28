define([
    'jquery',
    'underscore',
    'backbone',
    'tpl!fondo/views/main.tpl',
    'fondo/collections/fondoCollection'
], function($, _, Backbone, mainTemplate, Fondos){

    var MainView = Backbone.View.extend({

	el: '#fondosLists',
	template: mainTemplate,

	initialize: function() {
	},

	render: function() {
	    var self = this;
	    this.fondos = new Fondos();
	    this.listenTo(this.fondos, 'sync', this.renderFondos);
	    this.fondos.fetch();
	},

	renderFondos: function() {
	    this.$el.html(mainTemplate({fondos: this.fondos.models}));
	}

    });

    return MainView;
});
