# ciara

[![Build Status](https://travis-ci.org/dferber90/ciara.svg)](https://travis-ci.org/dferber90/ciara)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A testing utility function.

## Usage
Ciara allows you to require another JavaScript file while exposing its local variables in a sandbox.

## API

```js
var ciara = require('ciara')
var filename = 'path/to/file.js'

// mocks
var mocks = { /*..*/}

// option 1
var sandbox = ciara.runInContext(mocks, filename)

// option 2
var script = ciara.getScript(filename)
var sandbox = script.run(mocks)

// option 3
var script = ciara.getScript(filename)
script.run(mocks, function (sandbox) {
  // ..
})

// option 4
ciara.runInContext(filename, mocks, function (sandbox) {
  // ..
})

```

## Disabling code coverage

Pass in your own script to disable code coverage.

```js
var vm = require('vm')
var fs = require('fs')

var fileContents = fs.readFileSync(filename).toString()
var script = new Script(fileContents)

var sandbox = ciara.runScriptInContext(script, mocks)
```
