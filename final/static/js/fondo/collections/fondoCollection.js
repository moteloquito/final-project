define([
  'backbone',
  'fondo/models/fondoModel'
], function(FondoModel) {

  var Fondos = Backbone.Collection.extend({

    model: FondoModel,

    url: 'rest/fondo/',

    initialize: function() {
    },

    parse: function(data) {
      var results = [];
      _.each(data, function(fondo) {
	var f = {
	  id: fondo.id,
	  name: fondo.name,
	  description: fondo.description
	};
	results.push(f);
      });
      return results;
    }

  });

  return Fondos;
});
