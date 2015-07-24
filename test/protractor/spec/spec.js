// spec.js
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    //browser.get('http://juliemr.github.io/protractor-demo/');
    browser.get('http://localhost:9000/#/vrSketch');

    expect(browser.getTitle()).toEqual('VRSketch');
  });

  //it('canvas responds to key presses properly', function ($document, $window) {
  it('canvas responds to key presses properly', function () {    
    //element(by.id('canvas_container')).sendKeys('w');
    //var old_pos = $document.angular.element($document.body).injector().get('VrsketchService').camera.object.position.z;
    //console.log('$document=' + $document.find('body'));
    //console.log('document.body=' + $window.document.body);
    //console.log('angular=' + angular);
    //console.log('$document[0].body=' + $document[0].body);
    // var old_pos = $document.angular.element($document.body).injector().get('VrsketchService');

    // console.log('spec.js: old_pos=' + old_pos);
    // browser.executeAsyncScript(function(callback) {
    //   var service = angular.injector(['vrsketchApp']).get('VrsketchService');
    //   service.query({}, function(data) {
    //     callback(data);
    //   });
    // }).then(function (output) {
    //   console.log(output);
    // });

    //var last_camera_pos;

    var resume;
    
    browser.executeScript('return angular.element(document.body).injector().get("VrsketchService").camera.object.position ').then( function(last_pos){
      //var last_pos = pos;
      //console.log('keys(protractor)=' + Object.keys(protractor));
      // browser.ignoreSynchronization = true;
      // console.log('now sleeping for 5 s');
      // browser.driver.sleep(5000);
      // browser.ignoreSynchronization = true;

      //console.log('back from sleep');
      //var ptor = protractor.getInstance;
      //var ptor = browser.getInstance;
      //console.log('ptor=' + ptor);
      //console.log('body=' + body);
      //expect( _config.epid ).toBe( 1 );
      //last_camera_pos = pos;
      //ptor.ignoreSynchronization = true;
      //element(by.id('viewer')).click();
      element(by.id('viewer')).sendKeys('w');

      browser.executeScript('return angular.element(document.body).injector().get("VrsketchService").camera.object.position ').then( function(new_pos) {
        console.log('last_pos.z=' + last_pos.z + ',new_pos.z=' + new_pos.z);
        expect(new_pos.z).toEqual(last_pos.z + 1);
      });
      
      // resume = function () {
      //   console.log('back from sleep');
      //   //var ptor = protractor.getInstance;
      //   //var ptor = browser.getInstance;
      //   //console.log('ptor=' + ptor);
      //   //console.log('body=' + body);
      //   //expect( _config.epid ).toBe( 1 );
      //   //last_camera_pos = pos;
      //   //ptor.ignoreSynchronization = true;
      //   element(by.id('viewer')).click();
      //   element(by.id('viewer')).sendKeys('w');

      //   browser.executeScript('return angular.element(document.body).injector().get("VrsketchService").camera.object.position ').then( function(new_pos) {
      //     console.log('last_pos.z=' + last_pos.z + ',new_pos.z=' + new_pos.z);
      //   });
      // };// end resume

      //setTimeout(resume, 5000);//wait five seconds before continuing
      //setTimeout(function(){console.log('back in black')}, 5000);
      // setTimeout(function() {
      //   browser.alert('hello');
      // }, 1000);
      
    });
    
  });

  // it('canvas test 2', function (VrsketchService) {
  //   var old_pos = VrsketchService.camera;

  //   console.log('spec.js: old_pos=' + old_pos);
  // });
});







