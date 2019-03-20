// @flow


import GeoStats from "geostats";
/**
 * A `BridgeStatics` object represents a given latitude and longitude coordinates.
 *
 * @param {number} lat Latitude, measured in degrees.
 * @param {number} lon Longitude, measured in degrees.
 * @example
 * var ll = new BridgeStatics(42.10376, 1.84584);
 */
export default class BridgeStatics {

	arrayColumn: Array<number> ;
	geoStats: object;

	constructor(arrayColumn: Array<number>) {


		if (arrayColumn) {

			this.geoStats = new GeoStats(arrayColumn);
			this.stats = {};
			this.geoStats.setPrecision(1);
			this.geoStats.silent = true;

		} else {

			throw new Error("Invalid array provided");

		}

	}


	getClassUniqueValues() {


		const uniqueArray = this.geoStats.getClassUniqueValues();
		return uniqueArray;

	}

	setColorstoStats(arrayColors: Array<string>) {

		this.geoStats.setColors(arrayColors);

		this.stats.colors = {
			"colors": this.geoStats.colors
		};

		return this.stats.colors;

	}


	getValueFromRangePosition(rangePos: number) {

		return this.geoStats.getRangeNum(rangePos);

	}

	setClassificationStats(numRanges: number) {


		this.stats.classification = {

			"quantile": this.geoStats.getQuantile(numRanges),
			"equals": this.geoStats.getEqInterval(numRanges),
			"uniques": this.geoStats.getClassUniqueValues(),
			//"jenks": this.geoStats.getJenks(numRanges),
			"ranges": this.geoStats.getRanges(),
			"list": this.geoStats.getSortedlist()
		};


		try {

			this.stats.classification.jenks = this.geoStats.getJenks(numRanges);

		} catch (err) {

			this.stats.classification.jenks = this.geoStats.getQuantile(numRanges);

		}

		return this.stats.classification;

	}

	isValid(myVariable, truncate) {

		return (typeof (myVariable) === "number" && !Number.isNaN(myVariable) ? parseFloat(myVariable.toFixed(truncate)) : myVariable);


	}

	getBasicsStats(decimals: number) {

		let truncate = 1;

		if (typeof decimals === "number") {

			truncate = parseInt(decimals);

		}

		this.stats.basics = {
			"min": this.isValid(this.geoStats.min(), truncate),
			"max": this.isValid(this.geoStats.max(), truncate),
			"sum": this.isValid(this.geoStats.sum(), truncate),
			"pop": this.isValid(this.geoStats.pop(), truncate),
			"mean": this.isValid(this.geoStats.mean(), truncate),
			"median": this.isValid(this.geoStats.median(), truncate),
			"stddev": this.isValid(this.geoStats.stddev(), truncate),
			"cov": this.isValid(this.geoStats.cov(), truncate),
			"diff": this.isValid((this.geoStats.max() - this.geoStats.min()), truncate)
		};

		return this.stats.basics;

	}


} //end class

