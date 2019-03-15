
/* eslint-disable  */
require("flow-remove-types/register");
const test = require("tap").test;
const GeoJSONStatics = require("../../src/geo/geoJSONStatics");

test("GeoJSONStatics", (t) => {

	const keyField = "temp";
	const geoJSON = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"title": "feture7", "codi": 10, "temp": null}, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369]}}, {"type": "Feature", "properties": {"title": "feture6", "codi": 11, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217]}}, {"type": "Feature", "properties": {"title": "feture5", "codi": 15, "temp": 5}, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345]}}, {"type": "Feature", "properties": {"title": "feture4", "codi": 12, "temp": ""}, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457]}}, {"type": "Feature", "properties": {"title": "feture3", "codi": 16, "temp": 1}, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795]}}, {"type": "Feature", "properties": {"title": "feture2", "codi": 17, "temp": 8}, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684]}}] };

	const geoJSON2 = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"title": "feture7", "codi": 10, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369]}}, {"type": "Feature", "properties": {"title": "feture6", "codi": 11, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217]}}, {"type": "Feature", "properties": {"title": "feture5", "codi": 15, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345]}}, {"type": "Feature", "properties": {"title": "feture4", "codi": 12, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457]}}, {"type": "Feature", "properties": {"title": "feture3", "codi": 16, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795]}}, {"type": "Feature", "properties": {"title": "feture2", "codi": 17, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684]}}] };

	t.test("#constructor", (t) => {


		//t.ok(new GeoJSONStatics(options1) instanceof GeoJSONStatics, "creates an object");
		t.ok(new GeoJSONStatics(geoJSON, keyField) instanceof GeoJSONStatics, "creates an object");

		t.throws(() => {

			new GeoJSONStatics("pepito");

		}, "Invalid parameters provided: geoJSON AND keyField", "detects and throws on invalid input");

		t.throws(() => {

			new GeoJSONStatics();

		}, "Invalid parameters provided: geoJSON AND keyField", "detects and throws on invalid input");


		t.end();

	});


	t.test("#getColumnFromGEOJSON", (t) => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON, keyField);

		//console.info(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON));

		t.type(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON), Array);
		t.ok(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON), Array);
		t.ok(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON, true), Array);
		t.ok(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON, false), Array);

		t.throws(() => {

			geoJSONStatics.getColumnFromGEOJSON("temp", null);

		}, "Invalid parameters provided: geoJSON AND keyField", "detects and throws on invalid input");
		t.end();

	});


	t.test("#getStatsFromRangesColorsGeoJSON", (t) => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON, keyField);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors);

		t.type(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors), Object);
		t.ok(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors));

		t.equal(_estats.basics.max, 8);
		t.type(_estats.classification.quantile, Array);
		t.equal(_estats.colors.colors, arrayColors);
		t.throws(() => {

			geoJSONStatics.getStatsFromRangesColorsGeoJSON("3", null);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");


		t.throws(() => {

			geoJSONStatics.getStatsFromRangesColorsGeoJSON(null, arrayColors);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");

		t.end();

	});

	t.test("#getStatsFromRangesColorsGeoJSONOne", (t) => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON2, keyField);
		const numRanges = 1;
		const arrayColors = ["#ffddcc"];
		const _estats = geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors);


		t.type(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors), Object);
		t.ok(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors));
		t.equal(_estats.basics.max, 2);
		t.equal(_estats.basics.max, 2);
		t.type(_estats.classification.quantile, Array);
		t.equal(_estats.colors.colors, arrayColors);
		t.throws(() => {

			geoJSONStatics.getStatsFromRangesColorsGeoJSON("3", null);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");


		t.throws(() => {

			geoJSONStatics.getStatsFromRangesColorsGeoJSON(null, arrayColors);

		}, "Invalid parameters provided: numRanges or arrayColors", "detects and throws on invalid input");

		t.end();

	});


	t.end();

});
