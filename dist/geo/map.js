//      

/**
 * Map using the mapbox backend
 *
 * @param {string} apiKey The api key used by the map
 * @param {string} containerId The container id where the map will be drawn
 * @param {string} styleId The style id that will be used to draw the map
 */
export default class Map {

	                    
	                       
	                  
	            

	constructor(options            ) {

		this.options = options;
		this.isInitialized = false;
		this.isLoaded = false;

	}

	/**
	 * Creates the map
	 *
	 * @returns A Promise when the map has been loaded
	 */
	create()                {

		return new Promise((resolve, reject) => {

			if (this.options.container !== "") {

				this.mapCreate(resolve, reject);

			} else {

				reject(new Error("Container id not set"));

			}

		});

	}

	/**
	 * Creates the map object. Implementation specific
	 *
	 * @param {function} resolve The function to call when the map creation succeeds
	 * @param {function} reject The function to call when the map creation fails
	 */
	/* eslint-disable-next-line no-unused-vars */
	mapCreate(resolve, reject) {

		throw new Error("Map::mapCreate function must be implemented by its subclasses");

	}

	/**
	 * Function called when the map has finished loading. Subclasses must call it before
	 * setting any data
	 *
	 */
	mapHasLoaded() {

		this.isLoaded = true;

	}

	/**
	 * Removes the map from the element
	 */
	remove() {

		if (this.isInitialized) {

			this.mapRemove();

		}

	}

	/**
	 * Removes the map object. Implementation specific
	 */
	mapRemove() {

		throw new Error("Map::removeMap function must be implemented by its subclasses");

	}

	/**
	 * Sets the map options
	 *
	 * @param {MapOptions} options
	 */
	setOptions(options            ) {

		this.options = options;

	}

	/**
	 * Sets the data to draw
	 *
	 * @param {MapData} data
	 */
	setData(data         ) {

		if (this.isLoaded) {

			this.removeMapData();
			this.addMapData(data);

		} else {

			throw new Error("Map not yet loaded");

		}

	}

	/**
	 * Adds data to draw to the existing data
	 *
	 * @param {MapData} data
	 */
	addData(data         ) {

		if (this.isLoaded) {

			this.addMapData(data);

		} else {

			throw new Error("Map not yet loaded");

		}

	}

	/**
	 * Adds data to draw to the existing data. Implementation specific
	 *
	 * @param {MapData} data
	 */
	/* eslint-disable-next-line no-unused-vars */
	addMapData(data         ) {

		throw new Error("Map::addMapData function must be implemented by its subclasses");

	}

	/**
	 * Removes all the data from the map. Implementation specific
	 *
	 */
	removeMapData() {

		throw new Error("Map::removeMapData function must be implemented by its subclasses");

	}

	/**
	 * Subscribe to a map event that happens on a layer
	 *
	 * @param {string} eventName The event name
	 * @param {string} layerName The layer name
	 * @param {Function} callback The callback to run when the event arrives
	 */
	/* eslint-disable-next-line no-unused-vars */
	subscribe(eventName, layerName, callback) {

		throw new Error("Map::subscribe function must be implemented by its subclasses");

	}


	/**
	 * AddControl to map map
	 *
	 * @param {string} controlName The event name
	 * @param {object} controlOptions The layer name
	 *
	 */
	/* eslint-disable-next-line no-unused-vars */
	addControlMap(controlName, controlOptions) {

		throw new Error("Map::addControl function must be implemented by its subclasses");

	}

	/* eslint-disable-next-line no-unused-vars */
	fitBounds(bounds) {

		throw new Error("Map::fitBounds function must be implemented by its subclasses");

	}

	getZoom() {

		throw new Error("Map::getZoom function must be implemented by its subclasses");

	}

	/* eslint-disable-next-line no-unused-vars */
	easeTo(options) {

		throw new Error("Map::easeTo function must be implemented by its subclasses");


	}

	/* eslint-disable-next-line no-unused-vars */
	getPaintProperty(layerid, property) {

		throw new Error("Map::getPaintProperty function must be implemented by its subclasses");

	}

	getStyle() {

		throw new Error("Map::getStyle function must be implemented by its subclasses");

	}

	getMap() {

		return this.map;

	}


}
