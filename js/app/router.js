define(function(require) {

  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    ShellView = require('app/views/Shell'),
    LoginView = require('app/views/login'),
    createQuestionView = require('app/views/createQuestion'),
    assignView = require('app/views/assign'),
    quizView = require('app/views/quiz'),

    $body = $('body'),
    shellView = new ShellView({
      el: $body
    }).render(),
    $content = $("#content", shellView.el),
    loginView = new LoginView({
      el: $content
    });


  $body.click(function() {
    $('.dropdown').removeClass("open");
  });

  $("body").on("click", "#showMeBtn", function(event) {
    event.preventDefault();
    shellView.search();
  });

  return Backbone.Router.extend({

    routes: {
      "": "login",
      "contact": "contact",
      "createQuestion": "createQuestion",
      "assign": "assign",
      "quiz": "quiz",
    },

    login: function() {
      loginView.delegateEvents();
      loginView.render();
      shellView.selectMenuItem('login-menu');
    },
    createQuestion: function() {
      require(["app/views/createQuestion"], function(createQuestionView) {
        var view = new createQuestionView({
          el: $content
        });
        view.render();
        shellView.selectMenuItem('question-menu');
      });
    },
    assign: function() {
      require(["app/views/assign"], function(assignView) {
        var view = new assignView({
          el: $content
        });
        view.render();
        shellView.selectMenuItem('question-menu');
      });
    },
    quiz: function() {
      require(["app/views/quiz"], function(quizView) {
        var view = new quizView({
          el: $content
        });
        view.render();
        shellView.selectMenuItem('question-menu');
      });
    },
  });

});
