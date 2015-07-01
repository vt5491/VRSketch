'use strict';
 
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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
    //vt add
      .when('/vrsketchApp', {
        templateUrl: 'views/vrsketchApp.html',
        controller: 'VrsketchCtrl'
      })
    //vt end
      .otherwise({
        redirectTo: '/'
      });
  });
