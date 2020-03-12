/* eslint-disable */
// @flow
"use strict";

import Chroma from "chroma-js";
import utilsStats from "../geo/utilsStatics";

/**
 * A `Colorizator` object represents a given latitude and longitude coordinates.
 *
 * @param {number} lat Latitude, measured in degrees.
 * @param {number} lon Longitude, measured in degrees.
 * @example
 * const color = new Colorizator();
 */
export default class Colorizator {


	constructor() {

		this.palettes = ["OrRd", "BuGn", "BuPu", "GnBu", "PuBu", "PuBuGn", "PuRd", "RdPu", "YlGn",
			"YlGnBu", "YlOrBr", "YlOrRd", "BrBG", "PRGn", "PuOr", "RdGy", "RdYlBu", "RdYlGn"
		];
		this.maxBrewerPalettes = this.palettes.length - 1;
		this.maxRangsColor = 9;
		this.defaultNumber = 5;

	}

	/**
	 * Get Random color from Array
	 *
	 *
	 * @returns {string} `this`
	 */
	getRandomColorFromArray() {

		const colors = [
			"#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF",
			"#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF",
			"#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE",
			"#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD",
			"#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5",
			"#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B",
			"#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842",
			"#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"
		];
		return colors[Math.floor(Math.random() * colors.length)];

	}

	/**
	 * Get Random color hex
	 *
	 *
	 * @returns {color} `this`
	 */
	getRandomColor() {

		//return `#${Math.floor(Math.random() * 16777215).toString(16)}`;

		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {

			color += letters[Math.floor(Math.random() * 16)];

		}
		return color;

	}

	getRandomColorsFromNum(numbreColors) {

		const arrayColors = [];

		for (let i = 0; i < numbreColors; i++) {

			arrayColors.push(this.getRandomColor());

		}

		return arrayColors;

	}


	getOppositeGrayScaleColor(colorhex: string) {

		const llum = Chroma(colorhex).luminance();
		const _factor = parseFloat(1 - llum);
		let newColor = Chroma("white").luminance(_factor * 0.7).hex();


		if (_factor < 0.86) {

			newColor = "rgba(0,0,0,0.8)";


		} else if (_factor > 0.87) {

			newColor = "rgba(250,250,250,0.8)";

		}

		return newColor;

		//1 blanc
		//0 negre

	}

	/**
	 * Get Chormaarray color from brewer palette
	 * @param {number} numRangs
	 * @param {string} brewerName
	 * @returns {color} `this`
	 */

	getColorArrayfromPositionBrewer(numRangs: number, brewerPosition: number) {

		return Chroma.brewer[this.palettes[this._checkBrewerPosition(brewerPosition)]].slice(-this._checkNumRangs(numRangs));


	}


	/**
	 * Get Chormaarray form two colors
	 * @param {number} numRangs
	 * @param {string} brewerName
	 * @returns {color} `this`
	 */

	getColorsScaleRanges(numRangs: number, colorInit: string, colorEnd: string) {

		if (colorInit === null || colorEnd === null) {

			return this.getRandomColorsFromNum(numRangs);

		} else {

			return Chroma.scale([colorInit, colorEnd]).mode("lch").colors(numRangs);

		}

	}


	/**
	 * Gets de HSL contrast color from a given color
	 * @param {string} hex
	 * @returns {string} `this`
	 */	
	getHslNiceColor(hex) {
		const hsl = Chroma(hex).hsl();
		hsl[0] = (hsl[0] + 0.5) % 1; // Hue
		hsl[1] = (hsl[1] + 0.5) % 1; // Saturation
		hsl[2] = (hsl[2] + 0.5) % 1; // Luminocity
		return `hsl(${hsl[0] * 360},${hsl[1] * 100}%,${hsl[2] * 100}%)`;
	}




	_checkNumRangs(numRangs: number) {

		if (typeof numRangs === "number") {

			return numRangs > this.maxRangsColor ? this.maxRangsColor : numRangs;

		} else {

			return this.defaultNumber;

		}

	}

	_checkBrewerPosition(brewerPosition: number) {

		if (typeof brewerPosition === "number") {

			return brewerPosition > this.maxBrewerPalettes ? this.maxBrewerPalettes : brewerPosition;

		} else {

			return this.defaultNumber;

		}

	}

	_checkBrewerName(brewerName: string) {

		const _existColor = this.palettes.indexOf(brewerName) !== -1 ? brewerName : this.palettes[Math.floor(Math.random() * this.maxBrewerPalettes)];

		return _existColor;

	}


	/**
	 * Get Chormaarray color from brewer palette
	 * @param {number} numRangs
	 * @param {string} brewerName
	 * @returns {color} `this`
	 */

	getColorArrayfromSelectedBrewer(numRangs: number, brewerName: string) {

		return Chroma.brewer[this._checkBrewerName(brewerName)].slice(-this._checkNumRangs(numRangs));


	}


	convertRGBtoHex(rgb: string) {


		return Chroma(rgb).hex();

	}

	/**
	 * Get HTML palete color
	 * @param {number} numberPalettes //number  of palletes max this.maxBrewerPalettes
	 * @param {number} numRangs //number of colors for each palette max this.maxBrewerPalettes
	 * @returns {color} `this`
	 */

	generateHTMLBrewerPalettes(numberPalettes: number, numRangs: number) {

		let posY = -15;
		let html = "";
		let colors = [];
		let selected = "";


		const _subsetPalettes = this.palettes.slice(0, this._checkBrewerPosition(numberPalettes));

		_subsetPalettes.forEach((palette, i) => {


			if (Chroma.brewer[palette]) {

				colors = Chroma.brewer[palette].slice(-this._checkNumRangs(numRangs + 1));

				selected = i === 0 ? "selected" : "";

				html = `${html}<div id="${palette}" class="ramp ${palette} ${selected}"><svg width="15" height="75">`;
				posY = -15;
				colors.forEach((color) => {

					posY = posY + 15;
					html = `${html}<rect fill="${color}" width="15" height="15" y="${posY}"></rect>`;


				});
				html = `${html}</svg></div>`;


			}


		});

		return html;

	}


	/**
	 * Generate HTML legend palete color
	 * @param {array} legendRanges
	 * @param {array} legendColors
	 * @param {string} textTitol
	 * @param {string} classCSS
	 * @param {string} numRang 8
	 * @returns {color} `this`
	 */
	generateHTMLLegendColor(legendColors: Array<number>, legendRanges: Array<string>,
		textTitol: string,
		classCSS: string) {


		const _classCSS = classCSS || "legend_class";
		let html = `<div class="${_classCSS}"> <h5>${textTitol}</h5>`;

		//const _numRangs = this._checkNumRangs(legendColors.length);
		const _numRangs = legendColors.length;
		const percent = parseInt(100 / _numRangs);
		for (let index = 0; index < _numRangs; index++) {

			const textRanges = legendRanges[index];
			let textPart = "";
			let leftTextPart = "";

			if (typeof textRanges === "string" && textRanges.indexOf("-") !== -1) {

				textPart = textRanges.split("-");
				leftTextPart = this.utilsStats.converToNumberIfPossible(textPart[0].trim(), 0);

				html = `${html}<div style="float:left;width:${percent}%" class="w-15">` +
					`<div style="font-size:0.85em">${leftTextPart}`;

			} else if (!isNaN(parseInt(textRanges)) && _numRangs < this.maxRangsColor) {

				html = `${html}<div style="float:left;width:${percent}%" class="w-15">` +
					`<div style="font-size:0.85em">${textRanges}`;

			} else {

				html = `${html}<div class="uniqueValues"  class="w-15">` +
					`<div style="font-size:0.85em">${textRanges}`;

			}


			if (index === _numRangs - 1) {

				let val = legendRanges[index + 1];

				if (!val || (typeof val === "undefined")) {

					val = "";

				}


				if (typeof val == "number") {

					val = val.toFixed(1);

				}

				html = `${html}<span style="float: right;font-size:0.85em">${val}</span>`;

			}
			html = `${html}</div>`;
			html = `${html}<div style="width:100%;height:20px;border:1px solid white;background-color:${legendColors[index]}"></div></div> `;

		}
		html = `${html}</div>`;
		return html;

	}

} //end colorizator class
