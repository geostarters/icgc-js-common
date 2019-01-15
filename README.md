# ICGC-COMMON
[![npm version](https://badge.fury.io/js/%40geostarters%2Fcommon.svg)](https://badge.fury.io/js/%40geostarters%2Fcommon)
[![Build Status Linux](https://travis-ci.org/geostarters/icgc-js-common.svg?branch=master)](https://travis-ci.org/geostarters/icgc-js-common)
[![Build status](https://ci.appveyor.com/api/projects/status/aa2bikit893mt4xq/branch/master?svg=true)](https://ci.appveyor.com/project/geostarters/icgc-js-common/branch/master)
[![Dependency Status](https://david-dm.org/geostarters/icgc-js-common.svg)](https://david-dm.org/geostarters/icgc-js-common)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A Javascript lib with common functionalities to use across different projects.

* Uses [unassert](https://github.com/unassert-js/unassert) to encourage programming with assertions
* Generates a single file package using [browserify](http://browserify.org/)
* Uses [st](https://github.com/isaacs/st) to provide a server to serve static files for quick debugging of the package
* Uses [documentation.js](https://github.com/documentationjs/documentation) to generate a JSON file to be consumed by another package (see the [documenting the code](#documentation) section) (TODO: Ingest it with [@mapbox/batfish](https://github.com/mapbox/batfish)?)
* Uses [eslint](https://eslint.org/) to perform static analysis in code
* Uses [flow](https://flow.org/) to check types (see the [using types](#types) section)
* Uses [node-tap](https://github.com/tapjs/node-tap) for testing (see the [writting tests](#testing) section)
* Uses [nyc](https://github.com/istanbuljs/nyc) to run Istanbul's coverage testing
* Provides a small source file and its corresponding test as an example

## <a name="documentation"></a>Documenting the code
The documentation follows the [JSDoc](http://usejsdoc.org/about-getting-started.html) syntax. 

To get started you can read the documentation.js start guide [here](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md) or take a look at the provided example file [here](https://github.com/geostarters/js-project-template/blob/master/src/geo/latlon.js)

## <a name="types"></a>Using types
Using flow provides a way to check for common syntax errors while calling functions. Flow provides a simple example of which kind of problems it can solve in their [Type Annotations guide](https://flow.org/en/docs/types/). There's also a list of annotations it supports there.

## <a name="testing"></a>Writting tests
[Node-tap](https://github.com/tapjs/node-tap) implements the [Test Anything Protocol](https://testanything.org/).

Take a look at the [Node-tap API](http://www.node-tap.org/api/) to check all the supported functions. 

Check the provided [example file](https://github.com/geostarters/js-project-template/blob/master/test/unit/latlon.test.js) to see how node-tap testing looks.

Run the [testing coverage]() script to see which percentage of code is being tested. Aim for the moon, bigger is obviously better.

## Provided scripts

* __build-dev__: Creates a single file package with all the assertions intact to be ussed in browsers. 
* __watch-dev__: Watches the source
* __build-min__: Creates a minified package with its map file and without assertions to be ussed in browsers
* __build-unflow__: Builds ready-to-use modules in dist by removing flow types
* __start-server__: Starts a debug server on the current directory
* __start__: Watches the source for changes and runs the debug server
* __build-docs__: Generates the documentation file
* __lint__: Checks the code linting
* __lint-docs__: Lints the documentation files
* __test__: Runs the static type checker and runs the tests
* __test-unit__: Runs the unit tests
* __test-flow__: Runs the static type checks
* __test-cov__: Runs the testing coverage
* __pre-production__: Runs all the required scripts to check if the code is ready for production

## Folder structure
__debug:__ Contains a simple html file that loads the generated package file. All the functionalities should have an html file here demoing how it works

__dist:__ Contains the built files generated by the scripts (dev package, minified package and map)

__src:__ Contains an index file that requires all the modules that should be exported and all the source files that compound the package.

__test:__ Contains the unit and integration tests


