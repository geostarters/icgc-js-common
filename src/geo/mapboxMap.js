// @flow

import Map from "./map.js";

/**
 * Map using the mapbox backend
 *
 * @param {string} apiKey The api key used by the map
 * @param {string} containerId The container id where the map will be drawn
 * @param {string} styleId The style id that will be used to draw the map
 */
export default class MapboxMap extends Map {

	apiKey: string;
	layerIds: Object;
	sourceIds: Object;

	static ATTRIBUTION_CONTROL: 1;
	static POPUP_CONTROL: 2;
	static ZOOM_CONTROL: 3;

	constructor(mapboxObject: Object, apiKey: ?string, options: ?MapOptions) {

		const defaultParameters = {
			container: "",
			style: "https://tilemaps.icgc.cat/tileserver/styles/water.json",
			center: [1.60859, 41.7554],
			zoom: 6
		};

		super(Object.assign(defaultParameters, options));

		this.apiKey = apiKey || "";
		this.layerIds = {};
		this.sourceIds = {};
		this.mapboxObject = mapboxObject;

	}

	/**
	 * Creates the map. Do not call directly
	 *
	 * @param {function} resolve The function to call when the map creation succeeds
	 * @param {function} reject The function to call when the map creation fails
	 *
	 * @see Map::create
	 */
	mapCreate(resolve) {

		this.mapboxObject.accessToken = this.apiKey;
		this.map = new this.mapboxObject.Map(this.options);
		this.isInitialized = true;
		this.map.on("load", () => {

			super.mapHasLoaded();
			resolve();

		});

	}

	/**
	 * Removes the map from the element. Do not call directly
	 *
	 * @see Map::remove
	 */
	mapRemove() {

		this.map.remove();

	}


	/**
	 * Adds data to draw to the map. Do not call directly
	 *
	 * @param {MapData} data
	 * @see Map::addData
	 */
	addMapData(data: MapData) {

		data.sources.forEach(source => {

			this.map.addSource(source.name, source.data);
			this.sourceIds[source.name] = "";

		});

		data.layers.forEach(layer => {

			this.map.addLayer(layer);
			this.layerIds[layer.id] = "";

		});

	}

	/**
	 * Removes all the data from the map. Implementation specific
	 *
	 */
	async removeMapData() {

		/* Object.keys(this.layerIds).forEach(layer => {

			this.map.removeLayer(layer);

		}); */

		await this.removeDataArray(Object.keys(this.layerIds), this.map.removeLayer);

		this.layerIds = {};

		/* Object.keys(this.sourceIds).forEach(source => {

			this.map.removeSource(source);

		}); */

		await this.removeDataArray(Object.keys(this.sourceIds), this.map.removeSource);

		this.sourceIds = {};

	}


	removeDataArray(arr, fn) {

		return new Promise((resolve) =>{

			for (const item of arr) {

				fn(item);

			}

			resolve();

		});

	}

	/**
	 * Checks if the sourceName exists in the map
	 *
	 */
	hasSourceName(sourceName) {

		return !!this.sourceIds[sourceName];

	}

	/**
	 * Checks if the layerID exists in the map
	 *
	 */
	hasLayerID(layerID) {

		return !!this.layerIds[layerID];

	}


	/**
	 * Return the style map.
	 *
	 * @see Map::getStyle
	 */

	getStyle() {

		return this.map.getStyle();

	}


	/**
	 * Return mapStyle.
	 *
	 * @param {layerid} layerid
	 * @param {property} property
	 * @see Map::getPaintProperty
	 */

	getPaintProperty(layerid: string, property: string) {


		return this.map.getPaintProperty(layerid, property);


	}

	/**
	 * Sets the data to draw. Do not call directly
	 *
	 * @param {baseLayr} url
	 * @see Map::setMapBaseLayer
	 */
	setMapBaseLayer(baseLayerURL: string) {

		return new Promise((resolve) => {

			this.map.setStyle(baseLayerURL);
			this.map.on("styledata", (data) => {

				this.layerIds = {};
				this.sourceIds = {};

				if (data.dataType === "style") {

					resolve();

				}

			});

		});

	}

	/**
	 * Fit a map to a bounding box
	 *
	 * @param {bbox} Array "bbox":"1.079053,41.290767,1.104497,41.308387"
	 */
	fitBBOX(bbox, pitch = 0) {

		const lngLatBounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];

		this.map.fitBounds(lngLatBounds, {pitch});

	}

	fitBounds(bounds: array) {

		this.map.fitBounds(bounds);

	}

	getZoom() {

		return	this.map.getZoom();

	}

	getPitch() {

		return	this.map.getPitch();

	}

	getBearing() {

		return	this.map.getBearing();

	}

	getBounds() {

		return	this.map.getBounds();

	}

	getCenter() {

		return	this.map.getCenter();

	}

	easeTo(options) {

		this.map.easeTo(options);

	}


	getLayer(id: string) {

		return this.map.getLayer(id);

	}

	setCursorPointer(pointer: string) {

		this.map.getCanvas().style.cursor = pointer;

	}


	removeLayer(id) {

		if (this.map.getLayer(id)) {

			this.map.removeLayer(id);

		}

	}

	removeSource(id) {

		if (this.map.getSource(id)) {

			this.map.removeSource(id);

		}

	}

	addSource(id, source) {

		this.map.addSource(id, source);

	}

	addLayer(layer, before) {

		this.map.addLayer(layer, before);

	}

	setPaintProperty(layer, property, data) {

		if (this.map.getPaintProperty(layer, property)) {

			this.map.setPaintProperty(layer, property, data);

		}

	}

	setLayoutProperty(layer, property, data) {

		if (this.map.getLayoutProperty(layer, property)) {

			this.map.setLayoutProperty(layer, property, data);

		}

	}


	/**
	 * SetFilters
	 *
	 *
	 */
	setFilter(layer, filter) {

		this.map.setFilter(layer, filter);

	}

	/**
	 * return filter getFilter
	 *
	 *
	 */

	getFilter(layer) {

		return this.map.getFilter(layer);

	}

	updateLayer(layer: object) {

		if (this.map.getLayer(layer.id)) {

			this.map.removeLayer(layer.id);
			this.map.addLayer(layer);

		} else {

			this.map.addLayer(layer);

		}

	}

	/**
	 * Sets the API key used by the map
	 *
	 * @param {string} apiKey
	 */
	setAPIKey(apiKey: string) {

		this.apiKey = apiKey;

	}

	/**
	 * Subscribe to a map event that happens on a layer
	 *
	 * @param {string} eventName The event name
	 * @param {string} layerName The layer name
	 * @param {Function} callback The callback to run when the event arrives
	 */
	subscribe(eventName, layerName, callback) {

		if (layerName.trim() !== "") {

			this.map.on(eventName, layerName, (e) => callback(e, layerName));

		} else {

			this.map.on(eventName, (e) => callback(e));

		}

	}

	addControlMap(control, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') {

		this.map.addControl(control, position);

	}


	/**
	 * Queries the rendered features in a point or a bbox
	 *
	 * @param {(PointLike | Array<PointLike>)?} place
	 * @param {string} layer
	 */
	queryRenderedFeatures(place, layer) {

		return this.map.queryRenderedFeatures(place, {layers: [layer]});

	}

	/**
	 * Changes the cursor type
	 *
	 * @param {string} name
	 */
	setCursor(name) {

		this.map.getCanvas().style.cursor = name;

	}

}
