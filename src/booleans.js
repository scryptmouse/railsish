import isPlainObject from "is-plain-object";
import { isTypedArray } from "./helpers";
import { isBlankObject, isPresent } from "./presence";

/**
 * Convert a provided value to a boolean with some handy logic.
 *
 * This is used to handle cases where the value _should_ be a
 * boolean, but might be coming from an API or some other representation
 * that is not explicitly `true` / `false`
 *
 * @example
 * booleanize(0) === false
 * booleanize("0") == false
 * // an empty object
 * booleanize({}) === false
 * // an empty array
 * booleanize([]) === false
 * booleanize(new Int8Array()) === false
 * // an empty string
 * booleanize("") === false
 * // a string that's only whitespace
 * booleanize("    ") === false
 * // special string handling: the following are case-insensitive
 * booleanize("F") === false
 * booleanize("n") === false
 * booleanize("no") === false
 * booleanize("nil") === false
 * booleanize("NULL") === false
 * booleanize("FALSE") === false
 *
 * @public
 * @param {*} value something to convert
 * @return {boolean} the booleanized value
 */
export function booleanize(value) {
  if (value === true || value === false) {
    return value;
  }

  if (value == null) {
    return false;
  }

  if (typeof value === "number") {
    if (isFinite(value)) {
      return value !== 0;
    }

    return !Number.isNaN(value);
  }

  if (typeof value === "string") {
    if (value.length === 0 || /^(?:0|f(?:alse)?|n(?:o(?:ne)?)?|nil|null|off|\s+)$/i.test(value)) {
      return false;
    }

    return true;
  }

  if (Array.isArray(value) || isTypedArray(value)) {
    return value.length > 0;
  }

  if (isPlainObject(value)) {
    return !isBlankObject(value);
  }

  return isPresent(value);
}
