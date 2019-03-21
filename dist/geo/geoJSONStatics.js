//      

import BridgeStatics from "./bridgeStatics";
import UtilsStatics from "./utilsStatics";

/**
 * Return basic stats from a GeoJson data a title field from geojson properties.
 *
 * @param {geoJSON} {geoJSON:geoJSON, filedName: keyField, arrayColumn: arrayColumn}
 * @param {keyField} feature.properties.
 * @example
 *const keyField = "temp";
const geoJSON = {"type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {"temp": 2 }, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369] }}, { "type": "Feature", "properties": {"temp": 2 }, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217] }}, { "type": "Feature", "properties": {"temp": 5 }, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345] }}, { "type": "Feature", "properties": {"temp": "" }, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457] }}, { "type": "Feature", "properties": {"temp": 1 }, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795] }}, { "type": "Feature", "properties": {"temp": 8 }, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684] }}] };
const geoSattics= new GeoJSONStatics(geoJSON, keyField)
 */
export default class GeoJSONStatistics {


	                
	                 

	constructor(geoJSON        , keyField        ) {


		this.geoJSON = geoJSON || null;
		this.keyField = keyField || null;
		this.bridgeStatics = null;
		this.stats = {};
		this.Utils = new UtilsStatics();
		this.geomType = null;
		this.maxFetauresToCount = 5000;


		if (this.geoJSON !== null && typeof this.geoJSON === "object" && this.keyField !== null) {

			this.bridgeStatics = new BridgeStatics(this.getColumnFromGEOJSON(this.keyField, this.geoJSON));


		} else {


			throw new Error("Invalid parameters provided: geoJSON AND keyField");

		}


	} //end constructor


	/**
	 * Returns Array Unique Values
	 *
	 *
	 * @returns {array}
	 */

	getUniqueValues() {


		return this.bridgeStatics.getClassUniqueValues();

	}


	/**
	 * Returns stats form RangeNum and colors Array
	 *
	 * @param {number} numRanges : 5
	 * @param {Array} arrayColors : ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"]
	 * @returns {object}
	 */

	getStatsFromRangesColorsGeoJSON(numRanges        , arrayColors               ) {


		if (typeof numRanges === "number" && Array.isArray(arrayColors)) {

			this.stats = {
				"classification": this.bridgeStatics.setClassificationStats(numRanges),
				"colors": this.bridgeStatics.setColorstoStats(arrayColors),
				"basics": this.bridgeStatics.getBasicsStats()
			};

			return this.stats;

		} else {

			throw new Error("Invalid parameters provided: numRanges or arrayColors");

		}

	}


	/**
	 * Returns array from geojson properties field
	 * Used in the constructor
	 * @param {string} keyFiled
	 * @param {object} geojson
	 * @returns {array} `this`
	 */

	getColumnFromGEOJSON(keyField        , GeoJSON        , forceNumber          = false) {

		const items = [];
		let _count = 0;

		if (this.geoJSON !== null && typeof this.geoJSON === "object" && this.keyField !== null) {

			const _type =	this.Utils.checkType(this.geoJSON.features[0].properties[keyField]);


			for (const key in GeoJSON.features) {

				if (_count < this.maxFetauresToCount) {

					const feature = GeoJSON.features[key];
					if (this.Utils.checkIfExistsValue(feature.properties[keyField])) {

						if (forceNumber) {

							items.push(this.Utils.forceToNumber(feature.properties[keyField]));

						} else if (!forceNumber && _type === "string" && !isNaN(parseInt(feature.properties[keyField])))	{

							items.push(`# ${(feature.properties[keyField]).toString()}`);


						} else {

							items.push(feature.properties[keyField]);

						}

					}

				}
				_count = _count + 1;

			}
			//console.info(items);

			return items;

		} else {


			throw new Error("Invalid parameters provided: geoJSON AND keyField");

		}

	}


	/**
	 * Returns array from geojson properties field, filtered by a value
	 *
	 * @param {string} keyFiled
	 * @param {object} geojson
	 * @param {string} keyFilter //Filter field
	 * @param {string} valueFilter
	 * @returns {array} `this`
	 */

	_getColumFromGEOJSONFilter(keyField        , GeoJSON        , keyFilter        , valueFilter        ) {

		const items = [];
		for (const key in GeoJSON.features) {

			const feature = GeoJSON.features[key];
			if (this.Utils.checkIfExistsValue(feature.properties[keyField])) {

				if (feature.properties[keyFilter] < valueFilter) {

					items.push(feature.properties[keyField]);

				}

			}

		}
		return items;

	}

} //end classe
