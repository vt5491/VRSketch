// vt note:
// x : left and right
// y : up and down
// z : forward and backward
'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.VrSketchService
 * @description
 * # VrSketchService
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  //.service('VrSketchService', function () {
  .factory('VrsketchService', function ($window, TextArea, camera, base, utils, sparseGridBackground) {    
    // AngularJS will instantiate a singleton by calling "new" on this function

    //console.log('VrsketchService: TextArea.doIt()= ' + TextArea.doIt() );
    var factory = {};

    factory.INIT_POSITION = new THREE.Vector3(0, 1.5, 2);
    //factory.INIT_POSITION = new THREE.Vector3(0, -1.5, 2);
    factory.BasePosition = new THREE.Vector3();
    factory.BasePosition.copy( factory.INIT_POSITION);
    //factory.BasePosition = new THREE.Vector3(0, 3.5, 2);
    //factory.BasePosition = new THREE.Vector3(0, 13.5, 2);

    // factory.INIT_ROTATION = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(0, Math.PI, 0), 'YZX');
    factory.INIT_ROTATION = new THREE.Quaternion();
    factory.BaseRotation = new THREE.Quaternion();
    factory.BaseRotation.copy(factory.INIT_ROTATION);
    //factory.BaseRotation = new THREE.Euler(0,0,0,'XYZ');
    //factory.BaseRotation = new THREE.Quaternion();
    
    factory.animationActive = true;
    factory.stats = null;
    //TODO: I dont need this anymore
    factory.canvas = null;
    //console.log("VrsketchService: injected camera.cameraObject.fov=" + camera.cameraObject.fov);
    //console.log("VrsketchService: injected camera.cameraObject.aspect=" + camera.cameraObject.aspect);

    factory.camera = camera;
    // factory.camera.aspect = this.width / this.height;
    //console.log("VrsketchService: injected factory.camera.cameraObject.fov=" + factory.camera.cameraObject.fov);
    //console.log("VrsketchService: injected factory.camera.cameraObject.aspect=" + factory.camera.cameraObject.aspect);
    factory.bg = {
      structure: 'sparseGrid'
    };

    console.log("vrsketchService: bg.structure=" + factory.bg.structure);

    factory.do_it = function() {

    };

    factory.doIt = function () {
      //console.log("VrsketchService: now in VrsketchService");
    };

  // setup some pointer info at the axes
    factory.initAxes = function() {
      var lineGeometry, lineMaterial;
      
      // x-axis
      lineMaterial = new THREE.LineBasicMaterial();
      lineMaterial.color = new THREE.Color(255,0,0);

      lineGeometry = new THREE.Geometry();
      
      lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
      lineGeometry.vertices.push( new THREE.Vector3(1,0,0));

      this.xAxisLine = new THREE.Line(lineGeometry, lineMaterial);

      this.scene.add(this.xAxisLine);
      // y-axis
      lineMaterial = new THREE.LineBasicMaterial();
      lineMaterial.color = new THREE.Color(0,255,0);

      lineGeometry = new THREE.Geometry();

      lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
      lineGeometry.vertices.push( new THREE.Vector3(0,1,0));

      this.yAxisLine = new THREE.Line(lineGeometry, lineMaterial);

      this.scene.add(this.yAxisLine);

      // z-axis
      lineMaterial = new THREE.LineBasicMaterial();
      lineMaterial.color = new THREE.Color(0,0,255);

      lineGeometry = new THREE.Geometry();

      lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
      lineGeometry.vertices.push( new THREE.Vector3(0,0,1));

      this.zAxisLine = new THREE.Line(lineGeometry, lineMaterial);

      this.scene.add(this.zAxisLine);        
    };
    
    
    factory.initWebGl = function () {
      // console.log('VrsketchService: entered initWebGl, this=' + this);
      // console.log('VrsketchService: $window=' + $window);
      // console.log('VrsketchService: $window.innerWidth=' + $window.innerWidth);
      // console.log('VrsketchService: $window.innerHeight=' + $window.innerHeight);
      // wierd init case where this function is called without ctrl being set
      // just return right away
      // if (typeof ctrl === 'undefined') {
      //   return;
      // };

      this.width = $window.innerWidth;
      this.height = $window.innerHeight;

      //console.log('index.initWebGl: viewer=' + document.getElementById('viewer'));
      //console.log('index.initWebGl: viewer=' + angular.element(document.getElementById('viewer')));
      try {
        // TODO: mock document.getElementbyid('viewer') in ut setup
        // so that I can test with the canvas parm?
        //console.log("index.initWebGl now getting renderer");
        //console.log('index.initWebGl document.getElementById(viewer)' = document.getElementById('viewer');
        this.canvas = document.getElementById('viewer');
        
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

      //this.renderer.setClearColor(0xD3D3D3, 1.0);
      // this controls the ambient background color e.g of the the "sky"
      this.renderer.setClearColor(0x131313, 1.0);
      this.renderer.setSize(this.width, this.height);
      //this.renderer.setSize(this.height, this.height);
      
      this.container = document.getElementById('container');
      this.canvas.focus();
    };

    factory.initScene = function() {
      //console.log("service:index.initScene 2: ctrl=" + ctrl);

      // todo: make a real renderer
      //ctrl.renderer = {};
      this.scene = new THREE.Scene();

      // use the injected camera service
      //this.camera = {};
      this.camera = factory.camera;

      // we have to get the camera ourselves manually.  For some reason the cameraObject
      // in the camera factory doesn't work right
      this.camera.cameraObject = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000);
      //this.camera.cameraObject = factory.camera.cameraObject; // no work
      //this.camera.cameraObject.aspect = this.width / this.height;
      // console.log("VrsketchService.initScene: this.camera=" + this.camera);
      // console.log("***VrsketchService.initScene: this.camera.cameraObject=" + this.camera.cameraObject);
      // console.log("***VrsketchService.initScene: this.camera.cameraObject.fov=" + this.camera.cameraObject.fov);
      // console.log("***VrsketchService.initScene: this.camera.cameraObject.aspect=" + this.camera.cameraObject.aspect);
      // console.log("***VrsketchService.initScene: this.camera.doIt=" + this.camera.doIt());

      
      //this.camera = camera;
      
      // this.camera = new THREE.PerspectiveCamera(
      // 75, this.width / this.height, 1, 10000);
      
      // this.camera = {};
      // this.camera.cameraObject = new THREE.PerspectiveCamera(
      //   75, this.width / this.height, 1, 10000);
      
      // console.log("VrsketchService.initScene: this.camera.cameraObject" + this.camera.cameraObject);
      // console.log("VrsketchService.initScene: this.camera.cameraObject.fov=" + this.camera.cameraObject.fov);
      // console.log("VrsketchService.initScene: this.camera.cameraObject.aspect=" + this.camera.cameraObject.aspect);
      // //console.log("VrsketchService.initScene: this.camera.doIt()=" + this.camera.doIt());
      
      // console.log("vrstectchService.initScene: injected camera.cameraObject.position.z=" + camera.cameraObject.position.z);
      // console.log("vrstectchService.initScene: injected camera.cameraObject" + camera.cameraObject);
      // console.log("vrstectchService.initScene: injected camera.doIt()=" + camera.doIt());
      // //this.camera = camera;
      // console.log("vrstectchService.initScene: this.camera.cameraObject.position.z=" + this.camera.cameraObject.position.z);
      //vt-hack add
      // this should be in the animation loop
      //this.BasePosition = new THREE.Vector3(0.0, 2.0, EDITOR_CAMERA_DISTANCE);
      //this.camera.position.copy(new THREE.Vector3(0.0, 2.0, 2.0));
      //this.camera.cameraObject.position.copy(new THREE.Vector3(0.0, 2.0, 2.0));
      this.camera.cameraObject.position.copy(this.BasePosition);
      this.camera.cameraObject.quaternion.copy(this.BaseRotation);

      // and save in cameraLogical because cameraObject is volitile
      this.camera.cameraLogical.position.copy(this.camera.cameraObject.position);
      this.camera.cameraLogical.quaternion.copy(this.camera.cameraObject.quaternion);
      this.camera.cameraLogical.rotation.copy(this.camera.cameraObject.rotation);
      
      //vt-hack end
      this.controls = new THREE.VRControls(this.camera.cameraObject);
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
      //groundTexture.repeat.set( 1000, 1000 );
      groundTexture.repeat.set( 500, 500 );
      
      groundTexture.minFilter = THREE.NearestFilter;
      
      var ground = new THREE.Mesh(
        //new THREE.PlaneGeometry( 1000, 1000 ),
        //new THREE.PlaneGeometry( 500, 500 ),
        new THREE.PlaneBufferGeometry( 500, 500 ),
        new THREE.MeshBasicMaterial({map: groundTexture}) );
      ground.rotation.x = -Math.PI / 2;
      //ground.rotation.x = 0.0;
      //this.scene.add(ground);
      //sparseGridBackground.addToScene2(this.scene);
      
      switch( this.bg.structure) {
        case 'sparseGrid':
          sparseGridBackground.addToScene2(this.scene);
          this.renderer.setClearColor(0x131313, 1.0);
        break;
        
        case 'riftSketch':
          this.scene.add(ground);
          this.renderer.setClearColor(0xD3D3D3, 1.0);
        break;

        default:
          alert('invalid bg.stucture ' + this.bg.structure + ' specified');
        break;

      };
      
      this.initAxes();

      // add a fps monitor
      this.stats = this.createStats();

      // add a TextArea
      this.scene.add(TextArea.createFrame(this.canvas));
      //document.body.appendChild(this.stats.domElement);
      //this.canvas.appendChild(this.stats.domElement);
      document.getElementById('canvas_container').appendChild(this.stats.domElement);

      // var control = new function () {
      // //control = new function () {
      //   //this.rotationSpeed = 0.005;
      //   //this.scale = 1;
      //   //factory.camera.cameraObject.rotation.y = 0;
      //   //factory.camera.cameraObject.fov = 75;
      //   this.scale = 1;
      //   //this.rotation = {};
      //   this.rotation_y = 0;
      // };
      // Do not delete
      // add visual controls      
      //utils.addControls(factory.control);

      // add a light source
      // var light = new THREE.AmbientLight( 0x404040 ); // soft white light
      // this.scene.add( light );
      
      var light = new THREE.PointLight( 0xff0000, 1, 100 );
      light.position.set( 0, 0, 10 );
      this.scene.add( light );
    };

    factory.control = new function () {
      //this.rotationSpeed = 0.005;
        //this.scale = 1;
        //factory.camera.cameraObject.rotation.y = 0;
        //factory.camera.cameraObject.fov = 75;
        this.scale = 1;
        //this.rotation = {};
        this.rotY = 0;
      };
      
    factory.init = function () {
      this.initWebGl($window);
      this.initScene();
    };

    factory.render = function () {
      //console.log("vrsketchService.render: rotY=" + rotY);
      //var lastCameraPos = this.camera.cameraObject.position;
      //lastCameraPos.y = 3.5;
      // we are carrying camera rotation state in the camera itself.  We need to
      // save the last state as controls.update() is desctructive and will overlay it
      // var lastCameraQuaternion = new THREE.Quaternion();
      
      // lastCameraQuaternion.copy(this.camera.cameraObject.quaternion);
      
      // This basically extracts the rotation and position from the Rift and puts
      // it into the cameras rotation and position.  We previously defined the VRControl
      // to be attached to our camera.
      this.controls.update();

      // here we restore our base position into the camera
      // (we only let the Rift control rotation not position)
      //this.camera.position.copy(this.BasePosition);
      //this.camera.cameraObject.position.copy(this.BasePosition);
      this.camera.cameraObject.position.copy(this.camera.cameraLogical.position);
      //this.camera.cameraState.position.copy(this.camera.cameraObject.position);
      //this.camera.cameraState.quaternion.copy(this.camera.cameraObject.quaternion);

      //this.camera.cameraObject.position.copy( lastCameraPos);
      
      // var rotatedHMDPosition = new THREE.Vector3();
      // rotatedHMDPosition.copy(this.camera.position);
      // rotatedHMDPosition.applyQuaternion(this.BaseRotation);

      // add back in the prior rotation state as our starting poing
      //this.camera.cameraObject.quaternion.copy(lastCameraQuaternion);
      //this.camera.cameraObject.quaternion.multiplyQuaternions(lastCameraQuaternion, this.camera.cameraObject.quaternion);
      // Here we basically add in our base rotation.  This gives us our absolute
      // rotation.  The Rift supplies the relative rotation (via camera.quaternion which
      // we copied from the Rift)
      //this.camera.quaternion.multiplyQuaternions(this.BaseRotation, this.camera.quaternion);
      // "add" the rotation of HMD into our base position
      //this.camera.cameraObject.quaternion.multiplyQuaternions(this.BaseRotation, this.camera.cameraObject.quaternion);

      // now add in rotation of the control
      var rotY = this.control.rotY;

      //this.BaseRotation.y = rotY * base.ONE_DEGREE;
      //var axis = new THREE.Vector3(0.5,0.5,0);
      //TODO add yAxis as a global in base
      this.camera.cameraObject.rotateOnAxis(
        new THREE.Vector3(0,1,0),
        rotY * base.ONE_DEGREE);

      // now add in the rotation from key presses
      this.camera.cameraObject.rotateOnAxis(new THREE.Vector3(0,1,0), this.BaseRotation.y );

      //vt-x add
      //this.camera.cameraState.position.copy(this.camera.cameraObject.position);
      // Note: we are doing "look at" rotation semantics here, not absolute rotation
      // semantices (we are incorporating the rotation the person is looking when we
      // move).  Don't know if this is a feature or a limitation.
      this.camera.cameraLogical.quaternion.copy(this.camera.cameraObject.quaternion);
      this.camera.cameraLogical.rotation.copy(this.camera.cameraObject.rotation);
      //vt-x end
      
      if (this.vrManager.isVRMode()) {
        this.effect.render(this.scene, this.camera.cameraObject);
      }
      else {
        this.renderer.render(this.scene, this.camera.cameraObject);
      }

      this.stats.update();
    };

    factory.mainLoop =  function () {
      //console.log("mainLoop: entered");
      if( this.animationActive) {
        // we basically ask that we invoke ourselves in 1/60 of a second.  This is
        // basically timed recursion.
        // after doing this fall through and do the rest of the function (call render)
        window.requestAnimationFrame( this.mainLoop.bind(this) );
      }

      // update one render scene and leave.  mainLoop will invoke again in 1/60 second
      // if requestAnimationFrame was previously called.
      this.render();
    };

    //TODO move into utils.js
    factory.createStats = function () { 
      //console.log("abn");
      var stats = new Stats();

      stats.setMode(0);

      stats.domElement.style.position = 'absolute';
      //stats.domElement.style.position = 'relative';
      stats.domElement.style.left = '0';
      stats.domElement.style.top = '0';

      return stats;
    };
    
    return factory;
  });
