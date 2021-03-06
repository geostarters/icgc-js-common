// @flow

import Colorizator from "../../src/color/colorizator";

describe("Class Colorizator", () => {

	it("#constructor", () => {

		const colorizator = new Colorizator();
		expect(colorizator).not.toBeUndefined();

	});

	it("#getHslNiceColor", () => {

		const colorIn = "#fff";
		const colorizator = new Colorizator();
		const colorOut = colorizator.getHslNiceColor(colorIn);
		expect(colorOut).toBe("hsl(NaN,50%,50%)");

	});

});
