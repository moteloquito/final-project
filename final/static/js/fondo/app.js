define([
    'jquery',
    'underscore',
    'backbone',
    'fondo/views/mainView',
], function($, _, Backbone, MainView) 
{
  var App = function() {
      var v = new MainView();
      v.render();
  };

  return App;
});
