'use strict';

describe('Service: camera', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var camera;
  beforeEach(inject(function (_camera_) {
    camera = _camera_;
  }));

  it('should do something', function () {
    expect(!!camera).toBe(true);
  });

  it('constructor works as expected', function () {
    expect(typeof camera).toEqual('object'); 
    expect(camera.cameraObject.type).toEqual('PerspectiveCamera');
    expect(camera.lookAtDirection).toBeTruthy();
    expect(camera.lookAtDirection.z).toEqual(-1);
  });

});
