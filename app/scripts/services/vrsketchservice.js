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
  .factory('VrsketchService', function ($window, TextArea, camera, base, utils, sparseGridBackground,
 shapeGraph, $q, $http
 ) {    
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
   factory.shapeGraph = null;
   factory.yzProjectionPlane = null;
   
   factory.xyProjectionPlane = null;
   factory.xyProjectionMesh = null;

   factory.xzProjectionPlane = null;
   factory.xzProjectionMesh = null;

   factory.yzProjectionPlane = null;
   factory.yzProjectionMesh = null;
   
   // these have to be function scope variables because they are set via
   // or need to be accessed from asynchronous callbacks.
   var scene;

   // this is the group for cotaining all the lines of a "birdy"
   var birdyGroups = [];
   birdyGroups.push(new THREE.Object3D());
   birdyGroups.push(new THREE.Object3D());
   birdyGroups.push(new THREE.Object3D());

   var birdyGroupClone = new THREE.Object3D();
   var birdyGroupShadowXY = new THREE.Object3D();
   var birdyGroupShadowXZ = new THREE.Object3D();
   var birdyGroupShadowYZ = new THREE.Object3D();
   //this.scene = scene;
   var littleWingShapeGraph, simplexBirdyShapeGraph, sorrowedLittleWingShapeGraph;
   
   //var myShapeGraph2;
   var birdyGroupRotQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), base.ONE_DEGREE * 0.2 );
   var birdyGroupRotQuat2 = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), -base.ONE_DEGREE * 0.2 );
   var birdyGroupRotQuat3 = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), -base.ONE_DEGREE * 0.2 );

   var rotXQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1,0,0), -base.ONE_DEGREE * 0.2 );
   var rotYQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), -base.ONE_DEGREE * 0.2 );
   
   factory.bg = {
     structure: 'sparseGrid'
     //structure: 'riftSketch'
   };

   console.log("vrsketchService: bg.structure=" + factory.bg.structure);

   factory.do_it = function() {

   };

   factory.doIt = function () {
     //console.log("VrsketchService: now in VrsketchService");
   };

   // setup some pointer info at the axes
   factory.initAxes = function() {
     var lineGeometry, lineMaterial, axes;

     axes = new THREE.Object3D();
     
     // x-axis
     lineMaterial = new THREE.LineBasicMaterial();
     lineMaterial.color = new THREE.Color(255,0,0);

     lineGeometry = new THREE.Geometry();
     
     lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
     lineGeometry.vertices.push( new THREE.Vector3(1,0,0));

     this.xAxisLine = new THREE.Line(lineGeometry, lineMaterial);

     axes.add(this.xAxisLine);
     
     // y-axis
     lineMaterial = new THREE.LineBasicMaterial();
     lineMaterial.color = new THREE.Color(0,255,0);

     lineGeometry = new THREE.Geometry();

     lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
     lineGeometry.vertices.push( new THREE.Vector3(0,1,0));

     this.yAxisLine = new THREE.Line(lineGeometry, lineMaterial);

     axes.add(this.yAxisLine);

     // z-axis
     lineMaterial = new THREE.LineBasicMaterial();
     lineMaterial.color = new THREE.Color(0,0,255);

     lineGeometry = new THREE.Geometry();

     lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
     lineGeometry.vertices.push( new THREE.Vector3(0,0,1));

     this.zAxisLine = new THREE.Line(lineGeometry, lineMaterial);

     axes.add(this.zAxisLine);

     scene.add(axes);

     // create a copy below the plane too
     var axesAlt = axes.clone();

     axesAlt.position.set(0, -3 ,0);

     scene.add(axesAlt);
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

     //scene = new THREE.Scene();
     //this.scene = scene;
     scene = new THREE.Scene();

     // use the injected camera service
     this.camera = factory.camera;

     // we have to get the camera ourselves manually.  For some reason the cameraObject
     // in the camera factory doesn't work right
     this.camera.cameraObject = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000);

     this.camera.cameraObject.position.copy(this.BasePosition);
     this.camera.cameraObject.quaternion.copy(this.BaseRotation);

     // and save in cameraLogical because cameraObject is volitile
     this.camera.cameraLogical.position.copy(this.camera.cameraObject.position);
     //this.camera.cameraLogical.quaternion.copy(this.camera.cameraObject.quaternion);
     this.camera.cameraLogical.quaternion.copy( this.BaseRotation);
     //note: 70 is pretty good
     // nope: 80 is the magic number.  I have no idea why this particular tweak is needed.
     // note: 90 is pretty bad
     // 80 is the number for sparse grid.  45 works better on riftsketch classic
     var tmpQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), base.ONE_DEGREE * 80 );
     this.camera.cameraLogical.quaternion.multiply(tmpQuat);
     this.camera.cameraLogical.rotation.copy(this.camera.cameraObject.rotation);
     
     //vt-hack end
     this.controls = new THREE.VRControls(this.camera.cameraObject);
     this.effect = new THREE.VREffect(this.renderer);
     this.effect.setSize(this.width, this.height);

     this.vrManager = new WebVRManager(this.renderer, this.effect);
     
     switch( this.bg.structure) {
     case 'sparseGrid':
       sparseGridBackground.addToScene2(scene);
       this.renderer.setClearColor(0x131313, 1.0);
       break;
       
     case 'riftSketch':
       var maxAnisotropy = this.renderer.getMaxAnisotropy();
       //linux
       var groundTexture = THREE.ImageUtils.loadTexture('images/background.png');
       // windows
       var gridSize = 50
       groundTexture.anisotropy = maxAnisotropy;
       groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
       groundTexture.repeat.set( gridSize, gridSize );
       
       groundTexture.minFilter = THREE.NearestFilter;
       
       var ground = new THREE.Mesh(
         new THREE.PlaneBufferGeometry( gridSize, gridSize ),
         new THREE.MeshBasicMaterial({map: groundTexture}) );
       ground.rotation.x = -Math.PI / 2;
       
       scene.add(ground);
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
     scene.add(TextArea.createFrame(this.canvas));

     document.getElementById('canvas_container').appendChild(this.stats.domElement);
     
     // Do not delete
     // add visual controls      
     //utils.addControls(factory.control);

     // add a light source
     // var light = new THREE.AmbientLight( 0x404040 ); // soft white light
     // scene.add( light );
     
     // var light = new THREE.PointLight( 0xff0000, 1, 100 );
     // light.position.set( 0, 0, 10 );
     // scene.add( light );

     var geometry, material;
     //, lineGeometry, lineMaterial;
     // xy projection group
     this.xyProjectionPlane = new THREE.Object3D();
     
     geometry = new THREE.PlaneGeometry( 4,2 );
     material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

     this.xyProjectionMesh = new THREE.Mesh( geometry, material );
     this.xyProjectionPlane.add(this.xyProjectionMesh);

     //plane.position = new THREE.Vector3(0,0, -2);
     this.xyProjectionPlane.position.set(0, 1, -8);
     
     scene.add(this.xyProjectionPlane);

     // xz projection group
     this.xzProjectionPlane = new THREE.Object3D();
     
     geometry = new THREE.PlaneGeometry( 4,4 );
     material = new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );

     this.xzProjectionMesh = new THREE.Mesh( geometry, material );
     this.xzProjectionPlane.add(this.xzProjectionMesh);

     
     //plane.position = new THREE.Vector3(0,0, -2);
     this.xzProjectionPlane.position.set(0, 4, -8);
     
     scene.add(this.xzProjectionPlane);

     // yz projection group
     this.yzProjectionPlane = new THREE.Object3D();
     
     geometry = new THREE.PlaneGeometry( 4,2 );
     material = new THREE.MeshBasicMaterial( {color: 0xffa500, side: THREE.DoubleSide} );

     this.yzProjectionMesh = new THREE.Mesh( geometry, material );
     this.yzProjectionPlane.add(this.yzProjectionMesh);

     
     //plane.position = new THREE.Vector3(0,0, -2);
     this.yzProjectionPlane.position.set(4, 1, -8);
     
     scene.add(this.yzProjectionPlane);
     
     //scene.add(birdyGroupClone2);
   };

   factory.control = new function () {
     this.scale = 1;
     this.rotY = 0;
   };

   function asyncShapeGraph(url) {
     // perform some asynchronous operation, resolve or reject the promise when appropriate.
     return $q(function(resolve, reject) {

       $http.get(url)
         .then(function(res){
           // console.log("parseJson: promise handler: tgtVar=" + tgtVar);
           // console.log("parseJson: res.data.title=" + res.data.title);
           // console.log("parseJson: res.data.nodes[0].name=" + res.data.nodes[0].name);

           var graph = new shapeGraph(res.data.nodes, res.data.edges);
           console.log("vrsketchservice.js: promise handler: graph=" + graph);

           //return graph;
           resolve(graph);
           //tgtVar = graph;
           //console.log("parseJson: promise handler: tgtVar=" + tgtVar);
         });        
     });
   }
   

   //var myShapeGraph1, myShapeGraph2;
   
   factory.initShapeGraph = function () {
     var promise;

     // get first shapeGraph
     //promise = asyncShapeGraph('config/birdies/simplex.json');
     promise = asyncShapeGraph('config/birdies/little_wing.json');

     //console.log("vrsketchservice.initiShapeGraph: calling promise");
     promise.then(function(graph) {
       //console.log('Success: graph=' + graph);
       //this.shapeGraph = graph;
       littleWingShapeGraph = graph;

       //simplexBirdyShapeGraph.sceneSync(scene);
       littleWingShapeGraph.addToGroup(birdyGroups[0]);
       scene.add(birdyGroups[0]);
     }, function(reason) {
       console.log('Failed: ' + reason);
     });

     // do a global position change on the birdyGroup
     birdyGroups[0].position.y += 3;

     // get second shapeGraph
     promise = asyncShapeGraph('config/birdies/simplex.json');
     
     promise.then(function(graph) {
       //console.log('Success: graph=' + graph);
       
       simplexBirdyShapeGraph = graph;

       simplexBirdyShapeGraph.addToGroup(birdyGroups[1]);
       scene.add(birdyGroups[1]);
     }, function(reason) {
       console.log('Failed: ' + reason);
     });

     // do a global position change on the birdyGroup
     birdyGroups[1].position.z -= 3;
     birdyGroups[1].position.y += 3;

     // get third shapeGraph
     promise = asyncShapeGraph('config/birdies/sorrowed_little_wing.json');
     
     promise.then(function(graph) {
       sorrowedLittleWingShapeGraph = graph;

       sorrowedLittleWingShapeGraph.addToGroup(birdyGroups[2]);
       scene.add(birdyGroups[2]);

       // birdyGroupClone = birdyGroups[2].clone();
       // //birdyGroupClone.position.set(factory.xyProjectionMesh.position);
       // birdyGroupClone.position.set(0,0,0);
       // factory.xyProjectionMesh.add(birdyGroupClone);

       //sorrowedLittleWingShapeGraph.addToGroup(factory.xyProjectionMesh);
       sorrowedLittleWingShapeGraph.addToGroup(birdyGroupClone);
       birdyGroupClone.position.set(0,0,0);
       //factory.xyProjectionMesh.add(birdyGroupClone);
       
     }, function(reason) {
       console.log('Failed: ' + reason);
     });

     // do a global position change on the birdyGroup
     birdyGroups[2].position.z += 3;
     birdyGroups[2].position.y += 3;

     // var geometry = new THREE.PlaneGeometry( 1, 1 );
     // var material = new THREE.MeshBasicMaterial( {color: 0x00fff0, side: THREE.DoubleSide} );
     // var group = new THREE.Object3D();
     // var mesh = new THREE.Mesh( geometry, material );
     // group.add(mesh);
     // this.xyProjectionMesh.add(group);
   };
   
   factory.init = function () {
     this.initWebGl($window);
     this.initScene();
     this.initShapeGraph();
   };

   factory.render = function () {
     
     // This basically extracts the rotation and position from the Rift and puts
     // it into the cameras rotation and position.  We previously defined the VRControl
     // to be attached to our camera.
     this.controls.update();

     // here we restore our base position into the camera
     // (we only let the Rift control rotation not position)

     this.camera.cameraObject.position.copy(this.camera.cameraLogical.position);

     // // now add in rotation of the control
     // var rotY = this.control.rotY;

     // this.camera.cameraObject.rotateOnAxis(
     //   new THREE.Vector3(0,1,0),
     //   rotY * base.ONE_DEGREE);

     // Note: rotY is always 0, and rotX and rotZ are undefined
     // console.log("render: rotY=" + this.control.rotY);
     // this.camera.cameraObject.rotateOnAxis(
     //   new THREE.Vector3(0,1,0),
     //   this.control.rotY);
     
     // this.camera.cameraObject.rotateOnAxis(
     //   new THREE.Vector3(0,0,1),
     //   this.control.rotZ );

     //vt-x add
     // This works great about the x and y axes, but it's really weird when
     // turn with the keyboard so you're rotating around the z-axis
     // Note: Q and E use absolute transformations.  This probably has something
     // to do with it.
     this.camera.cameraObject.quaternion.multiplyQuaternions(this.BaseRotation, this.camera.cameraObject.quaternion);
     //this.camera.cameraObject.quaternion.multiplyQuaternions(this.BaseRotation, this.camera.cameraLogical.quaternion);
     //this.BaseRotation.multiply(this.camera.cameraObject.quaternion);
     //vt-x end
     // now add in the rotation from key presses
     //vt-xthis.camera.cameraObject.rotateOnAxis(new THREE.Vector3(0,1,0), this.BaseRotation.y );

     // Note: we
     //are doing "look at" rotation semantics here, not absolute rotation
     // semantics (we are incorporating the rotation the person is looking when we
     // move).  Don't know if this is a feature or a limitation.
     //vt-xthis.camera.cameraLogical.quaternion.copy(this.camera.cameraObject.quaternion);
     //vt-xthis.camera.cameraLogical.rotation.copy(this.camera.cameraObject.rotation);
     // rotate the birdyGroup about the y-axis
     birdyGroups[0].quaternion.multiply(birdyGroupRotQuat);
     birdyGroups[1].quaternion.multiply(birdyGroupRotQuat2);
     birdyGroups[2].quaternion.multiply(birdyGroupRotQuat3);

     //rotate the ship underneath it about the yaxis
     //birdyGroupClone.quaternion.multiply(rotYQuat);
     var m = new THREE.Matrix4();
     var mat = m.makeRotationY(base.ONE_DEGREE * 0.2);
     //birdyGroupClone.geometry.applyMaxtrix(mat);
     //works
     //birdyGroupClone.applyMatrix(mat);
     try {
       for (var i=0; i< birdyGroupClone.children.length; i++) {
         birdyGroupClone.children[i].geometry.applyMatrix(mat);
       }
     }
     catch(e){
       console.log('caught error=' + e);
       return false;
     }

     //scene.remove(birdyGroupClone2);
     //birdyGroupClone2 = birdyGroupClone.clone();
     factory.xyProjectionMesh.remove(birdyGroupShadowXY);
     birdyGroupShadowXY = new THREE.Object3D();

     factory.xzProjectionMesh.remove(birdyGroupShadowXZ);
     birdyGroupShadowXZ = new THREE.Object3D();

     factory.yzProjectionMesh.remove(birdyGroupShadowYZ);
     birdyGroupShadowYZ = new THREE.Object3D();
     
     //remove z-component from birdyGroupShadowXY vertices
     for (var i=0; i< birdyGroupClone.children.length; i++) {
       var line, lineGeometry, vertex;

       // xy plane
       lineGeometry = new THREE.Geometry();

       vertex = birdyGroupClone.children[i].geometry.vertices[0];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.x, vertex.y, 0));
       
       vertex = birdyGroupClone.children[i].geometry.vertices[1];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.x, vertex.y, 0));

       line = new THREE.Line(lineGeometry, birdyGroupClone.children[i].material);

       birdyGroupShadowXY.add(line);

       // xz plane
       lineGeometry = new THREE.Geometry();

       vertex = birdyGroupClone.children[i].geometry.vertices[0];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.x, vertex.z, 0));
       
       vertex = birdyGroupClone.children[i].geometry.vertices[1];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.x, vertex.z, 0));

       line = new THREE.Line(lineGeometry, birdyGroupClone.children[i].material);

       birdyGroupShadowXZ.add(line);       

       // yz plane
       lineGeometry = new THREE.Geometry();

       vertex = birdyGroupClone.children[i].geometry.vertices[0];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.z, vertex.y, 0));
       
       vertex = birdyGroupClone.children[i].geometry.vertices[1];
       lineGeometry.vertices.push(new THREE.Vector3(vertex.z, vertex.y, 0));

       line = new THREE.Line(lineGeometry, birdyGroupClone.children[i].material);

       birdyGroupShadowYZ.add(line);       
       //-----
       //birdyGroupClone2.children[i].geometry.vertices[0].z = 0;
       //birdyGroupClone2.children[i].geometry.vertices[1].z = 0;
       // birdyGroupClone2.children[i].geometry = new THREE.Geometry();
       // var lineGeometry, vertex;
       // lineGeometry = birdyGroupClone2.children[i].geometry;

       // vertex = birdyGroupClone.children[i].geomery.vertices[0];
       // lineGeometry.vertices.push( new Vector3(vertex.x, vertex.y, 0));
       
       // vertex = birdyGroupClone.children[i].geometry.vertices[1];
       // lineGeometry.vertices.push( new Vector3(vertex.x, vertex.y, 0));
     };
     
     birdyGroupShadowXY.position.set(0,0,0);
     this.xyProjectionMesh.add(birdyGroupShadowXY);

     birdyGroupShadowXZ.position.set(0,0,0);
     this.xzProjectionMesh.add(birdyGroupShadowXZ);

     birdyGroupShadowYZ.position.set(0,0,0);
     this.yzProjectionMesh.add(birdyGroupShadowYZ);
     
     // birdyGroupClone2.position.set(0,2,-8);
     // scene.add(birdyGroupClone2);

     // rotate projection plane about x axis
     // note: works
     //this.xyProjectionPlane.quaternion.multiply(rotXQuat);
     // try {
     //   // project first line of "birdy" onto xy plane
     //   var birdyLine = birdyGroups[2].children[3];

     //   // draw x, y components on the xyProjectionPlane
     //   var lineGeometry = new THREE.Geometry();
     //   var lineMaterial = new THREE.LineBasicMaterial();
     //   lineMaterial.color = new THREE.Color(0,0,255);
       
     //   var vertex1 = birdyLine.geometry.vertices[0];
     //   var vertex2 = birdyLine.geometry.vertices[1];

     //   // take xy projection
     //   lineGeometry.vertices.push(new THREE.Vector3(vertex1.x, vertex1.y, 0));
     //   lineGeometry.vertices.push(new THREE.Vector3(vertex2.x, vertex2.y, 0));
     //   // lineGeometry.vertices.push( new THREE.Vector3(0,0,0));
     //   // lineGeometry.vertices.push( new THREE.Vector3(2,0,0));

     //   var birdyLineXY = new THREE.Line(lineGeometry, lineMaterial);
     //   birdyLineXY.quaternion.multiply(birdyGroups[2].quaternion);

     //   // console.log("vrsketchservice.render: v1.x=" + vertex1.x + ",v1.y=" + vertex1.y);
     //   // console.log("vrsketchservice.render: v2.x=" + vertex2.x + ",v2.y=" + vertex2.y);
     //   // console.log("vrsketchservice.render: birdyGroups[2].quaternion.x=" + birdyGroups[2].quaternion.x + ",y=" + birdyGroups[2].quaternion.y + ",z=" + birdyGroups[2].quaternion.z);
     //   //console.log("vrsketchservice.render: vertex.quaternion.x=" + vertex1.quaternion.x + ",y=" + vertex1.quaternion.y + ",z=" + vertex1.quaternion.z);
       
     //   //THREE.SceneUtils.detach(cubeMesh[i], parentCube, scene);
     //   // this works, but it really slows things down
     //   // it doesn't erase any prior lines though
     //   THREE.SceneUtils.detach(this.xyProjectionMesh.children[0], this.xyProjectionMesh, scene);
     //   this.xyProjectionMesh.children[0] = birdyLineXY;
     //   //this.xyProjectionMesh.remove(birdyLineXY);
     //   //this.xyProjectionMesh.add(birdyLineXY);

     //   this.xyProjectionMesh.updateMatrixWorld();
     // }
     // catch(e) {
     //   console.log("Caught error during projection: " + e);
     // };
     
     if (this.vrManager.isVRMode()) {
       this.effect.render(scene, this.camera.cameraObject);
     }
     else {
       this.renderer.render(scene, this.camera.cameraObject);
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
