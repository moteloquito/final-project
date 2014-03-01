requirejs.config({
  baseUrl: '/static/js',
  paths: {
    backbone: '/static/js/libs/backbone/backbone',
    bootstrap: '/static/js/libs/bootstrap/bootstrap',
    jquery: '/static/js/libs/jquery/jquery-2.0.3',
    jquerycookie: '/static/js/libs/jquery/jquery.cookie',
    tpl: '/static/js/libs/tpl/tpl',
    underscore: '/static/js/libs/underscore/underscore',
    app: '/static/js/fondo/app',
    formatNumber: '/static/js/libs/utils/formatNumber'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    jquerycookie: {
      deps: ['jquery'],
      exports: 'Cookie'
    },
    bootstrap: ['jquery'],
    formatNumber: {
      exports: 'formatNumber'
    }
  }
});

requirejs([
  'backbone',
  'bootstrap',
  'jquery',
  'underscore',
  'app',
  'fondo/routers/fondo_router',
  'fondo/views/mainView'
], function(Backbone, Bootstrap, $, _, App, FondoRouter, MainView) {
  var router = new FondoRouter();
  var mainView = new MainView();

  Backbone.history.start();

  router.render(mainView);
});
