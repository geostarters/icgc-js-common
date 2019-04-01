
require("flow-remove-types/register");
const test = require("tap").test;
const Utils = require("../../src/utils");

test("Utils", (t) => {

	t.test("#removeItem", (t) => {

		const items = [1, 2, 3, 4, 5, 6, 7];
		const res = Utils.removeItem(items, 2);
		const found = res.some((value) => value === 2);

		t.ok(!found, "Item not removed");
		t.end();

	});

	t.test("#invertColor", (t) => {

		const colorIn = "#000000";
		const colorOut = Utils.invertColor(colorIn);

		t.equal(colorOut, "#ffffff", "Color not inverted properly");
		t.end();

	});

	t.test("#setDifference", (t) => {

		const setA = new Set([1, 2, 3, 4]);
		const setB = new Set([2, 3]);

		const res = Utils.setDifference(setA, setB);

		t.ok((!res.has(2) && !res.has(3)), "Set difference incorrect");
		t.end();

	});

	t.test("#arrayDifference", (t) => {

		const items = Utils.arrayDifference([1, 2, 3, 4], [2, 3]);

		const found = items.some((value) => (value === 2 || value === 3));

		t.ok(!found, "Array difference incorrect");
		t.end();

	});

	t.end();

});
