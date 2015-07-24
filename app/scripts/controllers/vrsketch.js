'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:VrsketchCtrl
 * @description
 * # VrsketchCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  //.controller('VrsketchCtrl', function (VrSketchService) {
  .controller('VrsketchCtrl', function ($scope, VrsketchService) {        
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //$scope.animationActive = true;
    
    console.log("now in new VrsketchCtrl");

    $scope.doIt = function() {
      console.log("VrsketchCtrl: now in doIt and calling VrsketchService.doIt");
      VrsketchService.doIt();
    };

    $scope.toggleAnimation = function() {
      //console.log("VtsketchCtrl: now in toggleAnimation: $scope.animationActive=" + $scope.animationActive);
      //$scope.animationActive = !$scope.animationActive;
      //VrsketchService.animationActive = !VrsketchService.animationActive;
      if (VrsketchService.animationActive) {
        VrsketchService.animationActive = false;
      }
      else {
        VrsketchService.animationActive =true;

        // and restart the main loop
        VrsketchService.mainLoop();
      }
      //console.log("VtsketchCtrl: $scope.animationActive now =" + $scope.animationActive);
      //console.log("VtsketchCtrl: VrsketchService.animationActive now =" + VrsketchService.animationActive);
    };

    console.log("VrsketchCtrl: now calling VrsketchService.init");
    VrsketchService.init();
    //VrsketchService.render();
    VrsketchService.mainLoop();
    
  });
