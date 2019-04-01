/* eslint-disable  */

require("flow-remove-types/register");
const test = require("tap").test;
const MapStyle = require("../../src/map/mapStyle");


test("MapStyle()", (t) => {

	const geoJSON = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"properties": {
				"title": "feture7",
				"codi": 10,
				"temp": 2
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.33184814453125, 41.76926321969369]
			}
		}, {
			"type": "Feature",
			"properties": {
				"title": "feture6",
				"codi": 11,
				"temp": 2
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.2686767578125, 41.78014491449217]
			}
		}, {
			"type": "Feature",
			"properties": {
				"title": "feture5",
				"codi": 15,
				"temp": 5
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.2703933715820312, 41.725717979972345]
			}
		}, {
			"type": "Feature",
			"properties": {
				"title": "feture4",
				"codi": 12,
				"temp": ""
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.346096038818359, 41.74698199279457]
			}
		}, {
			"type": "Feature",
			"properties": {
				"title": "feture3",
				"codi": 16,
				"temp": 1
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.137527465820312, 41.929868314485795]
			}
		}, {
			"type": "Feature",
			"properties": {
				"title": "feture2",
				"codi": 17,
				"temp": 8
			},
			"geometry": {
				"type": "Point",
				"coordinates": [2.006378173828125, 41.707266387090684]
			}
		}]
	};

	//const geoJSON2 = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"title": "feture7", "codi": 10, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.33184814453125, 41.76926321969369]}}, {"type": "Feature", "properties": {"title": "feture6", "codi": 11, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2686767578125, 41.78014491449217]}}, {"type": "Feature", "properties": {"title": "feture5", "codi": 15, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.2703933715820312, 41.725717979972345]}}, {"type": "Feature", "properties": {"title": "feture4", "codi": 12, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.346096038818359, 41.74698199279457]}}, {"type": "Feature", "properties": {"title": "feture3", "codi": 16, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.137527465820312, 41.929868314485795]}}, {"type": "Feature", "properties": {"title": "feture2", "codi": 17, "temp": 2}, "geometry": {"type": "Point", "coordinates": [2.006378173828125, 41.707266387090684]}}] };

	//const urlGeoJson2 = "https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_array.geojson";

	const urlGeoJson = "https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_current_pol.geojson";

	const urlGeoJsonPOl = "https://raw.githubusercontent.com/geostarters/dades/master/Pob20k.geojson";

	t.test("#constructor from data object", (t) => {

		t.ok(new MapStyle(geoJSON) instanceof MapStyle, "creates an object");
		t.ok(new MapStyle("pepito") instanceof MapStyle, "creates an object");
		t.ok(new MapStyle(null) instanceof MapStyle, "creates an object");


		t.end();

	});

	t.test("# from url ok", (t) => {

		const mapStyler = new MapStyle();
		mapStyler.getAsyncGeoJSON(urlGeoJson).then((result) => {

			//console.info(mapStyler.fieldNames);
			//t.equal(result.statusCode, 200);
			t.equal(mapStyler.geomType, "Polygon");
			t.end();

		}).catch(result => {


			//t.equal(result.statusCode, 404);
			//t.equal(mapStyler.geomType, null);
			//t.end();

		});


	});

	t.test("# from url NOT Ok", (t) => {

		const mapStyler = new MapStyle();

		mapStyler.getAsyncGeoJSON("http://betaserver.icgc.cat/fake.geojson").then((result) => {}).catch(result => {

			t.contains(result, "404");
			t.equal(mapStyler.geomType, null);
			t.end();

		});


	});

	t.test("#properties Constructor", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.ok(mapStyler instanceof MapStyle, "creates an object");
		t.equal(mapStyler.geomType, "Point");


		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.equal(mapStyler.fieldNames.length, 3);
		t.ok(mapStyler.getGeomTypeFromGeoJSON());
		t.equal(mapStyler.getGeomTypeFromGeoJSON(), "Point");
		t.ok(mapStyler.getFieldNamesColumnFromGEOJSON());
		t.type(mapStyler.getFieldNamesColumnFromGEOJSON(), Array);

		const mapStyler2 = new MapStyle();
		t.ok(mapStyler2 instanceof MapStyle, "creates an object");
		t.equal(mapStyler2.geomType, null);
		t.equal(mapStyler2.fieldNames, null);


		t.end();

	});
	//getImplementedLayerTypes

	t.test("#getImplementedLayerTypes", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.ok(mapStyler.getImplementedLayerTypes());
		t.type(mapStyler.getImplementedLayerTypes(), Object);
		const type = mapStyler.getImplementedLayerTypes();
		t.equal(type.type.circle, "Point");
		t.end();

	});


	t.test("#createStyleLayerPoint", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";

		t.equal(mapStyler.geomType, "Point");
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, mapStyler.geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, mapStyler.geomType, 12, 8.5);
		t.type(layerStyle, Object);
		//console.info(layerStyle);
		t.equal(layerStyle.style.type, "circle");
		t.end();

	});

	t.test("#createStyleLayerPolygon", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Polygon";
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		t.type(layerStyle, Object);
		t.equal(layerStyle.style.type, "fill");
		t.end();

	});

	t.test("#createStyleLayerPolygon3D", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Polygon3D";
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		t.type(layerStyle, Object);
		t.equal(layerStyle.style.type, "fill-extrusion");
		t.end();

	});

	t.test("#createStyleLayerline", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Line";
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		t.type(layerStyle, Object);
		t.equal(layerStyle.style.type, "line");
		t.end();

	});

	t.test("#createStyleLayerSymbol", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Text";
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		t.type(layerStyle, Object);
		t.equal(layerStyle.style.type, "symbol");
		t.end();

	});

	t.test("#createStyleLayerDefauly Circle", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "pepito";
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5));
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		t.type(layerStyle, Object);
		t.equal(layerStyle.style.type, "circle");
		t.end();

	});

	t.test("#Predefined style", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.ok(mapStyler.setStyleFromPreDefinedRamTemperatureHeights(mapStyler.fieldNames[0].name));
		t.ok(mapStyler.setStyleFromPreDefinedRamTemperatureInterpolateHeights(mapStyler.fieldNames[0].name));
		t.ok(mapStyler.setStyleFromPreDefinedRamTemperatureColor(mapStyler.fieldNames[0].name));
		t.end();

	});


	//mapStyler.setStylesPaintFromRanges("temp",6, "BuGn")

	t.test("#setStylesPaintFromRanges", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.type(mapStyler.generateGeoStatisticsFromField(mapStyler.fieldNames[0].name), Object);
		t.ok(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 6, "BuGn"));
		t.type(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 6, "BuGn"), Array);
		t.ok(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 116, "BuGn"));
		const layerStyle = mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 6, "Pepito");
		t.end();

	});

	t.test("#getExtendFromGeoJSON", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.type(mapStyler.getExtendFromGeoJSON(), Array);
		t.equal(mapStyler.getExtendFromGeoJSON()[0], 2.006378173828125);
		t.end();

	});


	t.test("#setStyleTextSizeByFactorSize", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		//	console.info(mapStyler.setStyleTextSizeByFactorSize(13));
		t.type(mapStyler.setStyleTextSizeByFactorSize(13), Array);
		//t.equal(mapStyler.getExtendFromGeoJSON()[0], 2.006378173828125);
		t.end();

	});


	t.test("#setStylebyFactorHeights", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		//console.info(mapStyler.setStylebyFactorHeights("codi", 11));
		t.type(mapStyler.setStylebyFactorHeights("codi", 11), Array);
		//setStylesFromPredefinedScales(tematicField: string, scaleName: string) ;
		t.end();

	});


	t.test("#setStylePaintFromUniquesValuesPOL", (t) => {


		const mapStyler = new MapStyle();

		mapStyler.getAsyncGeoJSON(urlGeoJsonPOl).then((result) => {

			//console.info(mapStyler.fieldNames);
			//t.equal(result.statusCode, 200);
			t.equal(mapStyler.geomType, "Polygon");

			//t.type(mapStyler.generateGeoStatisticsFromField("nomcurt"), Object);
			//	console.info(mapStyler.setStylePaintFromUniquesValues("nomcurt", "#ffcc00", "#00ffcc"));
			t.ok(mapStyler.setStylePaintFromUniquesValues("nomcurt", "#ffcc00", "#00ffcc"));
			t.end();

		}).catch(result => {

			console.info(result);
			//t.equal(result.statusCode, 404);
			//t.equal(mapStyler.geomType, null);
			//t.end();

		});


	});


	t.test("#setStylePaintFromUniquesValues", (t) => {

		const mapStyler = new MapStyle(geoJSON);
		t.equal(mapStyler.fieldNames[0].name, "codi");
		t.equal(mapStyler.getFieldType("codi"), "number");
		t.type(mapStyler.generateGeoStatisticsFromField(mapStyler.fieldNames[0].name), Object);
		t.ok(mapStyler.setStylePaintFromUniquesValues(mapStyler.fieldNames[0].name, "#ffcc00", "#00ffcc"));
		t.type(mapStyler.setStylePaintFromUniquesValues(mapStyler.fieldNames[0].name, "#ffcc00", "#00ffcc"), Array);
		t.type(mapStyler.haloTextColors, Array);
		const layerStyle = mapStyler.setStylePaintFromUniquesValues(mapStyler.fieldNames[0].name, "#ffcc00", "#00ffcc");
		t.end();


	});

	t.end();

});
