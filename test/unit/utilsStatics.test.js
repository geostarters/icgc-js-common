/* eslint-disable  */

require("flow-remove-types/register");
const test = require("tap").test;
const UtilsStatics = require("../../src/geo/utilsStatics");

test("Utilstatics", (t) => {


	t.test("#constructor", (t) => {


		//t.ok(new GeoJSONStatics(options1) instanceof GeoJSONStatics, "creates an object");
		t.ok(new UtilsStatics() instanceof UtilsStatics, "creates an object");


		t.end();

	});


	t.test("#forceToNumber", (t) => {

		const utilsStatics = new UtilsStatics();
		t.equal(utilsStatics.forceToNumber("4"), 4);
		t.equal(utilsStatics.forceToNumber(4), 4);
		t.equal(utilsStatics.forceToNumber("null"), -100);
		t.end();

	});


	t.test("#checkIfExistsValue", (t) => {

		const utilsStatics = new UtilsStatics();

		t.equal(utilsStatics.checkIfExistsValue("4"), true);
		t.equal(utilsStatics.checkIfExistsValue(4), true);
		t.equal(utilsStatics.checkIfExistsValue("null"), false);
		t.equal(utilsStatics.checkIfExistsValue(""), false);

		t.end();

	});


	t.end();

});
