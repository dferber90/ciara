var ciara = require('../')
var test = require('tape')

ciara.config({report: false})

test('smoke', function testFn(t) {
  ciara.runInContext('test-helpers/runMe.js', {}, function sandboxFn(sandbox) {
    t.equal(sandbox.foo, true)
    t.equal(sandbox.bar, true)
    t.end()
  })
})
