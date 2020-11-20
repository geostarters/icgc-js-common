// @flow

import * as turf from "@turf/turf";

/**
 * Classe d'utils operacions geo
 */
export default class GeoUtils {

	static getPointInPolygonInfo(point: Array<number>, features: Array<Object>) {

		const pt = turf.point(point);
		let featData = null;
		for (const feat of features) {

			if (turf.booleanPointInPolygon(pt, feat)) {

				featData = feat;
				break;

			}

		}
		return featData;

	}

	static getPolygonIntersectPoint(point: Array<number>, features: Array<Object>) {

		const pt = turf.point(point);
		const featData = [];
		for (const feat of features) {

			if (turf.booleanPointInPolygon(pt, feat)) {

				featData.push(feat);

			}

		}
		return featData;

	}

	static toMercatorBbox(point: Array<number>) {

		const circle = turf.circle(point, 0.5);
		const bbox = turf.bbox(circle);
		const poly = turf.bboxPolygon(bbox);
		const converted = turf.toMercator(poly);
		return converted;

	}

	static unionFeatures(features: Array<Objects>) {

		const bigFeature = features.reduce((union, feature) => {

			if (union === null) {

				return feature;

			}

			return turf.union(union, feature);

		}, null);

		return bigFeature;

	}

}
