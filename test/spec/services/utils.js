'use strict';

describe('Service: utils', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var utils;
  beforeEach(inject(function (_utils_) {
    utils = _utils_;
  }));

  it('should do something', function () {
    expect(!!utils).toBe(true);
  });

  it('dat-gui support works', function () {
    //var control = new function() {this.rotY = 0;};
    
    //expect(utils.addControls(control)).toBeTruthy();
    expect(utils.gui).toBeTruthy();
  });

});










