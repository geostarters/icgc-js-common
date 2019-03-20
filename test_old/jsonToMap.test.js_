/* eslint-disable  */

require("flow-remove-types/register");
const test = require("tap").test;
const JsonToMap = require("../../src/map/jsonToMap");

test("JsonToMap()", (t) => {

	t.test("#constructor", (t) => {

		t.ok(new JsonToMap() instanceof JsonToMap, "creates an object");
		t.ok(new JsonToMap(null) instanceof JsonToMap, "creates an object");

		t.end();

	});


	t.test("#getAsyncConfigJSON_Fail", (t) => {

		const jsonToMap = new JsonToMap();

		t.rejects(jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/fake/editor_example.json"));
		t.end();

	});

	t.test("#getConfigJSON", (t) => {

		const jsonToMap = new JsonToMap();
		jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json").then((source) => {


			t.equal(source.vieweroptions.style, "https://tilemaps.icgc.cat/tileserver/styles/fosc.json");
			t.end();

		});

	});

	//getAsyncSourceGeoJSON


	t.test("#getAsyncSourceGeoJSON_ok", (t) => {

		const jsonToMap = new JsonToMap();
		jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json").then((source) => {

			t.ok(jsonToMap.getAsyncSourceGeoJSON());
			t.resolves(jsonToMap.getAsyncSourceGeoJSON());
			t.end();

		});

	});


	t.test("#getAsyncConfigJSON fail", (t) => {

		const jsonToMap = new JsonToMap();
		jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/fake/editor_example.json").then((source) => {

		}).catch(result => {

			//console.info(result);
			t.contains(result, "404");
			t.end();

		});

	});


	t.test("#getAsyncSourceGeoJSONFromPathOK", (t) => {

		const jsonToMap = new JsonToMap();

		jsonToMap.getAsyncConfigJSON("https://raw.githubusercontent.com/geostarters/test-files/master/config-files/editor_example.json").then((source) => {

			t.equal(source.vieweroptions.initview.pitch, 45);
			return jsonToMap.getAsyncSourceGeoJSONFromPath(source.vieweroptions.geojsonpath).then((result) => {

				t.equal(result.type, "FeatureCollection");
				t.end();

			});

		});

	});

	t.test("#getAsyncSourceGeoJSONFromPath_OK Direct", (t) => {

		const jsonToMap = new JsonToMap();

		jsonToMap.getAsyncSourceGeoJSONFromPath("https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_array.geojson").then((result) => {

			t.equal(result.type, "FeatureCollection");
			t.end();

		});

	});


	t.test("#getAsyncSourceGeoJSONFromPath_fail Direct", (t) => {

		const jsonToMap = new JsonToMap();

		jsonToMap.getAsyncSourceGeoJSONFromPath("https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_array2.geojson")
			.catch(result => {

				//t.equal(result.statusCode, 404);
				t.contains(result, "404");
				t.end();

			});


	});

	t.test("#getAsyncSourceGeoJSONFromPath_fail Null", (t) => {

		const jsonToMap = new JsonToMap();

		jsonToMap.getAsyncSourceGeoJSONFromPath(null)
			.catch(result => {

				t.equal(result.statusCode, 100);
				t.equal(result.msg, "No valid url");
				t.end();

			});


	});


	t.end();

});
