'use strict';

// Note: vrsketch is the new controller
// 'vrsketchApp' is the old version
/**
 * @ngdoc overview
 * @name vrsketchApp
 * @description
 * # vrsketchApp
 *
 * Main module of the application.
 */
angular
  .module('vrsketchApp', [
    // 'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/vrsketch', {
        templateUrl: 'views/vrsketch.html',
        controller: 'VrsketchCtrl',
        controllerAs: 'vrSketch'
      })
      .when('/cust', {
        templateUrl: 'views/cust.html',
        controller: 'CustCtrl'
      })
    
      .otherwise({
        redirectTo: '/'
      });
  });
