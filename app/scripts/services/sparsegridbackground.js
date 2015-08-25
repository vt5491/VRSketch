'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.sparseGridBackground
 * @description
 * # sparseGridBackground
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .service('sparseGridBackground', function (base) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //var COLOR.YELLOW = new THREE.Color(100,255,0);
    var factory = {};

    factory.gridSize = 16;

    var gridMin = -factory.gridSize /2;
    var gridMax = factory.gridSize /2;

    //console.log("backgroudplane: gridMin=" + gridMin + ",gridMax=" + gridMax);

    // return an array of nLines in the given plane.  We use
    // gridSize to determine the spacing.
    //
    // example call: gridPlane({gridSize:16, spacing: 2, plane: 'xz'})
    //
    // =>  returns 8 lines separated 2 units apart starting at -8 and going to 8
    //   in the 'xz' plane
    //factory.gridPlane = function( gridSize, nLines, plane) {
    factory.gridPlane = function(args) {
      var gridSize = args.gridSize;
      var spacing = args.spacing;
      var plane = args.plane || 'xz';
      var color = args.color || base.COLOR_YELLOW;
      //var plane = args.plane ?  args.plane : 'xz';
      var grid = [];

      // console.log("sparsegridbackground.gridPlane: gridSize=" + gridSize);
      // console.log("sparsegridbackground.gridPlane: spacing=" + spacing);
      // console.log("sparsegridbackground.gridPlane: plane=" + plane);

      var gridMin = -gridSize / 2;
      var gridMax = gridSize / 2;
      for (var i = gridMin; i <= gridMax; i += spacing) {
      //for (var i = 0; i <= gridMax; i += spacing) {
        var lineMaterial, lineGeometry, gridLine;
        lineMaterial = new THREE.LineBasicMaterial();
        lineMaterial.color = color;;
        
        lineGeometry = new THREE.Geometry();

        // plane "vertical"
        switch(plane) {
          case 'xz':
            lineGeometry.vertices.push( new THREE.Vector3(gridMin,0,i));
            lineGeometry.vertices.push( new THREE.Vector3(gridMax,0,i));          
          
          break;
          case 'xy':
            //lineGeometry.vertices.push( new THREE.Vector3(i,gridMin,0));
            lineGeometry.vertices.push( new THREE.Vector3(i,0,0));
            lineGeometry.vertices.push( new THREE.Vector3(i,gridMax,0));          
          
          break;
          case 'yz':
            // vertical really
            //if (i >= 0) {
              //console.log('hello');
              //lineMaterial.color = base.COLOR_WHITE;
            //lineGeometry.vertices.push( new THREE.Vector3(0,gridMin,i));
            lineGeometry.vertices.push( new THREE.Vector3(0,0,i));
            lineGeometry.vertices.push( new THREE.Vector3(0,gridMax,i));
            //};     
          
          break;

        };

        // if(plane == 'yz') {
        //   if( i>= 0) {
        //     gridLine = new THREE.Line(lineGeometry, lineMaterial);
            
        //     grid.push(gridLine);
        //   }
        // }
        // else {
          gridLine = new THREE.Line(lineGeometry, lineMaterial);
          
          grid.push(gridLine);
          
        //}    
        // gridLine = new THREE.Line(lineGeometry, lineMaterial);
        
        // grid.push(gridLine);
        
        // console.log("gridLine a, LineMaterail.color.r=" + lineMaterial.color.r + ",g=" + lineMaterial.color.g + ",b=" + lineMaterial.color.b);

        // plane "horizontal"
        lineGeometry = new THREE.Geometry();
        
        switch(plane) {
          case 'xz':
            lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMin));
            lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMax));
          
          break;
          case 'xy':
            if (i >= 0) {
              lineGeometry.vertices.push( new THREE.Vector3(gridMin,i,0));
              lineGeometry.vertices.push( new THREE.Vector3(gridMax,i,0));
            };
            //lineGeometry.vertices.push( new THREE.Vector3(gridMin,i,0));
            //lineGeometry.vertices.push( new THREE.Vector3(gridMax,i,0));
          
          break;
          case 'yz':
            // really horizonatal
            if (i >= 0 ) {
              //lineMaterial.color = base.COLOR_BROWN;
              //console.log('hello2');
            lineGeometry.vertices.push( new THREE.Vector3(0,i,gridMin));
            //lineGeometry.vertices.push( new THREE.Vector3(0,i,0));
            lineGeometry.vertices.push( new THREE.Vector3(0,i,gridMax));
              };
          
          break;

        };

        if(plane == 'yz' || plane == 'xy') {
          if( i>= 0) {
            //lineMaterial.color = base.COLOR_BROWN;
            gridLine = new THREE.Line(lineGeometry, lineMaterial);
            
            grid.push(gridLine);
          }
        }
        else {
          gridLine = new THREE.Line(lineGeometry, lineMaterial);
          
          grid.push(gridLine);
          
        }
        
        // gridLine = new THREE.Line(lineGeometry, lineMaterial);
        
        // grid.push(gridLine);
        // console.log("gridLine b, LineMaterail.color.r=" + lineMaterial.color.r + ",g=" + lineMaterial.color.g + ",b=" + lineMaterial.color.b);
        
      };
        
      //console.log("sparsegridbackground.gridPlane: args.gridSize=" + args.gridSize);
      // var a = arguments.shift();
      // console.log("sparsegridbackground.gridPlane: a.gridSize=" + a.gridSize);
      //console.log("sparsegridbackground.gridPlane: arguments[0]=" + arguments[0]);
      //console.log("sparsegridbackground.gridPlane: arguments[1]=" + arguments[1]);
      //return [1,2,3];
      return grid;
    };
    
    // factory.addToScene = function (scene) {
    //   for (var i= gridMin; i<= gridMax; i++) {
    //     var lineMaterial, lineGeometry, gridLine;
    //     // xz plane horizontal
    //     lineMaterial = new THREE.LineBasicMaterial();
    //     lineMaterial.color = new THREE.Color(0,255,0);

    //     lineGeometry = new THREE.Geometry();

    //     lineGeometry.vertices.push( new THREE.Vector3(gridMin,0,i));
    //     lineGeometry.vertices.push( new THREE.Vector3(gridMax,0,i));

    //     gridLine = new THREE.Line(lineGeometry, lineMaterial);

    //     scene.add(gridLine);

    //     // xz plane vertical
    //     lineGeometry = new THREE.Geometry();

    //     lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMin));
    //     lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMax));

    //     gridLine = new THREE.Line(lineGeometry, lineMaterial);

    //     scene.add(gridLine);
    //  };
    // };

    //TODO: rename to addToScene
    factory.addToScene2 = function (scene) {
      var grid;
      
      grid = this.gridPlane({gridSize: 16, spacing: 1, plane: 'xz', color: base.COLOR_YELLOW});

      //TODO: use underscore map function
      for (var i =0; i < grid.length; i++) {
        scene.add(grid[i]);
      };

      grid = this.gridPlane({gridSize: 8, spacing: 1, plane: 'xy', color: base.COLOR_GREEN});

      //TODO: use underscore map function
      for (var i =0; i < grid.length; i++) {
        scene.add(grid[i]);
      };

      grid = this.gridPlane({gridSize: 4, spacing: 1, plane: 'yz', color: base.COLOR_BLUE});

      //TODO: use underscore map function
      for (var i =0; i < grid.length; i++) {
        scene.add(grid[i]);
      };            
    };

    return factory;
    
  });
