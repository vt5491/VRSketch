'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.utils
 * @description
 * # utils
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('utils', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var factory = {};

    factory.gui = new dat.GUI();
    
    factory.addControls = function(controlObject) {
      //var gui = new dat.GUI();
      console.log("utils: now in addControls");
      //gui.add(controlObject, 'rotationSpeed', -0.1, 0.1);
      //gui.add(controlObject, 'scale', 0.01, 2);
      //gui.add(controlObject, 'camera.cameraObject.rotation.y', 0, 2.0 * Math.PI);
      //gui.add(controlObject, 'fov', -0.1, 0.1);
      //gui.add(controlObject, 'scale', 0.01, 2);
      //gui.add(controlObject, 'rotation_y', 0, 2.0 * Math.PI);
      this.gui.add(controlObject, 'rotY').min(-180).max(180).step(1);
    };

    return factory; 
  });
