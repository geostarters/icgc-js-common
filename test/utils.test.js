// @flow

import Utils from "../src/utils";

describe("Utils", () => {

	it("#removeItem", () => {

		const items = [1, 2, 3, 4, 5, 6, 7];
		const res = Utils.removeItem(items, 2);
		expect(res).toEqual(expect.arrayContaining([1, 3, 4, 5, 6, 7]));

	});

	it("#applyFunctoDataArray", async () => {

		expect.assertions(1);

		const baseObject = [0, 0, 0];
		const obj = [0, 1, 2];

		await Utils.applyFunctoDataArray(obj, (item) => baseObject[item]++);
		expect(baseObject).toEqual([1, 1, 1]);

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
