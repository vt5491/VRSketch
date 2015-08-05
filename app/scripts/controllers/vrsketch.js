'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:VrsketchCtrl
 * @description
 * # VrsketchCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  .controller('VrsketchCtrl', function ($scope, VrsketchService) {        
    
    console.log("now in new VrsketchCtrl");

    $scope.doIt = function() {
      console.log("VrsketchCtrl: now in doIt and calling VrsketchService.doIt");
      VrsketchService.doIt();
    };

    $scope.toggleAnimation = function() {

      if (VrsketchService.animationActive) {
        VrsketchService.animationActive = false;
      }
      else {
        VrsketchService.animationActive =true;

        // and restart the main loop
        VrsketchService.mainLoop();
      }

    };

    VrsketchService.init();
    VrsketchService.mainLoop();
    
  });
