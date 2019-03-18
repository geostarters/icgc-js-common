// @flow
import Colorizator from "../../src/color/colorizator";

describe("Class Colorizator", () => {

	it("#constructor", ()=> {

		const colorizator = new Colorizator();
		expect(colorizator).not.toBeUndefined();

	});

});
