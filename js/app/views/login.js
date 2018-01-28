define(function(require) {

  "use strict";

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!tpl/login/login.html'),
    user_tpl = require('text!tpl/login/user.html'),
    stdnt_tpl = require('text!tpl/login/student.html'),

    template = _.template(tpl);
  user_tpl = _.template(user_tpl);
  stdnt_tpl = _.template(stdnt_tpl);

  return Backbone.View.extend({
    events: {
      "click .btn-default": "flushView",
      "click .primaryLogin": "login",
      "click .secondaryLogin": "student_login",
      "change input[type='radio']": 'watchRadioBtn'
    },
    students: [],
    render: function() {
      this.$el.html(template());
      this.$el.find('.content').html(user_tpl());
      if (localStorage.students) {
        this.students = JSON.parse(localStorage.students);
      } else {
        this.students = ['dasher', 'dancer', 'prancer', 'vixen', 'comet', 'cupid', 'donner', 'blitzen', 'rudolph', 'olive']
        localStorage.setItem('students', JSON.stringify(this.students));
      }
      return this;
    },
    flushView: function() {
      this.currentUserType = undefined;
      this.$el.find('.btn-primary').addClass('primaryLogin').removeClass('secondaryLogin');
      this.$el.find('.content').html(user_tpl());
    },
    login: function(e) {
      var _self = this;
      if (this.currentUserType === 'student') {
        this.$el.find('.btn-primary').removeClass('primaryLogin').addClass('secondaryLogin');
        this.$el.find('.content').html(stdnt_tpl());
        $("#studentName").autocomplete({
          source: _self.students
        });
      } else if (this.currentUserType === 'teacher') {
        localStorage.currentUserType = this.currentUserType;
        window.location.hash = "#createQuestion"
        // alert('teacher login')
      } else {
        alert('please select a user')
      }
      // Backbone.history.navigate('#question')
    },
    student_login: function() {
      if (this.$el.find('#studentName').val().length == 0) {
        alert('Please enter your name');
      } else {
        localStorage.currentUserType = this.currentUserType;
        localStorage.currentUserName = this.$el.find('#studentName').val();
        if ($.inArray(this.$el.find('#studentName').val(), this.students) < 0) {
          this.students.push(this.$el.find('#studentName').val());
          localStorage.setItem('students', JSON.stringify(this.students));
        }
        window.location.hash = '#quiz';
      }
    },
    watchRadioBtn: function(e) {
      this.currentUserType = this.$el.find('.userOpt:checked').val();
    }

  });

});
