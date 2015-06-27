'use strict';

describe('Service: base', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var base;
  beforeEach(inject(function (_base_) {
    base = _base_;
  }));

  it('should do something', function () {
    expect(!!base).toBe(true);
  });

  //vt add
  it('should be proper type', function () {
    console.log("baseSpec: base=" +  base);
    console.log("baseSpec: typeof base=" + typeof base);
    
    expect(typeof base).toEqual("object");
  });

  it('ONE_DEGREE is properly set', function() {
    console.log("baseSpec: ONE_DEGREE=" +  base.ONE_DEGREE);
    expect(base.ONE_DEGREE).toEqual(Math.PI / 180.0);
  });
  
  //vt end

});
