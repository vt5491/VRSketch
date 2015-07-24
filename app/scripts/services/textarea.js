'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.TextArea
 * @description
 * # TextArea
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .service('TextArea', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

      // this.object = new THREE.Mesh(
      // new THREE.PlaneGeometry(2, 2),
      // new THREE.MeshBasicMaterial(textAreaMat));

    var factory = {};

    factory.frame = null;

    factory.doIt = function () {
      return 7;
    };
    
    factory.createFrame = function (canvas) {
      var canvas = document.createElement('canvas');
      var FONT_SIZE_PX = 40;
      
      canvas.width = canvas.height = 500;

      this.context = canvas.getContext('2d');
      this.context.font = FONT_SIZE_PX + 'px Inconsolata,monospace';
      this.context.globalCompositeOperation = 'darker';
      
      this.textTexture = new THREE.Texture(canvas);
      this.textTexture.needsUpdate = true;

      this.textTexture.minFilter = THREE.NearestFilter;

      var textAreaMat = new THREE.MeshBasicMaterial(
        {map: this.textTexture, side: THREE.DoubleSide, color: 0xff2000});
      
      var material = new THREE.MeshBasicMaterial(
        { color: 0x80ff00,
          side: THREE.DoubleSide,
            //map: THREE.ImageUtils.loadTexture("images/webgl-logo-256.jpg")
          map: THREE.ImageUtils.loadTexture("images/background.png")
          }
      );

      this.frame = new THREE.Mesh(
       new THREE.PlaneGeometry(2, 1),
       //new THREE.MeshBasicMaterial(textAreaMat)
        material
      );

      // bump it up so it's entirely above the background plane
      this.frame.translateY(0.5);
      
      this.frame.material.color.setHex( 0xffffff );

      return this.frame;
    };

    return factory;
  });
