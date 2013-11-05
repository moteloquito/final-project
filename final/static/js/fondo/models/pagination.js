define([
  'backbone'
], function() {

  var Pagination = Backbone.Model.extend({

    defaults: {
      page: 1,
      size: 5,
      has_previous: false,
      has_next: false
    },

    initialize: function() {
      this.page = this.get('page');
      this.size = this.get('size');
      this.has_previous = this.get('has_previous');
      this.has_next = this.get('has_next');
    }

  });

  return Pagination;

});
