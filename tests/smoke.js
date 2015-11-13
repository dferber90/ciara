var ciara = require('../')
var test = require('tape')
var vm = require('vm')

test('smoke - runInContext', function testFn(t) {
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

test('smoke - script.run', function testFn(t) {
  var script = ciara.getScript('test-helpers/runMe.js')
  script.run({}, function sandboxFn(sandbox) {
    t.equal(sandbox.foo, true)
    t.equal(sandbox.bar, true)
    t.end()
  })
})

test('smoke - runScriptInContext', function testFn(t) {
  var script = new vm.Script('foo = true; var bar = true;')
  ciara.runScriptInContext(script, {}, function sandboxFn(sandbox) {
    t.equal(sandbox.foo, true)
    t.equal(sandbox.bar, true)
    t.end()
  })
})
