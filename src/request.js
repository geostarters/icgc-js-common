// @flow

const axios = require("axios");

/**
 * Request functions
 */
export default class Request {

	/**
	 * Processes a request response checking if the results are ok
	 * and resolves or rejects accordingly
	 *
	 * @param {Object} response
	 */
	static processResponse(response: Object, resolve: Function, reject: Function) {

		if (response.status === 200) {

			const { data } = response;
			if (data.ok === false) {

				reject(data.message);

			} else {

				resolve(data);

			}

		} else {

			reject(response.status);

		}

	}

	static processError(err: Object, reject: Function) {

		reject(err.message);

	}

	/**
	 * Does a get request
	 *
	 * @param {string} url The URL where the get request should be made including protocol
	 */
	static get(url: string): Promise<Object> {

		return new Promise((resolve, reject) => {

			axios.get(url)
				.then(response => Request.processResponse(response, resolve, reject))
				.catch(err => Request.processError(err, reject));

		});

	}


	/**
	 * Does a get request
	 *
	 * @param {string} url The URL where the get request should be made
	 */
	static delete(url: string): Promise<Object> {

		return new Promise((resolve, reject) => {

			axios.delete(url)
				.then(response => Request.processResponse(response, resolve, reject))
				.catch(err => Request.processError(err, reject));

		});

	}


	/**
	 * Does a post request
	 *
	 * @param {string} url The URL where the post should be made
	 * @param {any} data The data to send in the post request
	 */
	static post(url: string, data: any): Promise<Object> {

		return new Promise((resolve, reject) => {

			axios.post(url, data)
				.then(response => Request.processResponse(response, resolve, reject))
				.catch(err => Request.processError(err, reject));

		});

	}

	/**
	 * Does a post request
	 *
	 * @param {string} url The URL where the post should be made
	 * @param {any} data The data to send in the post request
	 */
	static put(url: string, data: any): Promise<Object> {

		return new Promise((resolve, reject) => {

			axios.put(url, data)
				.then(response => Request.processResponse(response, resolve, reject))
				.catch(err => Request.processError(err, reject));

		});

	}

}

