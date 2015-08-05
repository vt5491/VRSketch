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
  .factory('VrsketchService', function ($window, TextArea, camera, base, utils, sparseGridBackground) {    
    // AngularJS will instantiate a singleton by calling "new" on this function

    var factory = {};

    factory.INIT_POSITION = new THREE.Vector3(0, 1.5, 2);
    factory.BasePosition = new THREE.Vector3();
    factory.BasePosition.copy( factory.INIT_POSITION);
    factory.INIT_ROTATION = new THREE.Quaternion();
    factory.BaseRotation = new THREE.Quaternion();
    factory.BaseRotation.copy(factory.INIT_ROTATION);
    factory.animationActive = true;
    factory.stats = null;
    //TODO: I dont need this anymore
    factory.canvas = null;
    factory.camera = camera;

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

      this.width = $window.innerWidth;
      this.height = $window.innerHeight;

      try {
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

      // this controls the ambient background color e.g of the the "sky"
      this.renderer.setClearColor(0x131313, 1.0);
      this.renderer.setSize(this.width, this.height);
      
      this.container = document.getElementById('container');
      this.canvas.focus();
    };

    factory.initScene = function() {

      this.scene = new THREE.Scene();

      // use the injected camera service
      this.camera = factory.camera;

      // we have to get the camera ourselves manually.  For some reason the cameraObject
      // in the camera factory doesn't work right
      this.camera.cameraObject = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000);

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
      groundTexture.anisotropy = maxAnisotropy;
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set( 500, 500 );
      
      groundTexture.minFilter = THREE.NearestFilter;
      
      var ground = new THREE.Mesh(

        new THREE.PlaneBufferGeometry( 500, 500 ),
        new THREE.MeshBasicMaterial({map: groundTexture}) );
      ground.rotation.x = -Math.PI / 2;
      
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

      document.getElementById('canvas_container').appendChild(this.stats.domElement);
      
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
      this.scale = 1;
      this.rotY = 0;
      };
      
    factory.init = function () {
      this.initWebGl($window);
      this.initScene();
    };

    factory.render = function () {
      
      // This basically extracts the rotation and position from the Rift and puts
      // it into the cameras rotation and position.  We previously defined the VRControl
      // to be attached to our camera.
      this.controls.update();

      // here we restore our base position into the camera
      // (we only let the Rift control rotation not position)

      this.camera.cameraObject.position.copy(this.camera.cameraLogical.position);

      // now add in rotation of the control
      var rotY = this.control.rotY;

      this.camera.cameraObject.rotateOnAxis(
        new THREE.Vector3(0,1,0),
        rotY * base.ONE_DEGREE);

      // now add in the rotation from key presses
      this.camera.cameraObject.rotateOnAxis(new THREE.Vector3(0,1,0), this.BaseRotation.y );

      // Note: we are doing "look at" rotation semantics here, not absolute rotation
      // semantices (we are incorporating the rotation the person is looking when we
      // move).  Don't know if this is a feature or a limitation.
      this.camera.cameraLogical.quaternion.copy(this.camera.cameraObject.quaternion);
      this.camera.cameraLogical.rotation.copy(this.camera.cameraObject.rotation);
      
      if (this.vrManager.isVRMode()) {
        this.effect.render(this.scene, this.camera.cameraObject);
      }
      else {
        this.renderer.render(this.scene, this.camera.cameraObject);
      }

      this.stats.update();
    };

    factory.mainLoop =  function () {
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
      var stats = new Stats();

      stats.setMode(0);

      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0';
      stats.domElement.style.top = '0';

      return stats;
    };
    
    return factory;
  });
