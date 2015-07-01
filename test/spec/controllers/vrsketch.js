'use strict';

describe('Controller: VrsketchCtrl', function () {

  // load the controller's module
  beforeEach(module('vrsketchApp'));

  var VrsketchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, index) {
    
    scope = $rootScope.$new();
    //index = 
    
    VrsketchCtrl = $controller('VrsketchCtrl', {
      $scope: scope,
      index: index
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  
});
