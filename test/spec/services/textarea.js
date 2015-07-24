'use strict';

describe('Service: TextArea', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var TextArea;
  beforeEach(inject(function (_TextArea_) {
    TextArea = _TextArea_;
  }));

  it('should do something', function () {
    expect(!!TextArea).toBe(true);
  }); 

});
