'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.index
 * @description
 * # index
 * Factory in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('index', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    // return {
    //   someMethod: function () {
    //     return meaningOfLife;
    //   }
    // };
    var factory = {};

    factory.initWebGl = function () {
      try {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas: document.getElementById('viewer')
        });
      }
      catch(e){
        alert('This application needs WebGL enabled!');
        return false;
      }

      this.renderer.setClearColor(0xD3D3D3, 1.0);
      this.renderer.setSize(this.width, this.height);

      this.container = document.getElementById('container');
    };

    return factory;
  });
  // constr.prototype.initWebGL = function () {
  //   try {
  //     this.renderer = new THREE.WebGLRenderer({
  //         antialias: true,
  //         canvas: document.getElementById('viewer')
  //     });
  //   }
  //   catch(e){
  //     alert('This application needs WebGL enabled!');
  //     return false;
  //   }

  //   this.renderer.setClearColor(0xD3D3D3, 1.0);
  //   this.renderer.setSize(this.width, this.height);

  //   this.container = document.getElementById('container');
  // };

