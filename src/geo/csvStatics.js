// @flow

import BridgeStatics from "./bridgeStatics";
import UtilsStatics from "./utilsStatics";

/**
 * Generate basic statistics from CSV array.
 *
 * @param {arrayCSV}
 * @param {numCSVColumn} //position field array CSV
 * @example
 * Sample;
 * const arrayCSV = [
        [2, 3, 4, 3, 3],
        [5, 6, 6, 4, 4],
        [1, 8, 1, 5, 7]
    ];
	const numCSVColumn = 1;
	const csvStatics = new CSVStatics(arrayCSV, numCSVColumn);
 */
export default class CSVStatics {


	constructor(arrayCSV: Array<number>, numCSVColumn: number) {


		this.numCSVColumn = numCSVColumn;
		this.arrayCSV = arrayCSV;
		this.bridgeStatics = null;
		this.stats = {};
		this.utilsStatistis = new UtilsStatics();


		if (this.numCSVColumn !== null && Array.isArray(this.arrayCSV)) {

			this.bridgeStatics = new BridgeStatics(this.getColumFromCSV(this.numCSVColumn, this.arrayCSV));

		} else {

			throw new Error("No options provided: arrayCSV data and numCSVColumn");

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

	getStatsFromRangesColorsCSV(numRanges: number, arrayColors: Array<string>) {

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
	 * Returns array from csv properties field
	 * Used in the constructor
	 * @param {string} numColum
	 * @param {array} dataCSV
	 * @returns {array} `this`
	 */


	getColumFromCSV(numColum: number, dataCSV: Array<number>, forceToNumber: boolean = false) {

		const arrayColum = [];


		if (typeof numColum === "number" && Array.isArray(dataCSV)) {

			for (let i = 0; i < dataCSV.length; i++) {

				if (i > 0) {

					const feature = dataCSV[i][numColum];
					if (this.utilsStatistis.checkIfExistsValue(feature)) {

						if (forceToNumber) {

							arrayColum.push(this.utilsStatistis.forceToNumber(feature));

						} else {

							arrayColum.push(feature);

						}

					}

				}

			}

			return arrayColum;

		} else {


			throw new Error("Invalid parameters provided: dataCSV AND numColum");

		}

	}


} //end classe

