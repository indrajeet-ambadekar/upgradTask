define(function(require) {

  "use strict";

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!tpl/quiz/quiz.html'),
    empty_tpl = require('text!tpl/quiz/empty.html'),

    template = _.template(tpl),
    empty_tpl = _.template(empty_tpl);

  return Backbone.View.extend({
    events: {
      "click .btn-default": "flushView",
    },
    students: [],
    render: function() {
      String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
      if (localStorage.questions == undefined) {
        this.data = {
          currentUser: localStorage.currentUserName,
        }
        this.$el.html(empty_tpl(this.data));

      } else {
        this.data = {
          currentUser: localStorage.currentUserName,
        }
        if (localStorage.questionMap) {
          var questionMap = JSON.parse(localStorage.questionMap);
        }

        this.data.questions = this.getUserQuestions(questionMap)
        this.$el.html(template(this.data));
      }

      return this;
    },
    getUserQuestions: function(arr) {
      var self = this;
      var dump = $.map(arr, function(item, index) {
        if (item.student === self.data.currentUser) {
          return item.qst
        }
      });
      var questions = JSON.parse(localStorage.questions);
      var userQst = [];
      for (var i = 0; i < dump.length; i++) {
        for (var i in questions) {
          if (dump[i] == questions[i].id) {
            userQst.push(questions[i])
          }
        }
      }
      return userQst;
    }


  });

});
