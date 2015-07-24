// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['test/protractor/spec/spec.js']
  specs: ['spec/spec.js'],
  capabilities: {
    'browserName': 'firefox'
  }
}
