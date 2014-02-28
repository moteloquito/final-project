define(['backbone'],
function(Backbone) {

  var FondoStatusModel = Backbone.Model.extend({

    defaults: {
      submited: 0.0,
      aproved: 0.0
    },

    url: function() {
      return 'fondo/status/' + this.fondo_id;
    },

    initialize: function() {
    },

    setId: function(fondo_id) {
      this.fondo_id = fondo_id;
    }

  });

  return FondoStatusModel;
});
