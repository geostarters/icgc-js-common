//      


const version         = require("../package.json").version;
const LatLon = require("./geo/latlon");
const LatLonBounds = require("./geo/latlonBounds");
const Map = require("./geo/map");
const MapboxMap = require("./geo/mapboxMap");
const Request = require("./request");
const Utils = require("./utils");

module.exports = {
	version,
	LatLon,
	LatLonBounds,
	Map,
	MapboxMap,
	Request,
	Utils
};

/**
 * The version of the project in use as specified in `package.json`,
 * `CHANGELOG.md`, and the GitHub release.
 *
 * @var {string} version
 */
