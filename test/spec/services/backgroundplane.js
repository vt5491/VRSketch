'use strict';

describe('Service: backgroundPlane', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var backgroundPlane;
  beforeEach(inject(function (_backgroundPlane_) {
    backgroundPlane = _backgroundPlane_;
  }));

  it('should do something', function () {
    expect(!!backgroundPlane).toBe(true);
  });

});
