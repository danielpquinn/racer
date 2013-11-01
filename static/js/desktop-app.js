define([
  'jquery',
  'underscore',
  'threejs',
  'racer/player'
], function($, _, THREE, Player) {

  "use strict";

  function App() {
    this.initialize();
  }

  App.prototype.initialize = function () {
    this.io = io.connect();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.scene = new THREE.Scene();
    this.renderer = new THREE.CanvasRenderer();
    this.players = [];

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z = 1000;
    
    document.body.appendChild( this.renderer.domElement );

    this.bindEvents();
    this.update();
  };

  App.prototype.bindEvents = function () {
    var self = this;

    self.io.on('connection data', function (data) { self.onConnectionData(data); });
    self.io.on('player connected', function (data) { self.addPlayer(data.id); });
    self.io.on('player disconnected', function (data) { self.removePlayer(data.id); });
    self.io.on('deviceorientation', function (data) { self.onDeviceOrientation(data); });
  };

  App.prototype.onConnectionData = function (data) {
    var self = this;

    _.each(data.players, function (player) {
      console.log(player);
      self.addPlayer(player.id);
    });
  };

  App.prototype.addPlayer = function (id) {
    var player = new Player(id);

    this.players.push(player);
    this.scene.add(player.mesh);
    console.log(this.players);
  };

  App.prototype.removePlayer = function (id) {
    this.scene.remove(_.findWhere(this.players, {id: id}).mesh);
    this.players = _.without(this.players, _.findWhere(this.players, {id: id}));
  };

  App.prototype.onDeviceOrientation = function (data) {
    var player = _.findWhere(this.players, {id: data.id});

    player.setRotation({
      x: 0,
      y: data.event.gamma * (Math.PI / 180) * -1,
      z: 0
    });
  };

  App.prototype.update = function () {
    var self = this;

    setTimeout(function () {
      self.update();
    }, 100);
    this.renderer.render( this.scene, this.camera );
  };

  return App;

});