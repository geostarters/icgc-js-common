// @flow

export default class Utils {

	/**
	 *Remove the item at the specified position
	*
	* @param {array} items array.
	* @param {number} position position of the element to remove, starting from 1.
	* @returns {array} return a new array, without modifying the original
	*
	*/
	static removeItem(items, position) {

		const copyItems = [...items];
		copyItems.splice(position - 1, 1);
		return copyItems;

	}

	/**
	*Apply a function to each item of the array
	*
	* @param {array} arr array.
	* @param {function} fn function to apply to each item of the array
	*
	*/
	static async applyFunctoDataArray(arr, fn) {

		for (const item of arr) {

			await fn(item);

		}

		return null;

	}

	static invertColor(hexTripletColor) {

		let color = hexTripletColor;
		color = color.substring(1);           // remove #
		color = parseInt(color, 16);          // convert to integer
		color = 0xFFFFFF ^ color;             // invert three bytes
		color = color.toString(16);           // convert to hex
		color = `000000${color}`.slice(-6); // ("000000" + color).slice(-6); // pad with leading zeros
		color = `#${color}`; //"#" + color;                  // prepend #
		return color;

	}

	static setDifference(setA, setB) {

		const _difference = new Set(setA);
		for (const elem of setB) {

			_difference.delete(elem);

		}
		return _difference;

	}

	static arrayDifference(arrayA, arrayB) {

		const _difference = new Set(arrayA);
		for (const elem of arrayB) {

			_difference.delete(elem);

		}
		return [..._difference];

	}

	/**
	 * Check if an object is empty
	 *
	 * @param {Object} obj
	 * @returns {boolean} true in case the object is empty, false otherwise
	 */
	static isEmptyObject(obj: Object) {

		for (const key in obj) {

			if (Object.prototype.hasOwnProperty.call(obj, key)) {

				return false;

			}

		}
		return true;

	}

	/**
	 * Debounce function for more efficient event handling
	 *
	 * @param {function} fn
	 * @param {number} delay number of milisiconds of delay
	 * @returns {function} debounce function
	 */
	static debounce(fn, delay) {

		let timer = null;

		return function() {

			const context = this; // eslint-disable-line no-invalid-this
			const args = arguments; // eslint-disable-line prefer-rest-params

			clearTimeout(timer);
			timer = setTimeout(() => fn.apply(context, args), delay);

		};

	}

	/**
	 * Debounce function for more efficient event handling
	 *
	 * @param {function} fn
	 * @param {number} delay number of milisiconds of delay
	 * @param {boolean} immediate executes de function fn immediatly or not
	 * @returns {function} debounce function
	 */
	static debounceImmediate(func, wait, immediate) {

		let timeout;

		return function() {

			const context = this; // eslint-disable-line no-invalid-this
			const args = arguments; // eslint-disable-line prefer-rest-params

			// Should the function be called now? If immediate is true
			//   and not already in a timeout then the answer is: Yes
			const callNow = immediate && !timeout;

			// This is the basic debounce behaviour where you can call this
			//   function several times, but it will only execute once
			//   [before or after imposing a delay].
			//   Each time the returned function is called, the timer starts over.
			clearTimeout(timeout);

			// Set the new timeout
			timeout = setTimeout(() => {

				// Inside the timeout function, clear the timeout variable
				// which will let the next execution run when in 'immediate' mode
				timeout = null;

				// Check if the function already ran with the immediate flag
				if (!immediate) {

					// Call the original function with apply
					// apply lets you define the 'this' object as well as the arguments
					//    (both captured before setTimeout)
					func.apply(context, args);

				}

			}, wait);

			// Immediate mode and no wait timer? Execute the function..
			if (callNow) {

				func.apply(context, args);

			}

		};

	}

}
