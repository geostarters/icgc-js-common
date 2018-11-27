// @flow


const version: string = require("../package.json").version;
const LatLon = require("./geo/latlon");
const LatLonBounds = require("./geo/latlonBounds");
const Request = require("./request");
const Utils = require("./utils");

module.exports = {
	version,
	LatLon,
	LatLonBounds,
	Request,
	Utils
};

/**
 * The version of the project in use as specified in `package.json`,
 * `CHANGELOG.md`, and the GitHub release.
 *
 * @var {string} version
 */
