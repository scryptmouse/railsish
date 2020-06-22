const objToString = Object.prototype.toString;

/**
 * Slightly fancier `typeof` that relies on `Object#toString`
 * to get the constructor name.
 *
 * @private
 * @function
 * @param {*} value
 * @return {boolean}
 */
export const typeOf = (value) => objToString.call(value);

/**
 * @private
 * @function
 * @param {string} name
 * @return {function(*):boolean}
 */
export function matchesType(name) {
  const fullName = `[object ${name}]`;

  return (value) => typeOf(value) === fullName;
}

/**
 * Check if something is a `Date`.
 *
 * @private
 * @function
 * @param {?Date} value
 * @return {boolean}
 */
export const isDate = matchesType("Date");

/**
 * @private
 * @param {number|string} value
 * @return {boolean}
 */
export function isInfinite(value) {
  if (typeof value === "number") {
    return !Number.isFinite(value) && (value === Infinity || value === -Infinity);
  } else if (typeof value === "string") {
    return value === "Infinity" || value === "-Infinity";
  }

  return false;
}

/**
 * Check if a provided value is a `Map`.
 *
 * @private
 * @function
 * @param {?Map} value
 * @return {boolean}
 */
export const isMap = matchesType("Map");

/**
 * Check if a provided value is a `Set`.
 *
 * @private
 * @function
 * @param {?Set} value
 * @return {boolean}
 */
export const isSet = matchesType("Set");

/**
 * @private
 * @param {TypedArray} value
 * @return {boolean}
 */
export function isTypedArray(value) {
  if (!value || !value.buffer) {
    return false;
  }

  return !!(value.buffer instanceof ArrayBuffer && value.BYTES_PER_ELEMENT);
}
