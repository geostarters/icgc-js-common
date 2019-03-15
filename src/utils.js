// @flow

class Utils {

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

}
module.exports = Utils;
