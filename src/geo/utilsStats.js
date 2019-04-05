// @flow


/**
 * Classe d'utils dades estadístiques
 */
export default class UtilsStats {


	static forceToNumber(valor) {

		if (!isNaN(parseFloat(valor)) && typeof (valor) === "string") {

			valor = valor.replace(",", ".");
			valor = parseFloat(valor);

		} else if ((typeof (valor) !== "number") || (valor === "undefined")) {

			valor = -100;

		}


		return valor;

	}

	static checkArrayValues(arrayColumn) {

		const newArray = [];
		for (let i = 0; i < arrayColumn.length; i++) {

			if (this.checkIfExistsValue(arrayColumn[i])) {

				newArray.push(arrayColumn[i]);

			}

		}
		return newArray;

	}

	static converToNumberIfPossible(valor, decimals) {

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

	static checkType(value) {

		return typeof value;

	}

	static checkIfExistsValue(value) {

		if (typeof value !== "undefined" &&
			value !== null &&
			value !== "null" &&
			value !== "") {

			return true;

		} else {

			return false;

		}


	}


}

