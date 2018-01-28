define(function(require) {

  "use strict";

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!tpl/questions/createQuestion.html'),
    mcq_tpl = require('text!tpl/questions/partials/mcq.html'),
    subj_tpl = require('text!tpl/questions/partials/subjective.html'),
    psg_tpl = require('text!tpl/questions/partials/passage.html'),

    template = _.template(tpl);
  mcq_tpl = _.template(mcq_tpl);
  subj_tpl = _.template(subj_tpl);
  psg_tpl = _.template(psg_tpl);

  return Backbone.View.extend({
    events: {
      "change input[type='radio']": 'watchRadioBtn',
      "click #createQuest": 'createQuestion',
      "change .ansChkBx": 'correctAnswer',
      'click .btn-warning': "gotoAssignmentPage"
    },
    questionObj: {
      type: ''
    },
    render: function() {
      this.$el.html(template(this.questionObj));
      return this;
    },
    watchRadioBtn: function() {
      $('.qstnBldrFtr').removeClass('hide');
      if (this.$el.find('.qstTyp:checked').val() === 'mcq') {
        this.questionObj = {
          title: '',
          type: 'mcq',
          desc: '',
          ans1: '',
          ans2: '',
          ans3: '',
          ans4: '',
          correctAnswer: 0,
          instr: ''
        };
        this.$el.find('#qstCntnr').html(mcq_tpl(this.questionObj));
      } else if (this.$el.find('.qstTyp:checked').val() === 'subj') {
        this.questionObj = {
          title: '',
          type: 'subj',
          desc: '',
          instr: ''
        };
        this.$el.find('#qstCntnr').html(subj_tpl(this.questionObj));
      } else {
        this.questionObj = {
          title: '',
          type: 'psg',
          desc: '',
          ans: '',
          instr: ''
        };
        this.$el.find('#qstCntnr').html(psg_tpl(this.questionObj));
      }
    },
    validateForm: function() {
      if (this.questionObj.type === 'mcq') {
        var flag = $(".mndtry").filter(function() {
          return this.value.length !== 0;
        });
        if (flag.length == 5) {
          if ($('.ansChkBx:checked').length == 0) {
            alert('Please specify atleast one correct answer');
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        return true
      }


    },
    correctAnswer: function(e) {
      this.questionObj.correctAnswer = $(e.target).val();
    },
    createQuestion: function() {
      if (!this.validateForm()) {
        alert('Fill all provided fields to create a question');
        return false;
      }
      if (this.questionObj.type === 'mcq') {
        this.questionObj = {
          title: this.$el.find('#qstTitle').val(),
          type: 'mcq',
          desc: this.$el.find('#qstDesc').val(),
          ans1: this.$el.find('#ans1').val(),
          ans2: this.$el.find('#ans2').val(),
          ans3: this.$el.find('#ans3').val(),
          ans4: this.$el.find('#ans4').val(),
          correctAnswer: this.$el.find('.ansChkBx:checked').val(),
          instr: this.$el.find('#qstInstr').val()
        };
      } else if (this.questionObj.type === 'subj') {
        this.questionObj = {
          title: this.$el.find('#qstTitle').val(),
          type: 'subj',
          desc: this.$el.find('#qstDesc').val(),
          instr: this.$el.find('#qstInstr').val()
        };
      } else {
        this.questionObj = {
          title: this.$el.find('#qstTitle').val(),
          type: 'psg',
          ans: this.$el.find('#qstAnswer').val(),
          desc: this.$el.find('#qstDesc').val(),
          instr: this.$el.find('#qstInstr').val()
        };
      }
      var questions = localStorage.questions;
      if (questions) {
        questions = JSON.parse(questions);
        this.questionObj.id = questions[questions.length - 1].id + 1;
        questions.push(this.questionObj);
        localStorage.questions = JSON.stringify(questions);
        debugger
      } else {
        questions = [];
        this.questionObj.id = 1;
        questions.push(this.questionObj);
        localStorage.questions = JSON.stringify(questions);
      }
      window.location.reload();
    },
    gotoAssignmentPage: function() {
      window.location.hash = "#assign"
    }

  });

});
