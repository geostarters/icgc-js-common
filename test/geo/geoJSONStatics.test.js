// @flow

import GeoJSONStatics from "../../src/geo/geoJSONStatics";

describe("GeoJSONStatics", () => {

	const keyField = "temp";
	const geoJSON = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"title": "feture7", "codi": 10, "temp": null}, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369]}}, {"type": "Feature", "properties": {"title": "feture6", "codi": 11, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217]}}, {"type": "Feature", "properties": {"title": "feture5", "codi": 15, "temp": 5}, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345]}}, {"type": "Feature", "properties": {"title": "feture4", "codi": 12, "temp": ""}, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457]}}, {"type": "Feature", "properties": {"title": "feture3", "codi": 16, "temp": 1}, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795]}}, {"type": "Feature", "properties": {"title": "feture2", "codi": 17, "temp": 8}, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684]}}] };

	const geoJSON2 = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"title": "feture7", "codi": 10, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369]}}, {"type": "Feature", "properties": {"title": "feture6", "codi": 11, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217]}}, {"type": "Feature", "properties": {"title": "feture5", "codi": 15, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345]}}, {"type": "Feature", "properties": {"title": "feture4", "codi": 12, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457]}}, {"type": "Feature", "properties": {"title": "feture3", "codi": 16, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795]}}, {"type": "Feature", "properties": {"title": "feture2", "codi": 17, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684]}}] };

	it("#constructor work", () => {

		expect(new GeoJSONStatics(geoJSON, keyField)).toBeInstanceOf(GeoJSONStatics);

	});

	it("#constructor throws", () => {

		expect(() => new GeoJSONStatics("pepito")).toThrow();
		expect(() => new GeoJSONStatics("pepito")).toThrowError("Invalid parameters provided: geoJSON AND keyField");

		expect(() => new GeoJSONStatics()).toThrow();
		expect(() => new GeoJSONStatics()).toThrowError("Invalid parameters provided: geoJSON AND keyField");

	});

	it("#getColumnFromGEOJSON", () => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON, keyField);

		expect(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON)).toBeInstanceOf(Array);
		expect(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON)).toBeTruthy();
		expect(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON, true)).toBeTruthy();
		expect(geoJSONStatics.getColumnFromGEOJSON(keyField, geoJSON, false)).toBeTruthy();

		expect(() => geoJSONStatics.getColumnFromGEOJSON("temp", null)).toThrowError("Invalid parameters provided: geoJSON AND keyField");

	});

	it("#getStatsFromRangesColorsGeoJSON", () => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON, keyField);
		const numRanges = 3;
		const arrayColors = ["#ffddcc", "#ccddee", "#ffff00", "#ccddee", "#ffff00"];
		const _estats = geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors);

		expect(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors)).toBeInstanceOf(Object);
		expect(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors)).toBeTruthy();

		expect(_estats.basics.max).toEqual(8);
		expect(_estats.classification.quantile).toBeInstanceOf(Array);
		expect(_estats.colors.colors).toEqual(arrayColors);

		expect(() => geoJSONStatics.getStatsFromRangesColorsGeoJSON("3", null)).toThrowError("Invalid parameters provided: numRanges or arrayColors");
		expect(() => geoJSONStatics.getStatsFromRangesColorsGeoJSON(null, arrayColors)).toThrowError("Invalid parameters provided: numRanges or arrayColors");

	});

	it("#getStatsFromRangesColorsGeoJSONOne", () => {

		const geoJSONStatics = new GeoJSONStatics(geoJSON2, keyField);
		const numRanges = 1;
		const arrayColors = ["#ffddcc"];
		const _estats = geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors);

		expect(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors)).toBeInstanceOf(Object);
		expect(geoJSONStatics.getStatsFromRangesColorsGeoJSON(numRanges, arrayColors)).toBeTruthy();

		expect(_estats.basics.max).toEqual(2);
		expect(_estats.classification.quantile).toBeInstanceOf(Array);
		expect(_estats.colors.colors).toEqual(arrayColors);

		expect(() => geoJSONStatics.getStatsFromRangesColorsGeoJSON("3", null)).toThrowError("Invalid parameters provided: numRanges or arrayColors");
		expect(() => geoJSONStatics.getStatsFromRangesColorsGeoJSON(null, arrayColors)).toThrowError("Invalid parameters provided: numRanges or arrayColors");

	});

});
