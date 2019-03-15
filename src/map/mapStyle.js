// @flow

const Colorizator = require("../color/colorizator");
const GeoJSONStatics = require("../geo/geoJSONStatics");
const BridgeStatics = require("../geo/bridgeStatics");
const UtilsStatics = require("../geo/utilsStatics");
const GeoExtent = require("geojson-extent");
const Request = require("../request");


/**
 * A `MapStyle` create a tematic style from GeoJson data, CSV o just an Array.
 *
 * @param {object} geoJSON GeoJSON data or URL.
 * @example
 * const geo = new MapStyle(geojson);
 */
class MapStyle {


	constructor(geoJSON: object) {

		this.colorizator = new Colorizator();
		this.Utils = new UtilsStatics();
		this.geoExtent = null;
		this.legendColors = [];
		this.legendRanges = [];
		this.haloTextColors = [];
		this.geostatstics = null;
		this.defaultMinZoom = 2;
		this.defaultMaxZoom = 18;
		this.defaultColor = "#FFCCDD";
		this.defaultVisualization = "visible";
		this.defaultFactor = 10;
		this.defaultHFactor = 100;
		this.defaultTextFactor = 1;
		this.exponetialTextFactor = 1.3;

		if (geoJSON !== null && typeof geoJSON === "object" && geoJSON.features) {

			this.geoJSON = geoJSON;
			this.geomType = this.getGeomTypeFromGeoJSON();
			this.fieldNames = this.getFieldNamesColumnFromGEOJSON();

			if (this.fieldNames && this.fieldNames.length > 0) {

				this.generateGeoStatisticsFromField(this.fieldNames[0]);

			}

		} else {

			this.geoJSON = null;
			this.geomType = null;
			this.fieldNames = null;

		}

	}


	getAsyncGeoJSON(pathGeoJSON: string, callback: object) {


		callback = callback || function () {};

		return new Promise(((resolve, reject) => {

			if ((pathGeoJSON !== null && typeof pathGeoJSON === "string")) {

				Request.get(pathGeoJSON).then((res) => {


					this.geoJSON = res;
					this.geomType = this.getGeomTypeFromGeoJSON();
					this.fieldNames = this.getFieldNamesColumnFromGEOJSON();
					if (this.fieldNames && this.fieldNames.length > 0) {

						this.generateGeoStatisticsFromField(this.fieldNames[0]);

					}
					resolve(res);
					return callback(res);


				}).catch((error) => {

					reject(error);
					return callback(error);

				});

			} else {

				///throw new Error("No GeoJSON path found");
				reject({
					"statusCode": 100,
					"msg": "No GeoJSON path found"
				});


			}

		}));


	}

	/**
	 * Returns geomType from first fetaure geometry in Geojson
	 *
	 *
	 * @returns {string}
	 */
	getGeomTypeFromGeoJSON() {

		try {

			if (this.geoJSON !== null && typeof this.geoJSON === "object" && this.geoJSON.features) {

				return this.geoJSON.features[0].geometry.type;

			} else {

				throw new Error("Invalid: geoJSON");

			}

		} catch (err) {

			return null;

		}

	}

	/**
	 * Returns Array title fields
	 *
	 *
	 * @returns {array}
	 */

	getFieldNamesColumnFromGEOJSON() {

		const items = [];
		const listFields = [];

		if (this.geoJSON !== null && typeof this.geoJSON === "object" && this.geoJSON.features) {

			for (const key in this.geoJSON.features) {

				const feature = this.geoJSON.features[key];

				for (const field in feature.properties) {

					items.push(field);
					//items.push([{"name":field, "type":this.Utils.checkType(feature.properties[field][0])}]);

				}

			}
			if (items.length > 0) {

				const _temp = new BridgeStatics(items);
				const nameFields = _temp.getClassUniqueValues();

				for (let y = 0; y < nameFields.length; y++) {

					if (this.geoJSON.features[0].properties[nameFields[y]]) {

						listFields.push({
							"name": nameFields[y],
							"type": this.Utils.checkType(this.geoJSON.features[0].properties[nameFields[y]])
						});

					}


				}

				return listFields;

			} else {

				throw new Error("The GeoJSON not contain field properties");

			}

		} else {


			throw new Error("Invalid: geoJSON");

		}

	}

	/**
	 * Returns object with type MapboxGL layers implemented
	 *
	 *
	 * @returns {object}
	 */

	getImplementedLayerTypes() {

		const type = {
			"type": {
				"circle": "Point",
				"fillextrusion": "Polygon3D",
				"symbol": "Text",
				"fill": "Polygon",
				"line": "Line",
			}
		};
		return type;


	}


	getLegendFromStyle(textTitol: string, cssClass: string) {

		const html = this.colorizator.generateHTMLLegendColor(this.legendColors, this.legendRanges,
			textTitol,
			cssClass);

		return html;

	}

	/**
	 * Returns filter null values mapboxGL
	 *
	 * @param {string} tematicField
	 * @returns {filterExpression} `this`
	 * @example MapStyle.getFilterByDefault("temp")
	 */

	getFilterByDefault(keyField: string) {

		return ["!=", ["typeof", ["get", keyField]], "null"];

	}


	/**
	 * Return geostatistics object
	 *
	 * @param {string} tematicField
	 * @returns {geostatstics} `this`
	 * @example MapStyle.generateGeoStatisticsFromField("temp")
	 */

	generateGeoStatisticsFromField(tematicField: string) {

		try {

			this.geostatstics = new GeoJSONStatics(
				this.geoJSON,
				tematicField
			);
			return this.geostatstics;

		} catch (err) {

			throw new Error(`No geostatistics created: ${err}`);

		}

	}

	/**
	 * Create MapBox GL init style layerNamer
	 * @param{string} SorceName: the Mapbox gl source ID
	 * @param{string} layerName: theMapbox gl layer ID
	 * @param{string} keyField:The fieldName fromGeoJSON
	 * @param{string} type: tthe geomType see getImplementedLayerTypes function
	 * @param{number} maxzoom
	 * @param{number} minzoom
	 *
	 *
	 * @returns {object}
	 */

	createStyleLayer(sourceName: string,
		layerName: string,
		keyField: string,
		type: string,
		maxzoom: number,
		minzoom: number,
		initColor: string,
		visualization: string,
		factor: number

	) {

		const styleLayer = {
			"id": layerName
		};
		const getTypes = this.getImplementedLayerTypes();


		minzoom = minzoom || this.defaultMinZoom;
		minzoom = minzoom || this.defaultMaxZoom;
		initColor = initColor || this.defaultColor;
		visualization = visualization || this.defaultVisualization;

		if (type.indexOf(getTypes.type.circle) !== -1) {

			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "circle",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"paint": {
					"circle-color": initColor,
					"circle-radius": [
						"interpolate", ["exponential", 1],
						["zoom"],
						3,
						0.5,
						15,
						8
					]
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]
			};

		} else if (type.indexOf(getTypes.type.fillextrusion) !== -1) {

			factor = factor || this.defaultHFactor;
			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "fill-extrusion",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"paint": {
					"fill-extrusion-opacity": 0.9,
					"fill-extrusion-color": initColor,
					"fill-extrusion-height": (1 * factor),
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]
			};

		} else if (type.indexOf(getTypes.type.symbol) !== -1) {

			factor = factor || this.defaultTextFactor;
			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "symbol",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"text-allow-overlap": true,
				"text-ignore-placement": true,
				"symbol-spacing": 10,
				"layout": {
					"text-field": `{${keyField}}`,
					"text-font": ["Open Sans Bold"],
					"text-size": [
						"interpolate",
						["exponential", 1],
						["zoom"],
						4, parseInt(12 * factor),
						8, parseInt(10 * factor),
						10, parseInt(10 * factor),
						14, parseInt(8 * factor),
						16, parseInt(6 * factor),
						18, parseInt(7 * factor)
					],
					"symbol-placement": "point",
					"text-anchor": "top",
					"symbol-spacing": 750
				},
				"paint": {
					"text-halo-color": "rgba(0,0,0,0.8)",
					"text-color": initColor,
					"text-halo-width": 1.5,
					"text-halo-blur": 1,
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]
			};

		} else if (type.indexOf(getTypes.type.line) !== -1) {

			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "line",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"layout": {
					"line-join": "round",
					"line-cap": "round"
				},
				"paint": {
					"line-width": 3,
					"line-color": initColor
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]

			};

		} else if (type.indexOf(getTypes.type.fill) !== -1) {

			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "fill",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"paint": {
					"fill-opacity": 0.9,
					"fill-color": initColor
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]
			};


		} else {

			styleLayer.style = {
				"id": layerName,
				"source": sourceName,
				"interactive": true,
				"type": "circle",
				"minzoom": minzoom,
				"maxzoom": maxzoom,
				"paint": {
					"circle-color": "#ff0000",
					"circle-radius": [
						"interpolate", ["exponential", 1],
						["zoom"],
						1,
						0.5,
						10,
						2
					]
				},
				"filter": ["!=", ["typeof", ["get", keyField]],
					"null"
				]
			};

		}


		return styleLayer;

	}


	/**
	 * Return predefined style
	 *
	 *
	 *
	 * @returns {object}
	 */

	setStyleFromPreDefinedRamTemperatureHeights(tematicField: string) {

		const stylePre = ["interpolate", ["exponential", 1],
			["number", ["get", tematicField]], -25, 0, -10, 10, -5, 15, 0, 100, 2, 200, 4, 400, 8, 800, 10, 1000, 12, 1200, 14, 1400, 16, 1600, 18, 1800, 20, 2000, 22, 2200, 24, 2600, 26, 2800, 28, 3200, 30, 3600, 32, 4000, 34, 4400, 36, 5000, 38, 5500, 40, 6000, 42, 7000, 44, 8000, 46, 9000, 48, 10000, 50, 12000
		];

		return stylePre;

	}

	/**
	 * Return predefined style
	 *
	 *
	 *
	 * @returns {object}
	 */

	setStyleFromPreDefinedRamTemperatureInterpolateHeights(tematicField: string) {

		const stylePre = ["interpolate", ["linear"],
			["zoom"],
			4, ["*", ["number", ["get", tematicField]], 100],
			16, ["*", ["number", ["get", tematicField]], 50],
		];

		return stylePre;

	}


	/**
	 * Return factor textsize
	 *
	 *
	 *
	 * @returns {stylePre}
	 */

	setStyleTextSizeByFactorSize(factorSize: number) {

		factorSize = factorSize || this.defaultTextFactor;

		const stylePre = ["interpolate",
			["exponential", 1],
			["zoom"],
			4, parseFloat(12 + (factorSize * this.exponetialTextFactor)),
			8, parseFloat(10 + (factorSize * this.exponetialTextFactor)),
			10, parseFloat(10 + (factorSize * this.exponetialTextFactor)),
			14, parseFloat(8 + (factorSize * this.exponetialTextFactor)),
			16, parseFloat(6 + (factorSize * this.exponetialTextFactor)),
			18, parseFloat(6 + (factorSize * this.exponetialTextFactor))
		];


		return stylePre;

	}


	/**
	 * Return predefined style
	 *
	 *
	 *
	 * @returns {object}
	 */
	setStyleFromPreDefinedRamTemperatureColor(tematicField: string) {

		const stylePre = ["interpolate", ["exponential", 1],
			["number", ["get", tematicField]], -25, "#0000ff", -10, "#68a2ff", -5, "#68d9ff", 0, "#68ffff", 2, "#68ffe0", 4, "#68ff9d", 8, "#7DFF68", 10, "#B2FF2B", 12, "#B6FF29", 14, "#CEFF1B", 16, "#DFFF12", 18, "#F9FF03", 20, "#FFF500", 22, "#FFE200", 24, "#FFCC00", 26, "#ffb600", 28, "#ff9000", 30, "#ff7200", 32, "#ff5000", 34, "#ff3200", 36, "#ff0059", 38, "#ff0059", 40, "#ff0098", 42, "#d30480", 44, "#d004d3", 46, "#d004d3", 48, "#d004d3", 50, "#d004d3"
		];

		return stylePre;

	}


	/**
	 * Return predefined styles from array
	 *
	 *
	 *
	 * @returns {object}
	 */


	setStylesFromPredefinedScales(tematicField: string, scaleName: string) {


		const SCALES = {


			Vent: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgb(18,244,244)", 1, "rgb(8,159,252)", 5, "rgb(14,81,248)", 10, "rgb(16,13,112)", 20, "rgb(95,255,0)", 30, "rgb(1,206,63)", 40, "rgb(56,144,0)", 50, "rgb(32,95,1)", 60, "rgb(255,255,0)", 70, "rgb(255,235,0)", 80, "rgb(255,170,0)", 90, "rgb(230,76,0)", 100, "rgb(255,0,0)", 125, "rgb(255,0,0)", 150, "rgb(122,0,245)", 200, "rgb(51,51,51)"
			],
			Temperatura: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], -30, "rgb(109,0,109)", -25, "rgb(127,0,127)", -23, "rgb(149,0,149)", -21, "rgb(170,0,170)", -19, "rgb(200,0,200)", -15, "rgb(226,0,226)", -13, "rgb(68,22,171)", -11, "rgb(61,12,199)", -9, "rgb(65,8,255)", -7, "rgb(3,82,230)", -5, "rgb(3,113,230)", -3, "rgb(19,144,230)", -1, "rgb(46,182,230)", 1, "rgb(88,219,230)", 3, "rgb(37,157,0)", 5, "rgb(64,170,0)", 7, "rgb(87,183,0)", 9, "rgb(131,207,0)", 11, "rgb(164,225,5)", 13, "rgb(191,242,9)", 15, "rgb(215,252,25)", 17, "rgb(253,255,2)", 19, "rgb(255,232,2)", 21, "rgb(255,206,9)", 23, "rgb(250,173,0)", 25, "rgb(252,142,0)", 28, "rgb(246,116,0)", 31, "rgb(255,90,0)", 33, "rgb(255,60,0)", 35, "rgb(245,1,47)", 37, "rgb(219,1,42)", 39, "rgb(198,1,38)", 42, "rgb(170,1,33)", 44, "rgb(138,17,32)", 46, "rgb(105,17,32)", 48, "rgb(78,0,32)", 50, "rgb(65,0,27)", 52, "rgb(48,0,9)"
			],

			TemperaturaXafogor: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 20, "rgba(255,255,255,0.3)", 21, "rgb(250,173,0)", 23, "rgb(252,142,0)", 25, "rgb(246,116,0)", 28, "rgb(255,90,0)", 31, "rgb(255,60,0)", 33, "rgb(245,1,47)", 35, "rgb(219,1,42)", 37, "rgb(198,1,38)", 39, "rgb(170,1,33)", 42, "rgb(138,17,32)", 44, "rgb(105,17,32)", 46, "rgb(78,0,32)", 48, "rgb(65,0,27)", 50, "rgb(48,0,9)", 52, "rgb(255,255,255)"
			],
			TemperaturaSensacio: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], -30, "rgb(109,0,109)", -25, "rgb(127,0,127)", -23, "rgb(149,0,149)", -21, "rgb(170,0,170)", -19, "rgb(200,0,200)", -15, "rgb(226,0,226)", -13, "rgb(68,22,171)", -11, "rgb(61,12,199)", -9, "rgb(65,8,255)", -7, "rgb(3,82,230)", -5, "rgb(3,113,230)", -3, "rgb(19,144,230)", -1, "rgb(46,182,230)", 1, "rgb(88,219,230)", 3, "rgb(37,157,0)", 5, "rgb(64,170,0)", 7, "rgb(87,183,0)", 9, "rgb(131,207,0)"
			],
			ComparativaTemperatura: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], -20, "rgb(184,192,195)", -18, "rgb(158,151,171)", -16, "rgb(129,102,141)", -15, "rgb(106,68,119)", -14, "rgb(109,0,109)", -13, "rgb(127,0,127)", -12, "rgb(149,0,149)", -11, "rgb(170,0,170)", -10, "rgb(200,0,200)", -9, "rgb(226,0,226)", -8, "rgb(68,22,171)", -7, "rgb(61,12,199)", -6, "rgb(65,8,255)", -5, "rgb(3,82,230)", -4, "rgb(3,113,230)", -3, "rgb(19,144,230)", -2, "rgb(46,182,230)", -1, "rgb(88,219,230)", 0, "rgb(253,255,209)", 1, "rgb(250,253,153)", 2, "rgb(243,249,79)", 3, "rgb(253,255,2)", 4, "rgb(255,232,2)", 5, "rgb(255,206,9)", 6, "rgb(250,173,0)", 7, "rgb(252,142,0)", 8, "rgb(246,116,0)", 9, "rgb(255,90,0)", 10, "rgb(255,60,0)", 11, "rgb(245,1,47)", 12, "rgb(219,1,42)", 13, "rgb(198,1,38)", 14, "rgb(170,1,33)", 15, "rgb(138,17,32)", 16, "rgb(105,17,32)", 18, "rgb(78,0,32)", 20, "rgb(65,0,27)"
			],
			AmplitudTermica: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgb(109,0,109)", 1, "rgb(127,0,127)", 3, "rgb(149,0,149)", 5, "rgb(170,0,170)", 7, "rgb(200,0,200)", 9, "rgb(226,0,226)", 11, "rgb(68,22,171)", 13, "rgb(61,12,199)", 15, "rgb(65,8,255)", 17, "rgb(3,82,230)", 19, "rgb(3,113,230)", 21, "rgb(19,144,230)", 23, "rgb(46,182,230)", 25, "rgb(88,219,230)", 28, "rgb(37,157,0)", 31, "rgb(64,170,0)", 33, "rgb(87,183,0)", 35, "rgb(131,207,0)", 37, "rgb(164,225,5)", 39, "rgb(191,242,9)", 42, "rgb(215,252,25)", 44, "rgb(253,255,2)", 46, "rgb(255,232,2)", 48, "rgb(255,206,9)", 50, "rgb(250,173,0)", 52, "rgb(252,142,0)"
			],
			Humitat: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 20, "rgba(255,255,255,0.3)", 30, "rgb(255,51,51)", 40, "rgb(255,153,51)", 50, "rgb(255,255,0)", 55, "rgb(128,255,64)", 60, "rgb(0,255,176)", 65, "rgb(0,255,255)", 70, "rgb(0,228,248)", 75, "rgb(0,200,240)", 80, "rgb(0,116,216)", 95, "rgb(0,0,192)", 100, "rgb(50,50,50)",
			],
			CotaNeu: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 100, "rgb(0,0,192)", 200, "rgb(0,60,200)", 300, "rgb(0,88,208)", 400, "rgb(0,116,216)", 500, "rgb(0,144,224)", 600, "rgb(0,172,232)", 700, "rgb(0,200,240)", 800, "rgb(0,228,248)", 900, "rgb(0,255,255)", 1000, "rgb(0,255,176)", 1100, "rgb(128,255,64)", 1200, "rgb(192,255,0)", 1300, "rgb(255,255,0)", 1400, "rgb(255,236,0)", 1500, "rgb(255,216,0)", 1600, "rgb(255,196,0)", 1700, "rgb(255,176,0)", 1800, "rgb(255,156,0)", 1900, "rgb(255,136,0)", 2000, "rgb(255,112,0)", 2100, "rgb(255,80,0)", 2200, "rgb(255,0,0)", 2300, "rgb(240,0,48)", 2400, "rgb(224,0,72)", 2500, "rgb(208,0,96)", 2600, "rgb(192,0,120)", 2700, "rgb(208,0,144)", 2800, "rgb(224,0,168)", 2900, "rgb(240,0,192)", 3000, "rgb(255,0,216)", 3100, "rgb(255,64,255)", 3200, "rgb(255,104,255)"
			],
			PlujaHora: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 0.1, "rgb(170,255,255)", 0.5, "rgb(83,210,255)", 1, "rgb(42,170,255)", 2, "rgb(28,126,217)", 3, "rgb(14,63,217)", 4, "rgb(75,25,75)", 6, "rgb(153,51,153)", 10, "rgb(210,0,210)", 20, "rgb(255,0,255)"
			],
			PlujaDia: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 1, "rgb(170,255,255)", 2, "rgb(83,210,255)", 3, "rgb(42,170,255)", 4, "rgb(28,126,217)", 6, "rgb(14,63,217)", 10, "rgb(75,25,75)", 20, "rgb(153,51,153)", 50, "rgb(210,0,210)", 100, "rgb(255,0,255)"
			],
			PlujaMes: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 5, "rgb(170,255,255)", 10, "rgb(83,210,255)", 20, "rgb(42,170,255)", 30, "rgb(28,126,217)", 40, "rgb(14,63,217)", 60, "rgb(75,25,75)", 100, "rgb(153,51,153)", 200, "rgb(210,0,210)", 250, "rgb(255,0,255)"
			],
			PlujaAny: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 200, "rgb(170,255,255)", 300, "rgb(83,210,255)", 400, "rgb(42,170,255)", 500, "rgb(28,126,217)", 600, "rgb(14,63,217)", 700, "rgb(75,25,75)", 800, "rgb(153,51,153)", 900, "rgb(210,0,210)", 1200, "rgb(255,0,255)"
			],
			NeuHora: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 0.1, "rgb(0,255,0)", 0.5, "rgb(127,255,0)", 1, "rgb(76,187,23)", 2, "rgb(80,200,120)", 3, "rgb(0,168,107)", 4, "rgb(64,130,109)", 6, "rgb(68,148,74)", 10, "rgb(123,160,91)", 20, "rgb(107,142,35)"
			],
			NeuDia: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 1, "rgb(0,255,0)", 2, "rgb(127,255,0)", 3, "rgb(76,187,23)", 4, "rgb(80,200,120)", 6, "rgb(0,168,107)", 10, "rgb(64,130,109)", 20, "rgb(68,148,74)", 50, "rgb(123,160,91)", 100, "rgb(107,142,35)"
			],
			NeuMes: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 5, "rgb(0,255,0)", 10, "rgb(127,255,0)", 20, "rgb(76,187,23)", 30, "rgb(80,200,120)", 40, "rgb(0,168,107)", 60, "rgb(64,130,109)", 100, "rgb(68,148,74)", 200, "rgb(123,160,91)", 250, "rgb(107,142,35)"
			],
			NeuAny: ["interpolate", ["exponential", 1],
				["number", ["get", tematicField]], 0, "rgba(255,255,255,0.3)", 200, "rgb(0,255,0)", 300, "rgb(127,255,0)", 400, "rgb(76,187,23)", 500, "rgb(80,200,120)", 600, "rgb(0,168,107)", 700, "rgb(64,130,109)", 800, "rgb(68,148,74)", 900, "rgb(123,160,91)", 1200, "rgb(107,142,35)"
			]


		};

		let _style = SCALES.temperatura;

		Object.keys(SCALES).forEach((key) => {


			if (key === scaleName) {

				_style = SCALES[key];

			}

		});


		//console.info(_style);

		return _style;

	}


	setStylesPaintFromColorArray(tematicField: string, colorsArray: object, textHaloColor: boolean = false) {


		const numRanges = this.colorizator._checkNumRangs(colorsArray.length - 1);


		return this._generateStylesfromRanges(tematicField, numRanges, colorsArray, textHaloColor);


	}

	/**
	 * Returns style-color mapboxGL by Ranges
	 *
	 * @param {string} tematicField
	 * @param {number} numRanges
	 * @param {object} colorsPalette
	 * @returns {paintStyle} `this`
	 * @example MapStyle.setStylesPaintFromRanges("temp",6, "BuGn")
	 */
	setStylesPaintFromRanges(tematicField: string, numRanges: number, colorsPalette: string, textHaloColor: boolean = false) {

		numRanges = this.colorizator._checkNumRangs(numRanges);
		const colorsArray = this.colorizator.getColorArrayfromSelectedBrewer(numRanges + 1, colorsPalette);

		return this._generateStylesfromRanges(tematicField, numRanges, colorsArray, textHaloColor);

	}


	/**
	 * Returns style-extrude-heigths mapboxGL by factor * fieldvalue
	 *
	 * @param {string} tematicField
	 * @param {number} factor
	 * @returns {stylePre} `this`
	 * @example MapStyle.setStylebyFactorHeights("temp",10)
	 */

	setStylebyFactorHeights(tematicField: string, factorHeight: number) {

		factorHeight = factorHeight || this.defaultHFactor;

		const stylePre = ["*", ["number", ["get", tematicField]], factorHeight];

		return stylePre;

	}

	_checkDuplicates(array1) {

		let duplicate = false;

		const object = {};


		array1.forEach(item => {

			if (!object[item]) {

				object[item] = 0;

			}
			object[item] += 1;

		});

		for (const prop in object) {

			if (object[prop] >= 2) {

				duplicate = true;

			}

		}

		return duplicate;

	}


	_generateStylesfromRanges(tematicField: string, numRanges: number, colorsArray: object, textHaloColor: boolean) {


		if (this.generateGeoStatisticsFromField(tematicField)) {

			const geoStats = this.geostatstics.getStatsFromRangesColorsGeoJSON(numRanges, colorsArray);
			let paintStyle = ["step", ["get", tematicField]];
			let paintStyleHaloText = ["step", ["get", tematicField]];

			try {

				if (geoStats.classification.jenks.length <= 2 || geoStats.classification.uniques.length <= 2) {

					paintStyle = [];
					paintStyle = colorsArray[0];
					paintStyleHaloText = [];
					paintStyleHaloText = colorsArray[0];

				} else {

					let arrayRangs = geoStats.classification.jenks;

					if (this._checkDuplicates(geoStats.classification.jenks)) {

						arrayRangs = geoStats.classification.equals;

					}
					arrayRangs.forEach((_break, i) => {

						const color = geoStats.colors.colors[i];

						if (_break && color) {

							paintStyle.push(color, _break);
							paintStyleHaloText.push(this.colorizator.getOppositeGrayScaleColor(color), _break);

						}

					});

					//paintStyle.push("rgba(0,0,0,0)");

					paintStyle.push(colorsArray[colorsArray.length - 1]);
					paintStyleHaloText.push("rgba(0,0,0,0)");

				}

			} catch (err) {

				paintStyle = colorsArray[0];
				paintStyleHaloText = colorsArray[0];

			}


			this.legendColors = geoStats.colors.colors;
			this.legendRanges = geoStats.classification.jenks;
			this.haloTextColors = paintStyleHaloText;

			return textHaloColor ? paintStyleHaloText : paintStyle;
			//return paintStyle;

		} else {

			throw new Error("No geostatistics created");

		}


	}

	/**
	 * Returns field type number or string
	 *
	 * @param {string} fieldName
	 * @returns {string} `this`
	 * @example MapStyle.getFieldType("temp")
	 */
	getFieldType(fieldName: string) {

		const type = null;
		if (this.fieldNames !== null) {

			for (let i = 0; i < this.fieldNames.length; i++) {

				if (this.fieldNames[i].name === fieldName) {

					return this.fieldNames[i].type;

				}

			}

		}

		return type;


	}

	/**
	 * Returns BBOX estenc from geojson
	 *
	 * @returns {array} `bbox`
	 */
	getExtendFromGeoJSON() {

		this.geoExtent = new GeoExtent(this.geoJSON);
		return this.geoExtent;

	}


	/**
	 * Returns Halo colors
	 *
	 * @returns {array} `haloTextColors`
	 */

	getHaloStyleColors() {

		return this.haloTextColors;

	}


	/**
	 * Returns style-color mapboxGL
	 *
	 * @param {string} tematicField
	 * @param {string} endColor
	 * @param {string} initColor
	 * @param {string} type `type number or string"
	 * @returns {paintStyle} `this`
	 * @example MapStyle.setStylePaintFromUniquesValues("comarca","#ffCC00", "#00CCff")
	 */


	setStylePaintFromUniquesValues(tematicField: string, initColor: string, endColor: string) {

		const _type = this.getFieldType(tematicField) || "string";

		if (this.generateGeoStatisticsFromField(tematicField)) {

			const geoStatsArray = this.geostatstics.getUniqueValues();
			const colorsArray = this.colorizator.getColorsScaleRanges(geoStatsArray.length, initColor, endColor);
			const paintStyle = ["match", ["get", tematicField]];
			const paintStyleHaloText = ["match", ["get", tematicField]];
			const newgeoStatsArray = [];

			geoStatsArray.forEach((_break, i) => {

				if (_type === "string") {

					_break = _break.replace("# ", "");

				}

				paintStyle.push(_break, colorsArray[i]);
				paintStyleHaloText.push(_break, this.colorizator.getOppositeGrayScaleColor(colorsArray[i]));
				newgeoStatsArray.push(_break);

			});
			//paintStyle.push("rgba(0,0,0,0)");
			paintStyle.push(colorsArray[colorsArray.length - 1]);
			paintStyleHaloText.push("rgba(0,0,0,0)");
			this.haloTextColors = paintStyleHaloText;
			this.legendColors = colorsArray;
			this.legendRanges = newgeoStatsArray;
			return paintStyle;

		} else {

			throw new Error("No geostatistics created");

		}

	} //end classe

}
module.exports = MapStyle;
