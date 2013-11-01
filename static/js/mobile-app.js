define([
], function () {

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

    window.addEventListener('deviceorientation', function (e) {
      self.onDeviceOrientation(e);
    }, false);
  };

  App.prototype.onDeviceOrientation = function (e) {
    var self = this;

    if (self.shouldEmit) {
      self.io.emit('deviceorientation', {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      });
      self.shouldEmit = false;
      setTimeout(function () {
        self.shouldEmit = true;
      }, 20);
    }
  };

  return App;

});