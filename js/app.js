require.config({

  baseUrl: 'js/lib',

  paths: {
    app: '../app',
    tpl: '../tpl',
  },

  map: {

  },

  shim: {
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    bootstrap: {
      deps: ['jquery'],
    }

  }
});

require(['backbone', 'app/router', '../../bower_components/jquery-ui/jquery-ui.min'], function(Backbone, Router, jqueryUi) {
  var router = new Router();
  setTimeout(function() {
    Backbone.history.start();

  }, 500)
});
