// Adaption from https://github.com/mapbox/polyline/blob/master/src/polyline.js

/** biome-ignore-all lint/nursery/noIncrementDecrement: TODO */
/** biome-ignore-all lint/suspicious/noBitwiseOperators: TODO */

/**
 * Decodes to a [latitude, longitude] coordinates array.
 *
 * This is adapted from the implementation in Project-OSRM.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Array}
 *
 * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */

export const decode = (str: string, precision = 5): [number, number][] => {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: [number, number][] = [];
  let shift = 0;
  let result = 0;
  let byte: number | null = null;
  let latitude_change: number;
  let longitude_change: number;
  const factor = 10 ** precision;

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {
    // Reset shift, result, and byte
    byte = null;
    shift = 1;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result += (byte & 0x1f) * shift;
      shift *= 32;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? (-result - 1) / 2 : result / 2;

    shift = 1;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result += (byte & 0x1f) * shift;
      shift *= 32;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? (-result - 1) / 2 : result / 2;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
};
