// @flow

import MapStyle from "../../src/map/mapStyle";

describe("MapStyle()", () => {

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

	const urlGeoJson = "https://raw.githubusercontent.com/geostarters/test-files/master/geojson/meteodades_current_pol.geojson";

	const urlGeoJsonPOl = "https://raw.githubusercontent.com/geostarters/dades/master/Pob20k.geojson";

	it("#constructor from data object", () => {

		expect(new MapStyle(geoJSON)).toBeInstanceOf(MapStyle);
		expect(new MapStyle("pepito")).toBeInstanceOf(MapStyle);
		expect(new MapStyle(null)).toBeInstanceOf(MapStyle);

	});

	it("# from url ok", async () => {

		const mapStyler = new MapStyle();
		await mapStyler.getAsyncGeoJSON(urlGeoJson);
		expect(mapStyler.geomType).toEqual("Polygon");

	});

	it("# from url NOT Ok", async () => {

		const mapStyler = new MapStyle();
		await expect(mapStyler.getAsyncGeoJSON("http://betaserver.icgc.cat/fake.geojson")).rejects.toEqual("Network Error");
		expect(mapStyler.geomType).toBeNull();

	});

	it("#properties Constructor", () => {

		const mapStyler = new MapStyle(geoJSON);

		expect(mapStyler).toBeInstanceOf(MapStyle);
		expect(mapStyler.geomType).toEqual("Point");
		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.fieldNames).toHaveLength(3);
		expect(mapStyler.getGeomTypeFromGeoJSON()).toBeTruthy();
		expect(mapStyler.getGeomTypeFromGeoJSON()).toEqual("Point");
		expect(mapStyler.getFieldNamesColumnFromGEOJSON()).toBeTruthy();
		expect(mapStyler.getFieldNamesColumnFromGEOJSON()).toBeInstanceOf(Array);

		const mapStyler2 = new MapStyle();
		expect(mapStyler2).toBeInstanceOf(MapStyle);
		expect(mapStyler2.geomType).toBeNull();
		expect(mapStyler2.fieldNames).toBeNull();

	});

	it("#getImplementedLayerTypes", () => {

		const mapStyler = new MapStyle(geoJSON);
		expect(mapStyler.getImplementedLayerTypes()).toBeTruthy();
		expect(mapStyler.getImplementedLayerTypes()).toBeInstanceOf(Object);

		const type = mapStyler.getImplementedLayerTypes();
		expect(type.type.circle).toEqual("Point");

	});

	it("#createStyleLayerPoint", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";

		expect(mapStyler.geomType).toEqual("Point");
		expect(mapStyler.fieldNames[0].name).toEqual("codi");

		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, mapStyler.geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, mapStyler.geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("circle");

	});

	it("#createStyleLayerPolygon", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Polygon";

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("fill");

	});

	it("#createStyleLayerPolygon3D", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Polygon3D";

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("fill-extrusion");

	});

	it("#createStyleLayerline", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Line";

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("line");

	});

	it("#createStyleLayerSymbol", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "Text";

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("symbol");

	});

	it("#createStyleLayerDefauly Circle", () => {

		const mapStyler = new MapStyle(geoJSON);
		const sourceid = "test_source";
		const geomType = "pepito";

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5)).toBeTruthy();
		const layerStyle = mapStyler.createStyleLayer(sourceid, `${sourceid}_test`, mapStyler.fieldNames[0].name, geomType, 12, 8.5);
		expect(layerStyle).toBeInstanceOf(Object);
		expect(layerStyle.style.type).toEqual("circle");

	});

	it("#Predefined style", () => {

		const mapStyler = new MapStyle(geoJSON);

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.setStyleFromPreDefinedRamTemperatureHeights(mapStyler.fieldNames[0].name)).toBeTruthy();
		expect(mapStyler.setStyleFromPreDefinedRamTemperatureInterpolateHeights(mapStyler.fieldNames[0].name)).toBeTruthy();
		expect(mapStyler.setStyleFromPreDefinedRamTemperatureColor(mapStyler.fieldNames[0].name)).toBeTruthy();

	});

	it("#setStylesPaintFromRanges", () => {

		const mapStyler = new MapStyle(geoJSON);

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.generateGeoStatisticsFromField(mapStyler.fieldNames[0].name)).toBeInstanceOf(Object);
		expect(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 6, "BuGn")).toBeTruthy();
		expect(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 6, "BuGn")).toBeInstanceOf(Array);
		expect(mapStyler.setStylesPaintFromRanges(mapStyler.fieldNames[0].name, 116, "BuGn")).toBeTruthy();

	});

	it("#getExtendFromGeoJSON", () => {

		const mapStyler = new MapStyle(geoJSON);
		expect(mapStyler.getExtendFromGeoJSON()).toBeInstanceOf(Array);
		expect(mapStyler.getExtendFromGeoJSON()[0]).toEqual(2.006378173828125);

	});

	it("#setStyleTextSizeByFactorSize", () => {

		const mapStyler = new MapStyle(geoJSON);
		expect(mapStyler.setStyleTextSizeByFactorSize(13)).toBeInstanceOf(Array);

	});

	it("#setStylebyFactorHeights", () => {

		const mapStyler = new MapStyle(geoJSON);
		expect(mapStyler.setStylebyFactorHeights("codi", 11)).toBeInstanceOf(Array);

	});

	it("#setStylePaintFromUniquesValuesPOL", async () => {

		const mapStyler = new MapStyle();
		await mapStyler.getAsyncGeoJSON(urlGeoJsonPOl);
		expect(mapStyler.geomType).toEqual("Polygon");
		expect(mapStyler.setStylePaintFromUniquesValues("nomcurt", "#ffcc00", "#00ffcc")).toBeTruthy();

	});

	it("#setStylePaintFromUniquesValues", () => {

		const mapStyler = new MapStyle(geoJSON);

		expect(mapStyler.fieldNames[0].name).toEqual("codi");
		expect(mapStyler.getFieldType("codi")).toEqual("number");
		expect(mapStyler.generateGeoStatisticsFromField(mapStyler.fieldNames[0].name)).toBeInstanceOf(Object);
		expect(mapStyler.setStylePaintFromUniquesValues(mapStyler.fieldNames[0].name, "#ffcc00", "#00ffcc")).toBeTruthy();
		expect(mapStyler.setStylePaintFromUniquesValues(mapStyler.fieldNames[0].name, "#ffcc00", "#00ffcc")).toBeInstanceOf(Array);
		expect(mapStyler.haloTextColors).toBeInstanceOf(Array);

	});

});
