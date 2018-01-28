define(function(require) {

  "use strict";

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!tpl/Shell.html'),

    template = _.template(tpl),
    $menuItems;

  return Backbone.View.extend({

    initialize: function() {},

    render: function() {
      this.$el.html(template());
      $menuItems = $('.navbar .nav li', this.el);
      return this;
    },

    events: {
      "keyup .search-query": "search",
      "keypress .search-query": "onkeypress"
    },

    search: function(event) {
      var key = $('#searchText').val();
      this.employeeList.fetch({
        reset: true,
        data: {
          name: key
        },
        success: function() {
          setTimeout(function() {
            $('.dropdown').addClass('open');
          });
        }
      });
    },

    onkeypress: function(event) {
      if (event.keyCode === 13) { // enter key pressed
        event.preventDefault();
      }
    },

    selectMenuItem: function(menuItem) {
      $menuItems.removeClass('active');
      if (menuItem) {
        $('.' + menuItem).addClass('active');
      }
    }

  });

});
