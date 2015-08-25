'use strict';

/**
 * @ngdoc directive
 * @name vrsketchApp.directive:canvasKeys
 * @description
 * # canvasKeys
 */
angular.module('vrsketchApp')
  .directive('canvasKeys', function ($document, $rootScope, VrsketchService, camera, base) {
    return {
      
      restrict: 'A',

      link: function postLink(scope, element, attrs) {
        
        var kbdHandler = function(event) {

          // prevent browser from handling as well
          event.preventDefault();

          // Note: there are two pairs for each keypress.  The first line seems to work
          // in scruz and the second in svale.  Have no idea why
          switch( event.keyCode) {
            case 'S'.charCodeAt(0):

            VrsketchService.camera.cameraLogical.translateZ(base.CAMERA_MOVE_DELTA);
            //VrsketchService.camera.cameraLogical.translateX(-base.CAMERA_MOVE_DELTA);
            
            break;
            case 'W'.charCodeAt(0):
 
              VrsketchService.camera.cameraLogical.translateZ(-base.CAMERA_MOVE_DELTA);
              //VrsketchService.camera.cameraLogical.translateX(base.CAMERA_MOVE_DELTA);

              break;
            case 'A'.charCodeAt(0):
 
              VrsketchService.camera.cameraLogical.translateX(-base.CAMERA_MOVE_DELTA);
              //VrsketchService.camera.cameraLogical.translateZ(-base.CAMERA_MOVE_DELTA);

            break;
            case 'D'.charCodeAt(0):

              VrsketchService.camera.cameraLogical.translateX(base.CAMERA_MOVE_DELTA);
              //VrsketchService.camera.cameraLogical.translateZ(base.CAMERA_MOVE_DELTA);

              break;

            case 'Q'.charCodeAt(0):
              
              //VrsketchService.BaseRotation.y +=  base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
              //VrsketchService.camera.cameraLogical.rotateOnAxis(
              // VrsketchService.camera.cameraObject.rotateOnAxis(
              //  new THREE.Vector3(0,1,0), base.ONE_DEGREE * base.CAMERA_ROT_DELTA);
              //tmpQuat = new Quaternion().setFromAxisAngle ( axis, angle );
              var tmpQuat = new THREE.Quaternion().setFromAxisAngle ( new THREE.Vector3(0,1,0), base.ONE_DEGREE * base.CAMERA_ROT_DELTA );
              //VrsketchService.BaseRotation.multiply(tmpQuat);
              VrsketchService.BaseRotation.multiplyQuaternions(VrsketchService.BaseRotation, tmpQuat);

              //VrsketchService.camera.cameraLogical.rotation.y +=  base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
              VrsketchService.camera.cameraLogical.quaternion.multiply(tmpQuat);

            break;
            
            case 'E'.charCodeAt(0):
              //VrsketchService.BaseRotation.y = VrsketchService.BaseRotation.y - base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
              //VrsketchService.BaseRotation.y -=  base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
              var tmpQuat = new THREE.Quaternion().setFromAxisAngle ( new THREE.Vector3(0,1,0), -base.ONE_DEGREE * base.CAMERA_ROT_DELTA );
              //VrsketchService.BaseRotation.multiply(tmpQuat);
              VrsketchService.BaseRotation.multiplyQuaternions(VrsketchService.BaseRotation, tmpQuat);

              //VrsketchService.camera.cameraLogical.rotation.y -=  base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
              VrsketchService.camera.cameraLogical.quaternion.multiply(tmpQuat);
            
            break;
            case 'P'.charCodeAt(0):

              VrsketchService.camera.cameraLogical.translateY(base.CAMERA_MOVE_DELTA);

            break;
            case 'N'.charCodeAt(0):

              VrsketchService.camera.cameraLogical.translateY(-base.CAMERA_MOVE_DELTA);

            break;
            
            case 'R'.charCodeAt(0):

              VrsketchService.BasePosition.copy(VrsketchService.INIT_POSITION);
              VrsketchService.BaseRotation.copy(VrsketchService.INIT_ROTATION);

            break;
          }
        };

        // I have to bind to $document for runtime and to element for testing.  I think I should
        // be able to use element for both, but for now just bind to both
        $document.on("keydown", kbdHandler);
        element.on("keydown", kbdHandler);
      }
    };
  });
