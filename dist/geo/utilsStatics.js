//      


/**
 * A `UtilsStatics` object represents a.
 *
 * @example
 * var utils = new UtilsStatics();
 */
export default class UtilsStatics {


	constructor() {}

	forceToNumber(valor) {

		if (!isNaN(parseFloat(valor)) && typeof (valor) === "string") {

			valor = valor.replace(",", ".");
			valor = parseFloat(valor);

		} else if ((typeof (valor) !== "number") || (valor === "undefined")) {

			valor = -100;

		}


		return valor;

	}

	checkArrayValues(arrayColumn) {

		const newArray = [];
		for (let i = 0; i < arrayColumn.length; i++) {

			if (this.checkIfExistsValue(arrayColumn[i])) {

				newArray.push(arrayColumn[i]);

			}

		}
		return newArray;

	}

	converToNumberIfPossible(valor, decimals) {

		const precision = decimals || 0;
		let _newValor = valor;


		if (!isNaN(parseFloat(valor)) && typeof (valor) === "string") {

			_newValor = valor.replace(",", ".");
			_newValor = parseFloat(valor).toFixed(precision);

		} else if ((typeof (valor) !== "number") || (valor === "undefined")) {

			_newValor = valor;

		}


		return _newValor;


	}

	checkType(value) {

		return typeof value;

	}

	checkIfExistsValue(value) {

		if (typeof value !== "undefined" &&
			value !== null &&
			value !== "null" &&
			value !== "") {

			return true;

		} else {

			return false;

		}


	}


} //ebd class

