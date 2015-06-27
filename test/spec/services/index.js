'use strict';

describe('Service: index', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var index;
  beforeEach(inject(function (_index_) {
    index = _index_;
  }));

  it('should do something', function () {
    expect(!!index).toBe(true);
  });

  //vt add
  it('initWebGl testing', function() {
    index.initWebGl();
    
    expect(typeof index.initWebGl).toEqual("function");
    expect( index.renderer).toBeDefined();
  });
  
  //vt end
});
