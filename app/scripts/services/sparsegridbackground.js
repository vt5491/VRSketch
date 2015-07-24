'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.sparseGridBackground
 * @description
 * # sparseGridBackground
 * Service in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .service('sparseGridBackground', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var factory = {};

    factory.gridSize = 16;

    var gridMin = -factory.gridSize /2;
    var gridMax = factory.gridSize /2;

    console.log("backgroudplane: gridMin=" + gridMin + ",gridMax=" + gridMax);

    factory.addToScene = function (scene) {
      for (var i= gridMin; i<= gridMax; i++) {
        var lineMaterial, lineGeometry, gridLine;
        // xz plane horizontal
        lineMaterial = new THREE.LineBasicMaterial();
        lineMaterial.color = new THREE.Color(0,255,0);

        lineGeometry = new THREE.Geometry();

        lineGeometry.vertices.push( new THREE.Vector3(gridMin,0,i));
        lineGeometry.vertices.push( new THREE.Vector3(gridMax,0,i));

        gridLine = new THREE.Line(lineGeometry, lineMaterial);

        scene.add(gridLine);

        // xz plane vertical
        lineGeometry = new THREE.Geometry();

        lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMin));
        lineGeometry.vertices.push( new THREE.Vector3(i,0,gridMax));

        gridLine = new THREE.Line(lineGeometry, lineMaterial);

        scene.add(gridLine);
     };
    };

    return factory;
    
  });
