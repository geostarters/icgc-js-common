// @flow

import CSVStatics from "../../src/geo/csvStatics";

describe("CSVStatics", () => {

	const arrayCSV = [
		[2, 3, 4, 3, 3],
		[5, 6, 6, 4, 4],
		[1, 8, 1, 5, 7]
	];
	const numCSVColumn = 1;

	it("#constructor work", () => {

		expect(new CSVStatics(arrayCSV, numCSVColumn)).toBeInstanceOf(CSVStatics);

	});

	it("#constructor throws", () => {

		expect(() => new CSVStatics("pepito", 1)).toThrow();
		expect(() => new CSVStatics("pepito", 1)).toThrowError("No options provided: arrayCSV data and numCSVColumn");

		expect(() => new CSVStatics(arrayCSV, null)).toThrow();
		expect(() => new CSVStatics(arrayCSV, null)).toThrowError("No options provided: arrayCSV data and numCSVColumn");

	});


	it("#getColumFromCSV", () => {

		const csvStatics = new CSVStatics(arrayCSV, numCSVColumn);
		expect(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV)).toBeInstanceOf(Array);
		expect(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV)).toBeTruthy();
		expect(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV, true)).toBeTruthy();
		expect(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV, false)).toBeTruthy();

		expect(() => csvStatics.getColumFromCSV("temp", null)).toThrowError("Invalid parameters provided: dataCSV AND numColum");

	});

	it("#getStatsFromRangesColorsCSV", () => {

		const csvStatics = new CSVStatics(arrayCSV, numCSVColumn);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors);


		expect(csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors)).toBeInstanceOf(Object);
		expect(csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors)).toBeTruthy();

		expect(_estats.basics.max).toEqual(8);
		expect(_estats.classification.quantile).toBeInstanceOf(Array);
		expect(_estats.colors.colors).toEqual(arrayColors);

		expect(() => csvStatics.getStatsFromRangesColorsCSV("3", null)).toThrowError("Invalid parameters provided: numRanges or arrayColors");
		expect(() => csvStatics.getStatsFromRangesColorsCSV(null, arrayColors)).toThrowError("Invalid parameters provided: numRanges or arrayColors");

	});

});
