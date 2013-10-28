requirejs.config({
    baseUrl: '/static/js',
    paths: {
	backbone: '/static/js/libs/backbone/backbone',
	bootstrap: '/static/js/libs/bootstrap/bootstrap',
	jquery: '/static/js/libs/jquery/jquery',
	tpl: '/static/js/libs/tpl/tpl',
	underscore: '/static/js/libs/underscore/underscore',
	app: '/static/js/fondo/app'
    },
    shim: {
	backbone: {
	    deps: ['underscore', 'jquery'],
	    exports: 'Backbone'
	},
	underscore: {
	    exports: '_'
	},
	bootstrap: ['jquery']
    }
});

requirejs(['backbone', 'bootstrap', 'jquery', 'underscore', 'app'],
function(Backbone, Bootstrap, $, _, App) {
    var app = new App();
});
