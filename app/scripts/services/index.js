'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.index
 * @description
 * # index
 * Factory in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('index', function ($window) {
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
    };

    //TODO create an init function here.
    // add a this.ctrl =ctrl, so I don't have to keep passing it around.
    // I'll have to update the uts to init index.init instead of passing it too
    // I can't really ut this function, as it's end to end
    factory.init = function (ctrl, $window) {
      this.initWebGl(ctrl, $window);
      this.initScene(ctrl);
    };
    
    factory.initWebGl = function (ctrl, $window) {
      console.log('service.index.js: entered initWebGl, ctrl=' + ctrl);
      console.log('service.index.js: $window=' + $window);
      console.log('service.index.js: $window.innerWidth=' + $window.innerWidth);
      console.log('service.index.js: $window.innerHeight=' + $window.innerHeight);
      // wierd init case where this function is called without ctrl being set
      // just return right away
      if (typeof ctrl === 'undefined') {
        return;
      };

      ctrl.width = $window.innerWidth;
      ctrl.height = $window.innerHeight;
      
      try {
        // TODO: mock document.getElementbyid('viewer') in ut setup
        // so that I can test with the canvas parm?
        console.log("index.initWebGl now getting renderer");
        ctrl.renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas: document.getElementById('viewer')
        });
      }
      catch(e){
        //console.log('This application needs WebGL enabled!');
        alert('This application needs WebGL enabled! error=' + e);
        return false;
      }

      // add to the controller that calls, not this factory
      ctrl.renderer.setClearColor(0xD3D3D3, 1.0);
      ctrl.renderer.setSize(ctrl.width, ctrl.height);
      //ctrl.renderer.setSize(ctrl.height, ctrl.height);
      
      ctrl.container = document.getElementById('container');

    };

  // setup some pointer info at the axes
    factory.initAxes = function(ctrl) {
      var line_geometry, line_material;
      
      // x-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(255,0,0);

      line_geometry = new THREE.Geometry();
      
      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(1,0,0));

      ctrl.xAxisLine = new THREE.Line(line_geometry, line_material);

      ctrl.scene.add(ctrl.xAxisLine);

      // y-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(0,255,0);

      line_geometry = new THREE.Geometry();

      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(0,1,0));

      ctrl.yAxisLine = new THREE.Line(line_geometry, line_material);

      ctrl.scene.add(ctrl.yAxisLine);

      // z-axis
      line_material = new THREE.LineBasicMaterial();
      line_material.color = new THREE.Color(0,0,255);

      line_geometry = new THREE.Geometry();

      line_geometry.vertices.push( new THREE.Vector3(0,0,0));
      line_geometry.vertices.push( new THREE.Vector3(0,0,1));

      ctrl.zAxisLine = new THREE.Line(line_geometry, line_material);

      ctrl.scene.add(ctrl.zAxisLine);        
    };

    factory.initScene = function(ctrl) {
      console.log("service:index.initScene 2: ctrl=" + ctrl);

      // todo: make a real renderer
      //ctrl.renderer = {};
      ctrl.scene = new THREE.Scene();

      ctrl.camera = new THREE.PerspectiveCamera(
      75, ctrl.width / ctrl.height, 1, 10000);

      //vt-hack add
      // this should be in the animation loop
      //this.BasePosition = new THREE.Vector3(0.0, 2.0, EDITOR_CAMERA_DISTANCE);
      ctrl.camera.position.copy(new THREE.Vector3(0.0, 2.0, 2.0));
      //vt-hack end
      ctrl.controls = new THREE.VRControls(ctrl.camera);
      ctrl.effect = new THREE.VREffect(ctrl.renderer);
      ctrl.effect.setSize(ctrl.width, ctrl.height);

      ctrl.vrManager = new WebVRManager(ctrl.renderer, ctrl.effect);
      
      var maxAnisotropy = ctrl.renderer.getMaxAnisotropy();
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
      ctrl.scene.add(ground);

      this.initAxes(ctrl);
    };

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
    
    return factory;
  });

