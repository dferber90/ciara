var vm = require('vm')
var fs = require('fs')

var istanbul = require('istanbul')
var instrumenter = new istanbul.Instrumenter()
var collector = new istanbul.Collector()
var reporter = new istanbul.Reporter()
var sandboxes = []
var config = { report: true }

process.on('exit', function onExit() {
  var sync = true

  if (config.report) {
    sandboxes.map(function mapSandbox(sandbox) {
      collector.add(sandbox.__coverage__)
    })

    reporter.addAll([ 'lcov', 'clover' ])
    reporter.write(collector, sync, function anonymous() {})
  }
})

module.exports = {
  runInContext: function runInContext(filename, context, fn) {
    var code = fs.readFileSync(filename).toString()
    var instrumentedCode = config.report ?
      instrumenter.instrumentSync(code, filename) : code
    var sandbox = vm.createContext(context)
    var script = new vm.Script(instrumentedCode, { filename: filename })
    script.runInContext(sandbox)
    sandboxes.push(sandbox)
    if (fn) {
      fn(sandbox)
    }
    return sandbox
  },

  config: function configFn(additionalOptions) {
    var option
    if (additionalOptions) {
      for (option in additionalOptions) {
        if (additionalOptions.hasOwnProperty(option)) {
          config[option] = additionalOptions[option]
        }
      }
    }
  },
}
