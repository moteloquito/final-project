define([
  'tpl!fondo/templates/user/fondoStatus.tpl',
  'fondo/models/fondoStatusModel',
  'formatNumber',
  'backbone'
], function(fondoStatusTemplate, Status, formatNumber) {

  var FondoStatusView = Backbone.View.extend({

    template: fondoStatusTemplate,
    tagName: "div",
    className: "fondoStatus",

    initialize: function(parameters) {
      this.el = $(".fondoStatus");
      this.fondo_id = parameters.fondo_id;
    },

    render: function() {
      this.$el.empty();

      this.status = new Status();
      this.status.setId(this.fondo_id);
      this.listenTo(this.status, 'sync', this.renderStatus);
      this.listenTo(this.status, 'error', this.renderStatusError);
      this.fetchStatus();

      return this;
    },

    fetchStatus: function() {
      this.status.fetch({
	type: 'GET',
	contentType: 'application/json',
	reset: true
      });
    },

    renderStatus: function() {
      this.$el.html(this.template(
	{
	  submited: this.status.get('submited'),
	  aproved: this.status.get('aproved'),
	  formatNumber: formatNumber
	}
      ));
    },

    renderStatusError: function() {
      var submited = [];
      var aproved = [];
      this.$el.html(template({
	submited: submited,
	aproved: aproved
      }));
    }

  });

  return FondoStatusView;

});
