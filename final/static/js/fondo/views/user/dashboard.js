define([
  'fondo/views/user/tickets',
  'fondo/views/user/fondoStatus',
  'tpl!fondo/templates/user/dashboard.tpl',
  'tpl!fondo/templates/user/panel.tpl',
  'backbone'
], function(TicketsView, FondoStatus, dashboardTemplate, panelTemplate){

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
      this.renderContent(1);
      this.renderFondoStatus();
      return this;
    },

    renderDashboard: function() {
      this.$el.html(dashboardTemplate());
    },

    renderPanel: function() {
      this.$el.find('#panel').html(panelTemplate());
    },

    renderContent: function(fondo_id) {
      this.renderTicketsOpen(fondo_id);
      this.renderTicketsSubmitted(fondo_id);
      /* var content = this.$el.find('#tickets_open');

      content.empty();
      var tickets = new TicketsView({ fondo_id: 1 });
      tickets.render();
      content.html(tickets.$el); */
    },

    renderTicketsOpen: function(fondo_id) {
      this.renderTicketsList('tickets_open', fondo_id, 'OPEN', 'Tickets abiertos');
    },

    renderTicketsSubmitted: function(fondo_id) {
      this.renderTicketsList('tickets_submitted', fondo_id, 'SUBM', 'Tickets enviados');
    },

    renderTicketsList: function(div_id, fondo_id, status, title) {
      var div = this.$el.find('#' + div_id);
      div.empty();
      var list = new TicketsView(
	{
	  fondo_id: fondo_id,
	  status: status,
	  title: title
	}
      );
      list.render();
      div.html(list.$el);
    },

    renderFondoStatus: function() {
      var content = this.$el.find('#status');
      content.empty();
      var status = new FondoStatus({ fondo_id: 1 });
      status.render();
      content.html(status.$el);
    },

  });

  return DashboardView;

});
