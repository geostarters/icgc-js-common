// @flow

import BridgeStatics from "./bridgeStatics";
import UtilsStatics from "./utilsStatics";


/**
 * Generate basic statistics from Array.
 *
 * @param {Array} arrayColumn
 * @example
 * Sample;
 *
	const ArrayStatics = new ArrayStatics(arrayColumn);
 */
class ArrayStatics {


	arrayColumn: Array<number> ;

	constructor(arrayColumn: Array<number>) {


		this.arrayColumn = arrayColumn;
		this.bridgeStatics = null;
		this.stats = {};
		this.utilsStatistis = new UtilsStatics();

		if (this.arrayColumn !== null && Array.isArray(this.arrayColumn)) {

			this.bridgeStatics = new BridgeStatics(this.utilsStatistis.checkArrayValues(this.arrayColumn));

		} else {

			throw new Error("No options provided:arrayColumn needed");

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
	 * Returns basics stats
	 *
	 *
	 * @returns {object}
	 */

	getBasicsStats(decimals: number) {


		this.stats = {
			"basics": this.bridgeStatics.getBasicsStats(decimals)
		};

		return this.stats;


	}


	/**
	 * Returns stats form RangeNum and colors Array
	 *
	 * @param {number} numRanges : 5
	 * @param {Array} arrayColors : ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"]
	 * @returns {object}
	 */

	getStatsFromRangesColorsArray(numRanges: number, arrayColors: Array<string>) {

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


} //end classe

export default ArrayStatics;
