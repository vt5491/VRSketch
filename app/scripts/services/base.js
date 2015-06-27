'use strict';

/**
 * @ngdoc service
 * @name vrsketchApp.base
 * @description
 * # base
 * Factory in the vrsketchApp.
 */
angular.module('vrsketchApp')
  .factory('base', function () {
    // Service logic
    // ...

    // var meaningOfLife = 42;

    // // Public API here
    // return {
    //   someMethod: function () {
    //     return meaningOfLife;
    //   };

    //   ONE_DEGREE: Math.PI / 180.0;
    // };

    var factory = {};

    factory.ONE_DEGREE = Math.PI / 180.0;

    return factory;
  });