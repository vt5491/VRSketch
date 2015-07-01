'use strict';

/**
 * @ngdoc function
 * @name vrsketchApp.controller:VrsketchCtrl
 * @description
 * # VrsketchCtrl
 * Controller of the vrsketchApp
 */
angular.module('vrsketchApp')
  .controller('VrsketchCtrl',['$scope', 'index', '$window', function ($scope, index, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.vt_num = 17;
    $scope.renderer = null;
    
    console.log('controller:vrsketch: index.doSomething()=' + index.doSomething());

    // this is just a function you call to redirect to some other function, so you can
    // set a breakpoint and debug during development.
    $scope.debug = function () {
      //console.log('debug: now calling initWebGl');
      index.initWebGl(this, $window);
      index.initScene(this);
    };
    // controller vt_do_it calls index.doSomething, passing ourselves so that the
    // service can manipulate 'this' controller. 
    $scope.vt_do_it = function () {
      console.log("VrsketchCtrl: now in vt_do_it");
      console.log("VrsketchCtrl.vt_do_id: this=" + this);
      console.log("VrsketchCtrl.vt_do_id: this.doSomething()=" + this.doSomething());
      console.log("VrsketchCtrl.vt_do_it: index.doSomething()=" + index.doSomething(this));
    };

    $scope.doSomething = function () {
      return 6;
    };

    // contoller method vt_do_it_2 assigns a service function to us.  Then when we
    // call the new controller function 'this' is is set to our controller and not
    // to the services 'this'.  Thus, we do *not* need to pass a controller using this
    // method
    // $scope.vt_do_it_2 = function () {

    // };
    $scope.vt_do_it_2 = index.doSomething2;

    $scope.initScene = function() {
    };

    // Default
    console.log('vrsketch.js: now in default path');
    //index.initWebGl(this, $window);
    //index.initScene(this);
    index.init(this, $window);

    this.renderer.render(this.scene, this.camera);
    
  }]);
