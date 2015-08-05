'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  .controller('MainCtrl', function ($scope) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    console.log("MainCtrl: entered");
    $scope.mainTemplate = "../../views/main.html";
  });
