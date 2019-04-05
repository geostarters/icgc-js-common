// @flow

import Utils from "../src/utils";

describe("Utils", () => {

	it("#removeItem", () => {

		const items = [1, 2, 3, 4, 5, 6, 7];
		const res = Utils.removeItem(items, 2);
		expect(res).toEqual(expect.arrayContaining([1, 3, 4, 5, 6, 7]));

	});

	it("#applyFunctoDataArray", () => {

		/* 		expect-assertions(1);

		fucntion addNumber() {

		}

		const res = [0];
		Utils.applyFunctoDataArray([1, 2, 3, 4], (item) => res[0] = res[0] +  item);
		expect(res).toEqual(10); */

	});

	it("#invertColor", () => {

		const colorIn = "#000000";
		const colorOut = Utils.invertColor(colorIn);
		expect(colorOut).toBe("#ffffff");

	});

	it("#setDifference", () => {

		const setA = new Set([1, 2, 3, 4]);
		const setB = new Set([2, 3]);

		const res = Utils.setDifference(setA, setB);
		expect(!res.has(2) && !res.has(3)).toEqual(true);

	});

	it("#arrayDifference", () => {

		const items = Utils.arrayDifference([1, 2, 3, 4], [2, 3]);
		expect(items).toEqual(expect.arrayContaining([1, 4]));

	});

});
