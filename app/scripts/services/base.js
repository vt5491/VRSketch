'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.base
 * @description
 * # base
 * Factory in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('base', function () {
    // Service logic
    // ...

    // var meaningOfLife = 42;

    // // Public API here
    // return {
    //   someMethod: function () {
    //     return meaningOfLife;
    //   };

    //   ONE_DEGREE: Math.PI / 180.0;
    // };

    var factory = {};

    factory.ONE_DEGREE = Math.PI / 180.0;

    factory.CAMERA_MOVE_DELTA = 0.2;
    // CAMERA_ROT_DELTA is in degrees
    factory.CAMERA_ROT_DELTA = 10;

    //Colors
    factory.COLOR_YELLOW = new THREE.Color(100,255,0);
    factory.COLOR_GREEN = new THREE.Color(0,255,0);
    factory.COLOR_BLUE = new THREE.Color(0,0,255);
    factory.COLOR_ORANGE = new THREE.Color(255,165,0);
    factory.COLOR_WHITE = new THREE.Color(255,255,255);
    factory.COLOR_BROWN = new THREE.Color(139,69,19);
    
    return factory;
  });
