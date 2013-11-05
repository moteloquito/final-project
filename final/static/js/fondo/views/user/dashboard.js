define([
  'fondo/views/user/tickets',
  'tpl!fondo/templates/user/dashboard.tpl',
  'tpl!fondo/templates/user/panel.tpl',
  'backbone'
], function(TicketsView, dashboardTemplate, panelTemplate){

  var DashboardView = Backbone.View.extend({

    template: dashboardTemplate,
    tagName: "div",
    className: "dashboard",

    initialize: function() {
    },

    render: function() {
      this.$el.empty();
      this.renderDashboard();
      this.renderPanel();
      this.renderContent();
      return this;
    },

    renderDashboard: function() {
      this.$el.html(dashboardTemplate());
    },

    renderPanel: function() {
      this.$el.find('#panel').html(panelTemplate());
    },

    renderContent: function() {
      var content = this.$el.find('#content');

      content.empty();
      var tickets = new TicketsView({ fondo_id: 1 });
      tickets.render();
      content.html(tickets.$el);
    }

  });

  return DashboardView;

});
