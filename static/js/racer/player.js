define([
  'threejs',
], function (THREE) {
  
  "use strict";

  function Player(id) {
    this.id = id;
    this.name = id;
    this.initialize();
  }

  Player.prototype.initialize = function () {
    this.geometry = new THREE.CubeGeometry( 200, 500, 20 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.averages = {
      x: [],
      y: [],
      z: []
    }

    this.mesh = new THREE.Mesh( this.geometry, this.material );
  };

  Player.prototype.setRotation = function (rotation) {
    this.averages.x.push(rotation.x);
    this.averages.y.push(rotation.y);
    this.averages.z.push(rotation.z);

    if (this.averages.x.length > 5) { this.averages.x.shift(); }
    if (this.averages.y.length > 5) { this.averages.y.shift(); }
    if (this.averages.z.length > 5) { this.averages.z.shift(); }

    this.mesh.rotation.x = rotation.x;
    this.mesh.rotation.y = rotation.y;
    this.mesh.rotation.z = rotation.z;
  };

  Player.prototype.getArrayAverage = function (array) {
    var sum = 0;

    for (var i = 0; i < array.length; i += 1) {
      sum += array[i];
    }

    return sum / array.length;
  }

  return Player;

});