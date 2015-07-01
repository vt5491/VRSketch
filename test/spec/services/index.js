'use strict';

describe('Service: index', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var index;
  var canvas;
  var scope;
  var vrsketchCtrl;
  var window;
  
  //beforeEach(inject(function (_index_, VrsketchCtrl) {
  beforeEach(inject(function (_index_, $rootScope, $controller, $window) {
    index = _index_;
    scope = $rootScope.$new();
    window = $window;
    //vrsketchCtrl = VrsketchCtrl;
    vrsketchCtrl = $controller('VrsketchCtrl', {
            $scope: scope
    });

    // create a canvas object
    canvas = $('<canvas id="viewer">');
    $(document.body).append(canvas);
    
  }));

  afterEach(function(){
   canvas.remove();
   canvas = null;
  });
  
  it('should do something', function () {
    expect(!!index).toBe(true);
  });

  //vt add
  it('initWebGl testing', function() {
    index.initWebGl(vrsketchCtrl, window);

    // save the original window.innerWidth and innerHeight, so we can compare later
    var oldInnerWidth = window.innerWidth;
    var oldInnerHeight = window.innerHeight;
    
    console.log('index.js: vrsketchCtrl.renderer.getClearColor()=' + vrsketchCtrl.renderer.getClearColor().getHex());
    expect(typeof index.initWebGl).toEqual("function");
    expect( vrsketchCtrl.renderer).toBeDefined();
    expect( vrsketchCtrl.renderer.getClearColor().getHex()).toEqual(0xD3D3D3);
    expect( vrsketchCtrl.width).toEqual(window.innerWidth);
    expect( vrsketchCtrl.height).toEqual(window.innerHeight);
    console.log('index.js: canvas.width=' + canvas.width());
    console.log('index.js: window.innerWidth=' + window.innerWidth);

    expect(canvas.width()).toEqual(oldInnerWidth);
    expect(canvas.height()).toEqual(oldInnerHeight);
  });

  describe('sub fixure', function () {
    // Since initWebgl sets the canvas.width, and that's another unit of code,
    // we need a sub-fixture to set it up here

    beforeEach(inject(function (_index_, $rootScope, $controller, $window) {
      vrsketchCtrl.width = 100;
      vrsketchCtrl.height = 110;

      // inject a dummy renderer
      //vrsketchCtrl.renderer = {}; 
      //vrsketchCtrl.renderer.canvas = {};
      vrsketchCtrl.renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas: document.getElementById('viewer')
        });
    }));
      
    fit('initScene works', function() {
      // we test the side effects of calling initScene
      // it should alter variables in the scope of the controller
      // console.log("ut: initScene: vrsketchCtrl=" + vrsketchCtrl);
      index.initScene(vrsketchCtrl);
      console.log("ut: initScene: vrsketchCtrl.width=" + vrsketchCtrl.width);
      // console.log("ut: initScene: typeof vrsketchCtrl.renderer=" + typeof vrsketchCtrl.renderer);

      // expect(vrsketchCtrl.renderer).toBeDefined();
      // expect(vrsketchCtrl.renderer).not.toBeNull();

      //todo: test for a real renderer  
      expect(vrsketchCtrl.scene).toBeTruthy();
      expect(vrsketchCtrl.camera.aspect).toEqual(vrsketchCtrl.width / vrsketchCtrl.height);
    });

  });
   
  //vt end
});
