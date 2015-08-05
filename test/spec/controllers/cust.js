'use strict';

describe('Controller: CustCtrl', function () {

  // load the controller's module
  beforeEach(module('vrsketchApp'));

  var CustCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustCtrl = $controller('CustCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
