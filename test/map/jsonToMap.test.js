// @flow

import JsonToMap from "../../src/map/jsonToMap";

describe("JsonToMap()", () => {

	it("#constructor", () => {

		expect(new JsonToMap()).toBeInstanceOf(JsonToMap);
		expect(new JsonToMap(null)).toBeInstanceOf(JsonToMap);

	});

	it("#getAsyncConfigJSON_Fail", async () => {

		const jsonToMap = new JsonToMap();
		await expect(jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/fake/editor_example.json")).rejects.toEqual("Request failed with status code 404");

	});

	it("#getConfigJSON", async () => {

		const jsonToMap = new JsonToMap();
		const source = await jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json");
		expect(source.vieweroptions.style).toEqual("https://tilemaps.icgc.cat/tileserver/styles/fosc.json");

	});

	it("#getAsyncSourceGeoJSON_ok", async () => {

		const jsonToMap = new JsonToMap();
		await jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json");
		expect(jsonToMap.getAsyncSourceGeoJSON()).toBeTruthy();
		await expect(jsonToMap.getAsyncSourceGeoJSON()).resolves.toBeTruthy();

	});

	it("#getAsyncConfigJSON fail", async () => {

		const jsonToMap = new JsonToMap();
		await expect(jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/fake/editor_example.json")).rejects.toContain("404");

	});

	it("#getAsyncSourceGeoJSONFromPathOK", async () => {

		const jsonToMap = new JsonToMap();
		const source = await jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json");
		expect(source.vieweroptions.initview.pitch).toEqual(45);
		const result = await jsonToMap.getAsyncSourceGeoJSONFromPath(source.vieweroptions.geojsonpath);
		expect(result.type).toEqual("FeatureCollection");

	});

	it("#getAsyncSourceGeoJSONFromPath_OK Direct", async () => {

		const jsonToMap = new JsonToMap();
		const result = await jsonToMap.getAsyncSourceGeoJSONFromPath("https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_array.geojson");
		expect(result.type).toEqual("FeatureCollection");

	});

	it("#getAsyncSourceGeoJSONFromPath_fail Direct", async () => {

		const jsonToMap = new JsonToMap();
		await expect(jsonToMap.getAsyncSourceGeoJSONFromPath("https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_array2.geojson")).rejects.toContain("404");

	});

	it("#getAsyncSourceGeoJSONFromPath_fail Null", async () => {

		const jsonToMap = new JsonToMap();
		await expect(jsonToMap.getAsyncSourceGeoJSONFromPath(null)).rejects.toBeInstanceOf(Object);
		await expect(jsonToMap.getAsyncSourceGeoJSONFromPath(null)).rejects.toMatchObject(new Error({statusCode: 100, msg: "No valid url"}));

	});

});
