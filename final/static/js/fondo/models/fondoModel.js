define(['backbone'], 
function(Backbone) {

    var FondoModel = Backbone.Model.extend({

	defaults: {
	    id: -1,
	    name: 'No name',
	    description: 'No description'
	},

	initialize: function() {
	}

    });

    return FondoModel;
});
