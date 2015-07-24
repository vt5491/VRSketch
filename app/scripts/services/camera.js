'use strict';

// This is just a wrapper for a 3js camera (a PerspectiveCamera by default)
// We do this because we may want to add some additional properties onto the camera
// such a velocity.  We may also want to "logicalize" one physical camera into
// several logical cameras, by updating the position or rotation on the one camera
// and passing it back to the caller as if it were a new camera (I'm assuming a camera
// is a fairly heavy-weight object in 3js and we don't want anymore than necessary).
//
// I can envision having several logical cameras that we flip between to the render
// the view from multiple scenes.  By having a wrapper we can pool physical cameras
// and map to logical camers.

// I mention all this to justify this class.  Because until we do any of the things
// mentioned above, this will be a pretty minimal class, and will essentially just
// retun a THREE.PerspectiveCamera, and clients can just use the native THREE api
// to manipulate it.
/**
 * @ngdoc service
 * @name vrsketchApp.camera
 * @description
 * # camera
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('camera', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var factory = {};

    // factory.object = new THREE.PerspectiveCamera(
    //   75, this.width / this.height, 1, 10000);
    // Note: currently you have to manually init this in your client services.  You
    // can't rely on the camerObject defined here.
    factory.cameraObject = new THREE.PerspectiveCamera(
      75, this.width / this.height, 1, 10000);

    factory.doIt = function () {
      return 8;
    };

    factory.lookAtDirection = new THREE.Vector3(0, 0, -1);

    return factory;
  });










