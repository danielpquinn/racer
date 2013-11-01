requirejs.config({});

require([
  'mobile-app'
], function (App) {

  "use strict";

  window.app = new App();

});