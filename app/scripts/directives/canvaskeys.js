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
      //template: '<div></div>',
      restrict: 'A',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the canvasKeys directive');
      // }
      link: function postLink(scope, element, attrs) {
        //console.log("now in keypressevents directive");
        
        var kbdHandler = function(event) {
          //console.log("hello mammy2, event.which=" + event.which + ",event.shiftKey=" + event.shiftKey);
          // all the canvas keystrokes are alt-key combos
          // if (!(event.altKey && event.shiftKey)) {
          //   return;
          // };

          // prevent browser from handling as well
          event.preventDefault();

          switch( event.keyCode) {
            case 'S'.charCodeAt(0):
            //console.log("canvaskeys:VrsketchService.camera.cameraObject.position.z=" + VrsketchService.camera.cameraObject.position.z);
            // console.log("canvaskeys:VrsketchService.camera.cameraObject.position.y=" + VrsketchService.camera.cameraObject.position.y);
              //VrsketchService.BasePosition.x += Math.sin(VrsketchService.BaseRotation.y);
              //VrsketchService.BasePosition.z += Math.cos(VrsketchService.BaseRotation.y);

            //VrsketchService.camera.cameraObject.translateZ(base.CAMERA_MOVE_DELTA);
            // 
            // VrsketchService.camera.cameraObject.position.z += 0.5;
            // console.log("canvaskeys:VrsketchService.camera.cameraObject.position.z (post)=" + VrsketchService.camera.cameraObject.position.z);
            //console.log("canvaskeys: BasePosition.z (pre)=" + VrsketchService.BasePosition.z);
            //VrsketchService.BasePosition.translateZ(base.CAMERA_MOVE_DELTA);
            //VrsketchService.BasePosition.z += base.CAMERA_MOVE_DELTA;
            //console.log("canvaskeys: camera.cameraLogical.position.z (pre)=" + VrsketchService.camera.cameraLogical.position.z);
            VrsketchService.camera.cameraLogical.translateZ(base.CAMERA_MOVE_DELTA);
            //console.log("canvaskeys: camera.cameraLogical.position.z (post)=" + VrsketchService.camera.cameraLogical.position.z);
              break;
            case 'W'.charCodeAt(0):
              // update BasePostion
            // VrsketchService.BasePosition.x -= Math.sin(VrsketchService.BaseRotation.y);
            // VrsketchService.BasePosition.z -= Math.cos(VrsketchService.BaseRotation.y);
              //console.log("canvaskeys: you pressed w key: base.CAMERA_MOVE_DELTA=" + base.CAMERA_MOVE_DELTA);
              //console.log("canvaskeys: you pressed w key: VrsketchService.camera.cameraObject=" + VrsketchService.camera.cameraObject);
            
              //VrsketchService.camera.cameraObject.translateZ(-base.CAMERA_MOVE_DELTA);
              VrsketchService.camera.cameraLogical.translateZ(-base.CAMERA_MOVE_DELTA);

              break;
            case 'A'.charCodeAt(0):
            //   VrsketchService.BasePosition.x -= Math.sin(VrsketchService.BaseRotation.y + Math.PI / 2);
            // VrsketchService.BasePosition.z -= Math.cos(VrsketchService.BaseRotation.y + Math.PI / 2);
            //VrsketchService.camera.cameraObject.translateX(-base.CAMERA_MOVE_DELTA);
            VrsketchService.camera.cameraLogical.translateX(-base.CAMERA_MOVE_DELTA);

              break;
            case 'D'.charCodeAt(0):
              // update BasePostion
            //   VrsketchService.BasePosition.x += Math.sin(VrsketchService.BaseRotation.y + Math.PI / 2);
            // VrsketchService.BasePosition.z += Math.cos(VrsketchService.BaseRotation.y + Math.PI / 2);
              //VrsketchService.camera.cameraObject.translateX(base.CAMERA_MOVE_DELTA);
              VrsketchService.camera.cameraLogical.translateX(base.CAMERA_MOVE_DELTA);

              break;

            case 'Q'.charCodeAt(0):
              //VrsketchService.BaseRotation.y = VrsketchService.BaseRotation.y +  base.ONE_DEGREE * 10;
            VrsketchService.BaseRotation.y +=  base.ONE_DEGREE * base.CAMERA_ROT_DELTA;

            //VrsketchService.BaseRotation.rotateOnAxis(new THREE.Vector3(0,1,0), base.ONE_DEGREE * 10);
            //VrsketchService.camera.cameraObject.rotateOnAxis(new THREE.Vector3(0,1,0), base.ONE_DEGREE * 10);
            //VrsketchService.control.rotY += 10;

              break;
            
            case 'E'.charCodeAt(0):
              VrsketchService.BaseRotation.y = VrsketchService.BaseRotation.y - base.ONE_DEGREE * base.CAMERA_ROT_DELTA;
            break;
            case 'P'.charCodeAt(0):

              //VrsketchService.camera.cameraObject.translateY(base.CAMERA_MOVE_DELTA);
              VrsketchService.camera.cameraLogical.translateY(base.CAMERA_MOVE_DELTA);

            break;
            case 'N'.charCodeAt(0):

              //VrsketchService.camera.cameraObject.translateY(-base.CAMERA_MOVE_DELTA);
              VrsketchService.camera.cameraLogical.translateY(-base.CAMERA_MOVE_DELTA);

            break;
            
            case 'R'.charCodeAt(0):
            // console.log("canvaskeys: now in R handler");
            // console.log("canvaskeys: VrsketchService.INIT_POSITION.z=" + VrsketchService.INIT_POSITION.z);
            // console.log("canvaskeys: BasePostion.z pre=" + VrsketchService.BasePosition.z);
            VrsketchService.BasePosition.copy(VrsketchService.INIT_POSITION);
            VrsketchService.BaseRotation.copy(VrsketchService.INIT_ROTATION);

            // console.log("canvaskeys: BasePostion.z post=" + VrsketchService.BasePosition.z);
            break;
          }
          
          // if (event.which === 88) {
          //   scope.keyPressed = 'x';
          //   console.log("keypressEvents: you pressed x");
          // }
          // // w
          // else if (event.which === 87){
          //   event.preventDefault();
          //   console.log("keypressEvents: you pressed w, upping z");
          //   console.log("keypressEvents: VrsketchService.camera.cameraObject.position.z pre=" + VrsketchService.camera.cameraObject.position.z);
          //   //VrsketchService.camera.cameraObject.position.z = VrsketchService.camera.cameraObject.position.z + 1;
          //   //TODO: we update camera position based on BasePosition, so the
          //   // these steps where we update the camera position are not needed
          //   //VrsketchService.camera.cameraObject.position.x += Math.cos(VrsketchService.camera.cameraObject.rotation.y);
          //   //VrsketchService.camera.cameraObject.position.z += Math.sin(VrsketchService.camera.cameraObject.rotation.y);
          //   // update BasePostion
          //   VrsketchService.BasePosition.x += Math.cos(VrsketchService.BaseRotation.y);
          //   VrsketchService.BasePosition.z += Math.sin(VrsketchService.BaseRotation.y);
            
          //   console.log("keypressEvents: VrsketchService.BasePosition.x post=" + VrsketchService.BasePosition.x);
          //   console.log("keypressEvents: VrsketchService.BasePosition.z post=" + VrsketchService.BasePosition.z);
          // }
          
          // // s 83
          // else if ( event.keyCode == 'S'.charCodeAt(0)){
          //   event.preventDefault();
          //   //VrsketchService.camera.cameraObject.position.z = VrsketchService.camera.cameraObject.position.z - 1;
          //   //VrsketchService.camera.cameraObject.position.x -= Math.cos(VrsketchService.camera.cameraObject.rotation.y);
          //   //VrsketchService.camera.cameraObject.position.z -= Math.sin(VrsketchService.camera.cameraObject.rotation.y);
          //   VrsketchService.BasePosition.x -= Math.cos(VrsketchService.BaseRotation.y);
          //   VrsketchService.BasePosition.z -= Math.sin(VrsketchService.BaseRotation.y);
            
          // }
          
          // // q
          // else if (event.which === 81){
          //   console.log("keypressEvents: camera rotation.y pre=" + VrsketchService.camera.cameraObject.rotation.y);
          //   console.log("keypressEvents: BaseRotation.y pre=" + VrsketchService.BaseRotation.y);
          //   //VrsketchService.camera.cameraObject.rotation.y = VrsketchService.camera.cameraObject.rotation.y +  base.ONE_DEGREE * 10;
          //   VrsketchService.BaseRotation.y = VrsketchService.BaseRotation.y +  base.ONE_DEGREE * 10;
          //   console.log("keypressEvents: camera rotation.y post=" + VrsketchService.camera.cameraObject.rotation.y);
          //   console.log("keypressEvents: BaseRotation.y post=" + VrsketchService.BaseRotation.y);
          // }

          // // e
          // else if (event.which === 69){
          //   event.preventDefault();
          //   console.log("keypressEvents: camera rotation.y pre=" + VrsketchService.camera.cameraObject.rotation.y);
          //   console.log("keypressEvents: BaseRotation.y pre=" + VrsketchService.BaseRotation.y);
          //   //VrsketchService.camera.cameraObject.rotation.y = VrsketchService.camera.cameraObject.rotation.y +  base.ONE_DEGREE * 10;
          //   VrsketchService.BaseRotation.y = VrsketchService.BaseRotation.y - base.ONE_DEGREE * 10;
          //   console.log("keypressEvents: camera rotation.y post=" + VrsketchService.camera.cameraObject.rotation.y);
          //   console.log("keypressEvents: BaseRotation.y post=" + VrsketchService.BaseRotation.y);
          // }
          
          // else {
          //   scope.keyPressed = 'Keycode: ' + event.which;
          // }
          
        };

        // I have to bind to $document for runtime and to element for testing.  I think I should
        // be able to use element for both, but for now just bind to both
        $document.on("keydown", kbdHandler);
        element.on("keydown", kbdHandler);
        // $document.on("keypress", kbdHandler);
        // element.on("keypress", kbdHandler);
        // $document.on("keyup", kbdHandler);
        // element.on("keyup", kbdHandler);
      }
      
    };
  });
