/* eslint-disable  */


require("flow-remove-types/register");
const test = require("tap").test;
const ArrayStatics = require("../../src/geo/arrayStatics");

test("ArrayStatics", (t) => {


	const arrayColumn = [2, 3, 4, 5, 6, 6, 1, 8, 1, 2];

	const arrayColumnTest = [2, 3.66666, "null", 5, 6, 6.44444, 1, , 1.444, 2];

	const arrayCom = [13.1, 13.1, 15.9, 13.9, 13.6, 12.7, 12.4, 12.2, 10.9, 10.1, 10.6, 11, 10.6, 9.4, 6.3, 10.9, 11.3, 11.3, 11.3, 11.3, 11.3, 11.3, 11.8, 11.8, 5.3, 4.8, 4.7, 4.6, 3.7, 3.6, 3.3, 3.3, 3.4, 3.4, 8.6, 10.9, 13.7, 13.7, 13.7, 8.9];


	t.test("#constructor", (t) => {


		//t.ok(new ArrayStatics(options1) instanceof ArrayStatics, "creates an object");
		t.ok(new ArrayStatics(arrayColumn) instanceof ArrayStatics, "creates an object");

		t.throws(() => {

			new ArrayStatics("pepito");

		}, "No options provided:arrayColumn needed", "detects and throws on invalid input");

		t.throws(() => {

			new ArrayStatics();

		}, "No options provided:arrayColumn needed", "detects and throws on invalid input");


		t.end();

	});


	t.test("#getStatsFromRangesColorsArray", (t) => {

		const arrayStatics = new ArrayStatics(arrayColumn);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = arrayStatics.getStatsFromRangesColorsArray(numRanges, arrayColors);

		t.type(arrayStatics.getStatsFromRangesColorsArray(numRanges, arrayColors), Object);
		t.ok(arrayStatics.getStatsFromRangesColorsArray(numRanges, arrayColors));

		t.equal(_estats.basics.max, 8);
		t.type(_estats.classification.quantile, Array);
		t.equal(_estats.colors.colors, arrayColors);
		t.throws(() => {

			arrayStatics.getStatsFromRangesColorsArray("3", null);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");


		t.throws(() => {

			arrayStatics.getStatsFromRangesColorsArray(null, arrayColors);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");

		t.end();

	});


	t.test("#getStatsFromArrayBad", (t) => {

		t.ok(new ArrayStatics(arrayColumnTest) instanceof ArrayStatics, "creates an object");

		const arrayStatics = new ArrayStatics(arrayColumnTest);
		const _estats = arrayStatics.getBasicsStats();
		t.equal(_estats.basics.median, 2.9);
		t.end();

	});

	t.test("#getStatsFromDeimals", (t) => {

		t.ok(new ArrayStatics(arrayColumnTest) instanceof ArrayStatics, "creates an object");

		const arrayStatics = new ArrayStatics(arrayColumnTest);
		const _estats = arrayStatics.getBasicsStats(1);
		t.equal(_estats.basics.median, 2.9);
		t.end();

	});


	t.test("#getStatsFromArrayCom", (t) => {

		t.ok(new ArrayStatics(arrayCom) instanceof ArrayStatics, "creates an object");

		const arrayStatics = new ArrayStatics(arrayCom);
		const _estats = arrayStatics.getBasicsStats(2);
		t.equal(_estats.basics.median, 10.95);
		t.end();

	});


	t.test("#getStatsFromArrayComEmpty", (t) => {

		t.ok(new ArrayStatics([arrayCom]) instanceof ArrayStatics, "creates an object");

		const arrayStatics = new ArrayStatics([]);
		const _estats = arrayStatics.getBasicsStats(2);
		//console.info(_estats);
		//t.equal(_estats.basics.median, 10.95);
		t.end();

	});

	t.test("#getStatsFromArrayNegative", (t) => {

		t.ok(new ArrayStatics([arrayCom]) instanceof ArrayStatics, "creates an object");

		const arrayStatics = new ArrayStatics([3, -10, -15]);
		const _estats = arrayStatics.getBasicsStats(2);
		console.info("diff", _estats.basics.diff);
		//t.equal(_estats.basics.median, 10.95);
		t.end();

	});


	t.end();

});
