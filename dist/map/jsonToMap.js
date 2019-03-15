//      

const Request = require("../request");


/**
 * Parse information from JSON.
 * @param {object} Json Optional
 * @example
 * Sample;
 	const jsonToMap = new JsonToMap();
 */


class JsonToMap {


	constructor() {

		this.defaultMapOptions = {
			"style": "https://tilemaps.icgc.cat/tileserver/styles/fosc.json",
			"center": [2.95470, 41.854],
			"container": "map",
			"zoom": 10
		};
		this.JSON = null;

	}


	getAsyncConfigJSON(pathJSON        , callback        ) {


		callback = callback || function () {};

		return new Promise(((resolve, reject) => {

			if ((pathJSON !== null && typeof pathJSON === "string" && pathJSON.indexOf(".json") !== -1)) {

				Request.get(pathJSON).then((res) => {

					this.JSON = res;
					resolve(this.JSON);
					return callback(this.JSON);

				}).catch((error) => {

					reject(error);
					return callback(error);

				});

			} else {

				///throw new Error("No GeoJSON path found");
				reject({
					"statusCode": 100,
					"msg": "Invalid parameters provided: in pathJSON"
				});


			}

		}));


	}


	getConfigJSON() {

		return this.JSON;

	}

	getAsyncSourceGeoJSONFromPath(pathGeoJSON        , callback        ) {


		const geoJsonPath = pathGeoJSON;

		callback = callback || function () {};

		return new Promise((resolve, reject) => {

			if ((pathGeoJSON !== null && typeof pathGeoJSON === "string")) {


				Request.get(geoJsonPath).then((res) => {

					this.JSON = res;
					resolve(this.JSON);
					return callback(this.JSON);

				}).catch((error) => {

					reject(error);
					return callback(error);

				});


			} else {

				///throw new Error("No GeoJSON path found");
				reject({
					"statusCode": 100,
					"msg": "No valid url"
				});


			}

		});


	}

	getAsyncSourceGeoJSON(callback        ) {


		if (this.JSON !== null && this.JSON.vieweroptions) {

			const geoJsonPath = this.JSON.vieweroptions.geojsonpath;
			const sourcename = this.JSON.vieweroptions.sourcename;
			callback = callback || function () {};

			return new Promise(((resolve, reject) => {

				Request.get(geoJsonPath).then((res) => {

					const _OBJ = {
						"name": sourcename,
						"data": res
					};
					resolve(_OBJ);
					callback(_OBJ);

				}).catch((error) => {

					reject(error);
					return callback(error);

				});


			}));


		} else {

			throw new Error("No JSON found");

		}

	}


	getOptionsMap(container        ) {

		const mapOptions = {};
		if (this.JSON === null) {

			//this.defaultMapOptions.container = container;
			console.info(this.defaultMapOptions);
			return this.defaultMapOptions;

		} else {

			try {

				mapOptions.style = this.JSON.vieweroptions.style;
				mapOptions.center = [this.JSON.vieweroptions.initview.lon,
					this.JSON.vieweroptions.initview.lat
				];
				mapOptions.zoom = this.JSON.vieweroptions.initview.zoom;
				mapOptions.pitch = this.JSON.vieweroptions.initview.pitch;
				mapOptions.bearing = this.JSON.vieweroptions.initview.bearing;
				mapOptions.container = container;
				mapOptions.hash = true;

				return mapOptions;

			} catch (Err) {

				return this.defaultMapOptions;

			}

		}

	}


}

module.exports = JsonToMap;
