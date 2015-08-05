'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:CustCtrl
 * @description
 * # CustCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  .controller('CustCtrl', function ($scope, VrsketchService) {
    $scope.bg = {
      structure: 'sparseGrid'
    };

    $scope.eventHandler = function() {
      console.log("CustCtrl.eventHandler: $scope.bg.structure=" + $scope.bg.structure);
      VrsketchService.bg.structure = $scope.bg.structure;
    };
    
    
  });
