requirejs.config({
  paths: {
    'jquery': '../bower_components/jquery/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'threejs': '../bower_components/threejs/build/three'
  },
  shim: {
    'threejs': {
      exports: 'THREE'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require([
  'desktop-app'
], function (App) {

  "use strict";

  window.app = new App();

});