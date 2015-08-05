'use strict';

describe('Directive: canvasKeys', function () {

    var element,
        scope,
        base,
        vrsketchService;

  var cameraPos = {};
  cameraPos.z = 2;
  
  var mockVrsketchService = {};
  mockVrsketchService.camera = {};
  mockVrsketchService.camera.cameraObject = {};
  //mockVrsketchService.camera.cameraObject.position = new THREE.Vector3(0, 3.5, cameraPos.z);
  mockVrsketchService.camera.cameraObject.position = null;
  mockVrsketchService.camera.cameraObject.rotation = null;

//   var e = new KeyboardEvent("keydown", {
//     bubbles : true,
//     cancelable : true,
//     char : "Q",
//     key : "q",
//     shiftKey : true,
//     keyCode : 81
// });

  var triggerKeyEvent = function (element, keyCode, evt) {
    var evnt = evt || "keydown";
    var e = $.Event(evnt);
    //console.log("now in triggerKeyEvent, keys(e)=" + Object.keys(e));
    //var e = angular.element.Event('keydown');
    e.which = keyCode;
    e.keyCode = keyCode;
    e.shiftKey = true;
    e.altKey = true;
    //element.trigger(e);
    angular.element(element).triggerHandler(e);
    //$(element).trigger(e);
  };
  
  // load the directive's module
  beforeEach(module('vrsketchApp', function ($provide) {
    // init mockVrsketchService each time
    mockVrsketchService.INIT_POSITION = new THREE.Vector3(0,0,0);
    mockVrsketchService.INIT_ROTATION = new THREE.Euler(0,0,0, 'XYZ');
    mockVrsketchService.BasePosition = new THREE.Vector3(0,0,0);
    mockVrsketchService.BaseRotation = new THREE.Euler(0,0,0, 'XYZ');
    //mockVrsketchService.camera.cameraObject = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000);
    mockVrsketchService.camera.cameraObject.position = new THREE.Vector3(0, 3.5, cameraPos.z);
    mockVrsketchService.camera.cameraObject.rotation = new THREE.Euler( 0, 0, 0, 'XYZ' );

    mockVrsketchService.camera.cameraObject.translateZ = function (val) {
      //console.log("now in mock translateZ, val=" + val);
      this.position.z = val;
    //}.bind(mockVrsketchService.camera.cameraObject);
    };
    
    mockVrsketchService.camera.cameraObject.translateX = function (val) {
      //console.log("now in mock translateX, val=" + val);
      this.position.x = val;
    //}.bind(mockVrsketchService.camera.cameraObject);
    };

    mockVrsketchService.camera.cameraObject.translateY = function (val) {
      //console.log("now in mock translateX, val=" + val);
      this.position.y = val;
    };
    
    // mockVrsketchService.control = new function () {
    //   //this.rotationSpeed = 0.005;
    //     //this.scale = 1;
    //     //factory.camera.cameraObject.rotation.y = 0;
    //     //factory.camera.cameraObject.fov = 75;
    //     this.scale = 1;
    //     //this.rotation = {};
    //     this.rotY = 0;
    //   };

    
    $provide.value('VrsketchService', mockVrsketchService);
  }));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _base_) {
    scope = $rootScope.$new();

    element = angular.element('<input canvas-keys=""></input>');
    element = $compile(element)(scope);
    scope.$digest();

    base = _base_;

    //console.log("canvaskeys.js.beforeEach: base.ONE_DEGREE=" + base.ONE_DEGREE);
    
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<canvas-keys></canvas-keys>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the canvasKeys directive');
  // }));


  it('responds to w key', inject(function () {
    // element = angular.element('<input canvas-keys=""></input>');
    // element = $compile(element)(scope);
    // scope.$digest(); 
    
    // console.log("keys(element)=" + Object.keys(element));
    // var el = element.find('canvas');
    // console.log("keys(el)=" + Object.keys(el));
    //console.log("hello");

    //w 
    triggerKeyEvent(element, 87, 'keydown');
    //expect(mockVrsketchService.camera.cameraObject.position.z).toEqual(cameraPos.z + 1);
    // console.log("canvaskeys.js<spec>: mockVrsketchService.BasePosition.z=" + mockVrsketchService.BasePosition.z);
    //expect(mockVrsketchService.BasePosition.z).toEqual(-base.CAMERA_MOVE_DELTA);
    expect(mockVrsketchService.camera.cameraObject.position.z).toEqual(-base.CAMERA_MOVE_DELTA);
  }));

  it('camera moves backwards when s is pressed', inject(function () {
    //s
    triggerKeyEvent(element, 83, 'keydown');
    //console.log("mockVrsketchService.BasePosition.x=" + mockVrsketchService.BasePosition.x + ",mockVrsketchService.BasePosition.z=" + mockVrsketchService.BasePosition.z);
    //expect(mockVrsketchService.camera.cameraObject.position.z).toEqual(cameraPos.z - 1);
    //expect(mockVrsketchService.BasePosition.z).toEqual(1);
    expect(mockVrsketchService.camera.cameraObject.position.z).toEqual(base.CAMERA_MOVE_DELTA);
  }));

  it('camera moves left when a is pressed', inject(function () {
    //a
    triggerKeyEvent(element, 65, 'keydown');
    
    //expect(mockVrsketchService.camera.cameraObject.position.z).toEqual(cameraPos.z - 1);
    //expect(mockVrsketchService.BasePosition.x).toEqual(-1);
    expect(mockVrsketchService.camera.cameraObject.position.x).toEqual(-base.CAMERA_MOVE_DELTA);
  }));

  it('camera moves right when d is pressed', inject(function () {
    //d
    triggerKeyEvent(element, 68, 'keydown');
    
    //expect(mockVrsketchService.BasePosition.x).toEqual(1);
    expect(mockVrsketchService.camera.cameraObject.position.x).toEqual(base.CAMERA_MOVE_DELTA);
  }));
  
  it('camera rotates to left when q is pressed', inject(function () {
    //q
    triggerKeyEvent(element, 81, 'keydown');
    //expect(mockVrsketchService.camera.cameraObject.rotation.y).toEqual(base.ONE_DEGREE * 10);
    expect(mockVrsketchService.BaseRotation.y).toEqual(base.ONE_DEGREE * base.CAMERA_ROT_DELTA);
  }));

  it('camera rotates to right when e is pressed', inject(function () {
    //e
    triggerKeyEvent(element, 69, 'keydown');
    //expect(mockVrsketchService.camera.cameraObject.rotation.y).toEqual(-base.ONE_DEGREE * 10);
    expect(mockVrsketchService.BaseRotation.y).toEqual(-base.ONE_DEGREE * base.CAMERA_ROT_DELTA);
  }));

  it('camera moves up when p is pressed', inject(function () {
    //p
    triggerKeyEvent(element, 80, 'keydown');
    
    expect(mockVrsketchService.camera.cameraObject.position.y).toEqual(base.CAMERA_MOVE_DELTA);
  }));

  it('camera moves down when n is pressed', inject(function () {
    //n
    triggerKeyEvent(element, 78, 'keydown');
    
    expect(mockVrsketchService.camera.cameraObject.position.y).toEqual(-base.CAMERA_MOVE_DELTA);
  }));
  
  it('camera returns to base position and rotation when r is pressed', inject(function () {
    //expect(mockVrsketchService.camera.cameraObject.rotation.y).toEqual(-base.ONE_DEGREE * 10);
    mockVrsketchService.BasePosition = new THREE.Vector3(10,5,1);
    mockVrsketchService.BaseRotation = new THREE.Euler(1,2,3, 'XYZ');
    
    //r
    triggerKeyEvent(element, 82, 'keydown');

    expect(mockVrsketchService.BasePosition.y).toEqual(0);
    
  }));
  
});
