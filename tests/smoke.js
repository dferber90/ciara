var ciara = require('../')
var test = require('tape')

test('smoke - basic', function testFn(t) {
  ciara.runInContext('test-helpers/runMe.js', {}, function sandboxFn(sandbox) {
    t.equal(sandbox.foo, true)
    t.equal(sandbox.bar, true)
    t.end()
  })
})

test('smoke - script', function testFn(t) {
  var script = ciara.getScript('test-helpers/runMe.js')
  ciara.runScriptInContext(script, {}, function sandboxFn(sandbox) {
    t.equal(sandbox.foo, true)
    t.equal(sandbox.bar, true)
    t.end()
  })
})
