'use strict';
 
describe('Service: VrSketchService', function () {

  // load the service's module
  beforeEach(module('vrsketchApp'));

  // instantiate service
  var VrsketchService;
  beforeEach(inject(function (_VrsketchService_) {
    VrsketchService = _VrsketchService_;
  }));

  it('should do something', function () {
    expect(!!VrsketchService).toBe(true);
  });

  it('createStats works', function () {
    //console.log('ut: VrsketchService=' + Object.keys(VrsketchService));
    expect(VrsketchService.createStats).toBeDefined();

    var stats = VrsketchService.createStats();
    console.log('ut: top=' + stats.domElement.style.top);
    expect(typeof stats).toEqual('object');
    expect(typeof stats.domElement).toEqual('object');
    expect(stats.domElement.style.top).toEqual('0px');
  });

  it('initial state variables are correct', function () {
    expect(VrsketchService.INIT_POSITION.y).toEqual(1.5);
    expect(VrsketchService.INIT_ROTATION.x).toEqual(0);
  });
     
});

















