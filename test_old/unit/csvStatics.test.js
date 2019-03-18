
/* eslint-disable  */
require("flow-remove-types/register");
const test = require("tap").test;
const CSVStatics = require("../../src/geo/csvStatics");

test("ArrayStatics", (t) => {


	const arrayCSV = [
		[2, 3, 4, 3, 3],
		[5, 6, 6, 4, 4],
		[1, 8, 1, 5, 7]
	];
	const numCSVColumn = 1;

	t.test("#constructor", (t) => {


		//t.ok(new ArrayStatics(options1) instanceof ArrayStatics, "creates an object");
		t.ok(new CSVStatics(arrayCSV, numCSVColumn) instanceof CSVStatics, "creates an object");

		t.throws(() => {

			new CSVStatics("pepito", 1);

		}, "No options provided: arrayCSV data and numCSVColumn", "detects and throws on invalid input");

		t.throws(() => {

			new CSVStatics(arrayCSV, null);

		}, "No options provided: arrayCSV data and numCSVColumn", "detects and throws on invalid input");


		t.end();

	});


	t.test("#getColumFromCSV", (t) => {

		const csvStatics = new CSVStatics(arrayCSV, numCSVColumn);


		t.type(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV), Array);
		t.ok(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV), Array);
		t.ok(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV, true), Array);
		t.ok(csvStatics.getColumFromCSV(numCSVColumn, arrayCSV, false), Array);

		t.throws(() => {

			csvStatics.getColumFromCSV("temp", null);

		}, "Invalid parameters provided: dataCSV AND numColum", "detects and throws on invalid input");
		t.end();

	});


	t.test("#getStatsFromRangesColorsCSV", (t) => {

		const csvStatics = new CSVStatics(arrayCSV, numCSVColumn);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors);

		t.type(csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors), Object);
		t.ok(csvStatics.getStatsFromRangesColorsCSV(numRanges, arrayColors));

		t.equal(_estats.basics.max, 8);
		t.type(_estats.classification.quantile, Array);
		t.equal(_estats.colors.colors, arrayColors);
		t.throws(() => {

			csvStatics.getStatsFromRangesColorsCSV("3", null);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");


		t.throws(() => {

			csvStatics.getStatsFromRangesColorsCSV(null, arrayColors);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");

		t.end();

	});


	t.end();

});
