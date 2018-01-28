define(function(require) {

  "use strict";

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!tpl/assign/assign.html'),
    stdnt_tpl = require('text!tpl/assign/student.html'),

    template = _.template(tpl);
  stdnt_tpl = _.template(stdnt_tpl);

  return Backbone.View.extend({
    events: {
      "click .createQuestiont": "createQuestion",
      "change .all-selector": 'selectAll',
      "change .qstSelect": 'toggleAssinger',
      "click .showModal": 'showStudentModal',
      "click .closeModal": "closeModal",
      "click .student": 'selectStudent',
      "click #assignQuestions": 'assignQuestions'
    },

    render: function() {
      var questions = localStorage.questions;
      if (questions) {
        questions = JSON.parse(questions);
      }
      var students = localStorage.students;
      if (students) {
        students = JSON.parse(students).sort(function(a, b) {
          return a > b;
        });
      }
      if (questions) {
        var data = {
          length: questions.length,
          students: students,
          questions: questions,
        }
        this.$el.html(template(data));
        setTimeout(function() {
          $('.studentList').html(stdnt_tpl(data));

        }, 500)
      } else {
        var data = {
          length: 0,
        }
        this.$el.html(template(data));
      }
      return this;
    },
    createQuestion: function() {
      window.location.hash = "#createQuestion";
    },
    selectAll: function(e) {
      if ($(e.target).is(':checked')) {
        $('.qstSelect').prop('checked', 'true');
        this.toggleAssinger(e);
      } else {
        $('.qstSelect').removeAttr('checked');
        this.toggleAssinger(e);
      }
    },
    toggleAssinger: function(e) {
      if ($(e.target).is(':checked'))
        this.$el.find('.btn-primary').removeAttr('disabled');
      else
        this.$el.find('.btn-primary').attr('disabled', true);
    },
    showStudentModal: function() {
      $('.overLay, #myModal').fadeIn();
      $('#myModal').fadeTo("fast", 1);
    },
    closeModal: function() {
      $('.overLay, #myModal').fadeOut();
      $('#myModal').fadeTo("fast", 0);
    },
    selectStudent: function(e) {
      $(e.target).toggleClass('selectedStudent');
    },
    assignQuestions: function() {
      if ($('.selectedStudent').length == 0) {
        alert('select atleast on student');
      } else {
        var selected_students = [];
        var selected_questions = [];
        $('.selectedStudent').each(function() {
          selected_students.push($(this).text().trim());
        });
        $('.qstSelect:checked').each(function() {
          selected_questions.push($(this).val());
        });
        var questionMap = localStorage.questionMap;
        if (!questionMap) {
          questionMap = [];
        } else {
          questionMap = JSON.parse(localStorage.questionMap);
        }
        $.each(selected_students, function(index, item) {
          $.each(selected_questions, function(index, qst) {
            questionMap.push({
              'student': item,
              'qst': qst
            })
          });
        });
        questionMap = this.removeDuplicates(questionMap);
        localStorage.setItem('questionMap', JSON.stringify(questionMap));
        $('.overLay, #myModal').fadeOut();
        $('#myModal').fadeTo("fast", 0);
        window.location.reload();
      }
    },
    removeDuplicates: function(array) {

      function arrayContains(arr, val, equals) {
        var i = arr.length;
        while (i--) {
          if (equals(arr[i], val)) {
            return true;
          }
        }
        return false;
      }

      function removeDuplicates(arr, equals) {
        var originalArr = arr.slice(0);
        var i, len, j, val;
        arr.length = 0;

        for (i = 0, len = originalArr.length; i < len; ++i) {
          val = originalArr[i];
          if (!arrayContains(arr, val, equals)) {
            arr.push(val);
          }
        }
        return arr;
      }

      function thingsEqual(thing1, thing2) {
        return thing1.student === thing2.student &&
          thing1.qst === thing2.qst;
      }

      return removeDuplicates(array, thingsEqual);

    }

  });

});
