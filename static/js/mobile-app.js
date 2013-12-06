define([
  'jquery'
], function ($) {

  function App() {
    this.initialize();
  }

  App.prototype.initialize = function () {
    this.io = io.connect();
    this.shouldEmit = true;

    this.io.emit('mobile player connected');
    this.bindEvents();
  };

  App.prototype.bindEvents = function () {
    var self = this;

    $('.key').on('touchstart', function (e) {
      var keyCode = $(e.target).data('keycode');
      self.io.emit('key pressed', { keyCode: keyCode });
    });
    $('.key').on('touchend', function (e) {
      var keyCode = $(e.target).data('keycode');
      self.io.emit('key released', { keyCode: keyCode });
    });
  };

  return App;

});