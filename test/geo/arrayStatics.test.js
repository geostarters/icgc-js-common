// @flow

import ArrayStatics from "../../src/geo/arrayStatics";

describe("ArrayStatics", () => {

	const arrayColumn = [2, 3, 4, 5, 6, 6, 1, 8, 1, 2];

	const arrayColumnTest = [2, 3.66666, "null", 5, 6, 6.44444, 1, 1.444, 2];

	const arrayCom = [13.1, 13.1, 15.9, 13.9, 13.6, 12.7, 12.4, 12.2, 10.9, 10.1, 10.6, 11, 10.6, 9.4, 6.3, 10.9, 11.3, 11.3, 11.3, 11.3, 11.3, 11.3, 11.8, 11.8, 5.3, 4.8, 4.7, 4.6, 3.7, 3.6, 3.3, 3.3, 3.4, 3.4, 8.6, 10.9, 13.7, 13.7, 13.7, 8.9];


	it("#constructor works", () => {

		expect(new ArrayStatics(arrayColumn)).toBeInstanceOf(ArrayStatics);

	});

	it("#constructor throws", () => {

		expect(() => new ArrayStatics("pepito")).toThrow();
		expect(() => new ArrayStatics("pepito")).toThrowError("No options provided:arrayColumn needed");

		expect(() => new ArrayStatics()).toThrow();
		expect(() => new ArrayStatics()).toThrowError("No options provided:arrayColumn needed");

		expect(() => new ArrayStatics([])).toThrow();
		expect(() => new ArrayStatics([])).toThrowError("No options provided:arrayColumn needed");

	});


	it("#getStatsFromRangesColorsArray", () => {

		const arrayStatics = new ArrayStatics(arrayColumn);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = arrayStatics.getStatsFromRangesColorsArray(numRanges, arrayColors);

		expect(_estats).toBeInstanceOf(Object);
		expect(_estats.basics.max).toEqual(8);
		expect(_estats.classification.quantile).toBeInstanceOf(Array);
		expect(_estats.colors.colors).toEqual(arrayColors);

		expect(() => arrayStatics.getStatsFromRangesColorsArray("3", null)).toThrowError("Invalid parameters provided: numRanges or arrayColors");
		expect(() => arrayStatics.getStatsFromRangesColorsArray(null, arrayColors)).toThrowError("Invalid parameters provided: numRanges or arrayColors");

	});

	it("#getStatsFromArrayBad", () => {

		expect(new ArrayStatics(arrayColumnTest)).toBeInstanceOf(ArrayStatics);
		const arrayStatics = new ArrayStatics(arrayColumnTest);
		const _estats = arrayStatics.getBasicsStats();
		expect(_estats.basics.median).toEqual(2.9);

	});

	it("#getStatsFromDeimals", () => {

		expect(new ArrayStatics(arrayColumnTest)).toBeInstanceOf(ArrayStatics);
		const arrayStatics = new ArrayStatics(arrayColumnTest);
		const _estats = arrayStatics.getBasicsStats(1);
		expect(_estats.basics.median).toEqual(2.9);

	});

	it("#getStatsFromArrayCom", () => {

		expect(new ArrayStatics(arrayCom)).toBeInstanceOf(ArrayStatics);
		const arrayStatics = new ArrayStatics(arrayCom);
		const _estats = arrayStatics.getBasicsStats(2);
		expect(_estats.basics.median).toEqual(10.95);

	});

	it("#getStatsFromArrayNegative", () => {

		expect(new ArrayStatics([3, -10, -15])).toBeInstanceOf(ArrayStatics);
		const arrayStatics = new ArrayStatics([3, -10, -15]);
		const _estats = arrayStatics.getBasicsStats(2);
		expect(_estats.basics.diff).toEqual(18);

	});

});
