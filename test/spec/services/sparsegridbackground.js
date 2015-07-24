'use strict';

describe('Service: sparseGridBackground', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var sparseGridBackground;
  beforeEach(inject(function (_sparseGridBackground_) {
    sparseGridBackground = _sparseGridBackground_;
  }));

  it('should do something', function () {
    expect(!!sparseGridBackground).toBe(true);
  });

});
