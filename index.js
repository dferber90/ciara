var vm = require('vm')
var fs = require('fs')

var istanbul = require('istanbul')
var instrumenter = new istanbul.Instrumenter()
var collector = new istanbul.Collector()
var reporter = new istanbul.Reporter()
var coverageObjects = []

process.on('exit', function onExit() {
  var sync = true

  coverageObjects.map(function mapSandbox(coverageObject) {
    collector.add(coverageObject)
  })

  if (coverageObjects.length > 0) {
    reporter.addAll([ 'lcov', 'clover' ])
    reporter.write(collector, sync, function anonymous() {})
  }
})

module.exports = {
  getScript: function getScript(filename) {
    var code = fs.readFileSync(filename).toString()
    var instrumentedCode = instrumenter.instrumentSync(code, filename)
    var script = new vm.Script(instrumentedCode, { filename: filename })
    script.isInstrumented = true
    return script
  },
  runInContext: function runInContext(filename, context, fn) {
    var script = this.getScript(filename)
    return this.runScriptInContext(script, context, fn)
  },
  runScriptInContext: function runScriptInContext(script, context, fn) {
    var sandbox = vm.createContext(context)
    script.runInContext(sandbox)
    if (script.isInstrumented) coverageObjects.push(sandbox.__coverage__)
    if (fn) fn(sandbox)
    return sandbox
  },
}
