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

  it('gridPlane exists', function () {
    expect(sparseGridBackground.gridPlane).toBeTruthy();
    expect(typeof sparseGridBackground.gridPlane).toEqual('function');
  });

  it('gridPlane works properly', function () {
    var result = sparseGridBackground.gridPlane({gridSize: 16, spacing: 2, plane: 'xz'});
    
    expect(result).toBeTruthy();
    expect(result).toBeArray();
    expect(result.length).toEqual(18);
    
  });
  
});
