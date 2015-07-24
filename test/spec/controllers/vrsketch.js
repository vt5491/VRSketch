'use strict';

describe('Controller: VrsketchCtrl', function () {

  // load the controller's module
  beforeEach(module('vrsketchApp'));

  var VrsketchCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    VrsketchCtrl = $controller('VrsketchCtrl', {
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   //expect(VrsketchCtrl.awesomeThings.length).toBe(3); 
  // });
});
