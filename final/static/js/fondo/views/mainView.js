define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!fondo/templates/main_fondo_list.tpl',
  'fondo/collections/fondoCollection'
], function($, _, Backbone, mainTemplate, Fondos){

  var MainView = Backbone.View.extend({

    template: mainTemplate,

    initialize: function() {
    },

    render: function() {
      var self = this;
      this.$el.empty();
      this.fondos = new Fondos();
      this.listenTo(this.fondos, 'sync', this.renderFondos);
      this.fondos.fetch();
      return this;
    },

    renderFondos: function() {
      this.$el.html(mainTemplate({fondos: this.fondos.models}));
    }

  });

  return MainView;
});
