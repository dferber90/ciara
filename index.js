var vm = require('vm');
var fs = require('fs');

var istanbul = require('istanbul');
var instrumenter = new istanbul.Instrumenter();
var collector = new istanbul.Collector();
var reporter = new istanbul.Reporter();
var sandboxes = [];

process.on('exit', function () {
  sandboxes.map(function (sandbox) {
    collector.add(sandbox.__coverage__);
  });

  var sync = true;
  reporter.addAll([ 'lcov', 'clover' ]);
  reporter.write(collector, sync, function () {});
});

module.exports = {
  runInContext: function runInContext (filename, context, fn) {
    var code = fs.readFileSync(filename).toString();
    var instrumentedCode = instrumenter.instrumentSync(code, filename);
    var sandbox = vm.createContext(context);
    var script = new vm.Script(instrumentedCode, { filename: filename });
    script.runInContext(sandbox);
    sandboxes.push(sandbox);
    if (fn) {
      fn(sandbox);
    }
    return sandbox;
  }
};
