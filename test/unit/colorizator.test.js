/* eslint-disable  */

require("flow-remove-types/register");
const test = require("tap").test;
const Colorizator = require("../../src/color/colorizator");

test("Colorizator", (t) => {

	t.test("#constructor", (t) => {

		t.ok(new Colorizator() instanceof Colorizator, "creates an object");
		t.end();

	});


	t.test("#convertRGBtoHex", (t) => {

		const colorizator = new Colorizator();
		console.info(colorizator.convertRGBtoHex("rgb(255,255,255)"));
		t.contains(colorizator.convertRGBtoHex("rgb(255,255,255)"), "#");
		t.end();

	});

	t.test("#getRandomColor", (t) => {

		const colorizator = new Colorizator();
		t.contains(colorizator.getRandomColorFromArray(), "#");
		t.contains(colorizator.getRandomColor(), "#");
		t.end();

	});


	t.test("#getOppositeColor", (t) => {

		const colorizator = new Colorizator();
		t.contains(colorizator.getOppositeGrayScaleColor("#ffdd00"), "rgb");
		//	console.info(colorizator.getOppositeGrayScaleColor("#ffdd00"));
		t.end();

	});


	t.test("#getColorArrayfromSelectedBrewer", (t) => {

		const colorizator = new Colorizator();
		t.ok(colorizator.getColorArrayfromSelectedBrewer(5, "BuGn"), "5");
		t.type(colorizator.getColorArrayfromSelectedBrewer(5, "BuGn"), Array);
		const colors = colorizator.getColorArrayfromSelectedBrewer(5, "BuGn");

		t.equal(colors.length, 5);
		t.type(colorizator.getColorArrayfromSelectedBrewer(5, "Pepito"), Array);
		t.end();

	});


	t.test("#chekcFuntionsCheck", (t) => {

		const colorizator = new Colorizator();
		t.equal(colorizator._checkNumRangs(5), 5);
		t.equal(colorizator._checkNumRangs(15), 9);
		t.equal(colorizator._checkNumRangs(null), colorizator.defaultNumber);
		t.equal(colorizator._checkBrewerPosition(5), 5);
		t.equal(colorizator._checkBrewerPosition(25), 17);
		t.equal(colorizator._checkBrewerPosition(null), colorizator.defaultNumber);
		t.equal(colorizator._checkBrewerName("BuGn"), "BuGn");
		t.ok(colorizator._checkBrewerName("pepito"), "return existin random palette");
		t.end();

	});

	t.test("#generateHTMLBrewerPalettes", (t) => {

		const colorizator = new Colorizator();
		t.ok(colorizator.generateHTMLBrewerPalettes(10, 5), "Return HTML Palettes");
		t.type(colorizator.generateHTMLBrewerPalettes(10, 5), "string");
		t.type(colorizator.generateHTMLBrewerPalettes(100, 100), "string");
		t.ok(colorizator.generateHTMLBrewerPalettes(100, 100), "Return HTML Palettes with defaults values");
		t.ok(colorizator.generateHTMLBrewerPalettes(null, null), "Return HTML Palettes with defaults values");
		t.ok(colorizator.generateHTMLBrewerPalettes(), "Return HTML Palettes with defaults values");
		t.end();

	});


	t.test("#getColorsScaleRanges", (t) => {

		const colorizator = new Colorizator();
		const colorInit = "#ffddcc";
		const colorEnd = "#ffff00";
		const numRangs = 31;

		t.type(colorizator.getColorsScaleRanges(numRangs, colorInit, colorEnd), Array);
		t.ok(colorizator.getColorsScaleRanges(numRangs, colorInit, colorEnd), "Legend in HTML");

		t.end();

	});


	t.test("#generateHTMLLegendColor", (t) => {

		const colorizator = new Colorizator();
		const legendColors = ["#ffddcc", "#ccddee", "#ffff00"];
		const legendRanges = ["0-1", "0-2", ">3"];
		const textTitol = "Legend title";
		const classCSS = "";
		t.type(colorizator.generateHTMLLegendColor(legendColors, legendRanges, textTitol), "string");
		t.ok(colorizator.generateHTMLLegendColor(legendColors, legendRanges, textTitol), "Legend in HTML");

		t.end();

	});


	t.end();

});
