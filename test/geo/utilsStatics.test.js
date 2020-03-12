// @flow

import UtilsStatics from "../../src/geo/utilsStatics";

describe("Utilstatics", () => {

	it("#constructor work", () => {

		expect(new UtilsStatics()).toBeInstanceOf(UtilsStatics);

	});

	it("#forceToNumber", () => {

		expect(UtilsStatics.forceToNumber("4")).toEqual(4);
		expect(UtilsStatics.forceToNumber(4)).toEqual(4);
		expect(UtilsStatics.forceToNumber("null")).toEqual(-100);

	});

	it("#checkIfExistsValue", () => {

		expect(UtilsStatics.checkIfExistsValue("4")).toEqual(true);
		expect(UtilsStatics.checkIfExistsValue(4)).toEqual(true);
		expect(UtilsStatics.checkIfExistsValue("null")).toEqual(false);
		expect(UtilsStatics.checkIfExistsValue("")).toEqual(false);

	});

});
