'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.index
 * @description
 * # index
 * Factory in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('index',['$window', 'base', function ($window, base) {
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
    
    //factory.doSomething = function($scope) {
    factory.doSomething = function(aCtrl) {
      //console.log("index.doSomething: $scope=" + $scope);
      //console.log("index.doSomething: $scope.doSomething=" + $scope.doSomething);
      // you need to check if the passe parm is defined.  There seems to be a use case when the app is refreshing
      // that this method is called and 'aCtrl' is not defined yet.
      if (typeof aCtrl !== 'undefined') {
        console.log("index.doSomething: aCtrl.vt_num=" + aCtrl.vt_num);
        console.log("index.doSomething: aCtrl.doSomething()=" + aCtrl.doSomething());

        console.log("index.doSomething: aCtrl.vt_num pre=" + aCtrl.vt_num);
        
        aCtrl.vt_num += 2;

        console.log("index.doSomething: aCtrl.vt_num post=" + aCtrl.vt_num);
      }
      
      //console.log("index.doSomething: aCtrl.constructor=" + aCtrl.constructor);
      //console.log("index.doSomething: aCtrl.doSomething()=" + aCtrl.doSomething());
      return 7;
    };

    factory.doSomething2 = function() {
      //console.log("index.doSomething: $scope=" + $scope);
      //console.log("index.doSomething: $scope.doSomething=" + $scope.doSomething);
      // if (typeof aCtrl !== 'undefined') {
      //   console.log("index.doSomething: aCtrl.vt_num=" + aCtrl.vt_num);
      //   console.log("index.doSomething: aCtrl.doSomething()=" + aCtrl.doSomething());
      // }
      
      //console.log("index.doSomething: aCtrl.constructor=" + aCtrl.constructor);
      //console.log("index.doSomething: aCtrl.doSomething()=" + aCtrl.doSomething());
      //return 7;
      this.vt_num++;

      console.log('service.index.js.doSomething2: this.vt_num=' + this.vt_num);
      console.log('service.index.js.doSomething2: base.ONE_DEGREE=' + base.ONEDEGREE);
    };

    //TODO create an init function here.
    // add a this.ctrl =ctrl, so I don't have to keep passing it around.
    // I'll have to update the uts to init index.init instead of passing it too
    // I can't really ut this function, as it's end to end
    factory.init = function ($window) {
      this.initWebGl($window);
      this.initScene();
    };
    
    factory.initWebGl = function ( $window) {
      console.log('service.index.js: entered initWebGl, this=' + this);
      console.log('service.index.js: $window=' + $window);
      console.log('service.index.js: $window.innerWidth=' + $window.innerWidth);
      console.log('service.index.js: $window.innerHeight=' + $window.innerHeight);
      // wierd init case where this function is called without ctrl being set
      // just return right away
      // if (typeof ctrl === 'undefined') {
      //   return;
      // };

      this.width = $window.innerWidth;
      this.height = $window.innerHeight;

      //console.log('index.initWebGl: viewer=' + document.getElementById('viewer'));
      console.log('index.initWebGl: viewer=' + angular.element(document.getElementById('viewer')));
      try {
        // TODO: mock document.getElementbyid('viewer') in ut setup
        // so that I can test with the canvas parm?
        console.log("index.initWebGl now getting renderer");
        //console.log('index.initWebGl document.getElementById(viewer)' = document.getElementById('viewer');
        
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          //canvas: angular.element(document.getElementById('viewer'))
          canvas: document.getElementById('viewer')
        });
      }
      catch(e){
        //console.log('This application needs WebGL enabled!');
        alert('This application needs WebGL enabled! error=' + e);
        return false;
      }

      // add to the controller that calls, not this factory
      this.renderer.setClearColor(0xD3D3D3, 1.0);
      this.renderer.setSize(this.width, this.height);
      //this.renderer.setSize(this.height, this.height);
      
      this.container = document.getElementById('container');

    };

  // setup some pointer info at the axes
    factory.initAxes = function() {
      var line_geometry, line_material;
      
      // x-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(255,0,0);

      line_geometry = new THREE.Geometry();
      
      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(1,0,0));

      this.xAxisLine = new THREE.Line(line_geometry, line_material);

      this.scene.add(this.xAxisLine);

      // y-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(0,255,0);

      line_geometry = new THREE.Geometry();

      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(0,1,0));

      this.yAxisLine = new THREE.Line(line_geometry, line_material);

      this.scene.add(this.yAxisLine);

      // z-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(0,0,255);

      line_geometry = new THREE.Geometry();

      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(0,0,1));

      this.zAxisLine = new THREE.Line(line_geometry, line_material);

      this.scene.add(this.zAxisLine);        
    };

    factory.initScene = function() {
      //console.log("service:index.initScene 2: ctrl=" + ctrl);

      // todo: make a real renderer
      //ctrl.renderer = {};
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
      75, this.width / this.height, 1, 10000);

      //vt-hack add
      // this should be in the animation loop
      //this.BasePosition = new THREE.Vector3(0.0, 2.0, EDITOR_CAMERA_DISTANCE);
      this.camera.position.copy(new THREE.Vector3(0.0, 2.0, 2.0));
      //vt-hack end
      this.controls = new THREE.VRControls(this.camera);
      this.effect = new THREE.VREffect(this.renderer);
      this.effect.setSize(this.width, this.height);

      this.vrManager = new WebVRManager(this.renderer, this.effect);
      
      var maxAnisotropy = this.renderer.getMaxAnisotropy();
      //linux
      var groundTexture = THREE.ImageUtils.loadTexture('images/background.png');
      // windows
      //var groundTexture = THREE.ImageUtils.loadTexture('RiftSketchSandBox/img/background.png');
      groundTexture.anisotropy = maxAnisotropy;
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set( 1000, 1000 );
      
      groundTexture.minFilter = THREE.NearestFilter;
      
      var ground = new THREE.Mesh(
        new THREE.PlaneGeometry( 1000, 1000 ),
        new THREE.MeshBasicMaterial({map: groundTexture}) );
      ground.rotation.x = -Math.PI / 2;
      //ground.rotation.x = 0.0;
      this.scene.add(ground);

      this.initAxes();
    };

    /*    
    factory.render = function () { 
      //vt add
      // note hasVR is not set anywhere in the code base.  hmd is set by default though
      this.hasVR = true;
      //vt end
      this.vrManager.getHMD().then(function (hmd) {

        //vt add
        if (this.editor_is_visible) {
          this.textArea.update();
        }
        //vt end
        //vtthis.textArea.update();
        this.controls.update();

        //console.log("vt:RiftSandbox.render: hmd=" + hmd + "this.hasVR=" + this.hasVR + ",vrManager.hasVR=" + this.vrManager.hasVR);
        if (!hmd) {
          this.camera.quaternion.multiplyQuaternions(BASE_ROTATION, this.camera.quaternion);
        }

        if (this.hasVR) {
          //if (false) {
          // working version
          // this.camera.position.copy(this.BasePosition);
          // //vt end        
          // var rotatedHMDPosition = new THREE.Vector3();
          // rotatedHMDPosition.copy(this.camera.position);
          
          // rotatedHMDPosition.applyQuaternion(this.BaseRotation);
          // //this.camera.position.copy(BASE_POSITION).add(rotatedHMDPosition);
          // this.camera.position.copy(this.BasePosition).add(rotatedHMDPosition);
          //end working version
          //if (this.vrManager.hasVR) {
          //vt add
          //console.log("vt:RiftSandbox.render: now in hmd path");
          this.camera.position.copy(this.BasePosition);
          //vt end        
          var rotatedHMDPosition = new THREE.Vector3();
          rotatedHMDPosition.copy(this.camera.position);
          
          rotatedHMDPosition.applyQuaternion(this.BaseRotation);
          //this.camera.position.copy(BASE_POSITION).add(rotatedHMDPosition);
          //vt-xthis.camera.position.copy(this.BasePosition).add(rotatedHMDPosition);
          //this.camera.position.copy(this.BasePosition).add(rotatedHMDPosition);
          this.camera.quaternion.multiplyQuaternions(this.BaseRotation, this.camera.quaternion);

        }
        else {
          console.log("vt:RiftSandbox.render: now in non-hmd path");
          this.camera.position.copy(BASE_POSITION);
          //this.camera.position.copy(this.BasePosition);
        }

        if (this.vrManager.isVRMode()) {
          this.effect.render(this.scene, this.camera);
        }
        else {
          this.renderer.render(this.scene, this.camera);
        }
      }.bind(this));
    }; // end render
     */    
    return factory;
  }]);
     

