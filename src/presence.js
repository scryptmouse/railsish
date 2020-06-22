import isPlainObject from "is-plain-object";

import { isDate, isInfinite, isMap, isSet, isTypedArray } from "./helpers";

const hasProp = Object.prototype.hasOwnProperty;

/**
 * Check to see if a given value is "blank", translated from Rails' standards
 * into JavaScript.
 *
 * Certain values are truthy in JS that are considered blank by this function, namely:
 * * A string containing only whitespace, e.g. `"\n\t  \r\n"`
 * * An empty array
 * * An empty plain object, e.g. `{}`
 * * An empty `Map` or `Set`
 * * An invalid `Date` object, e.g. `new Date("2020-03-32")`
 *
 * Additionally, `0` is considered false but is _not_ considered blank,
 * as it is a finite number.
 *
 * @public
 * @see {@link https://guides.rubyonrails.org/active_support_core_extensions.html#blank-questionmark-and-present-questionmark Object#blank?} from Rails
 * @param {*} value
 * @return {boolean}
 */
export function isBlank(value) {
  if (value == null || value === false) {
    return true;
  }

  if (typeof value === "string") {
    return value.length === 0 || !/\S/.test(value);
  }

  if (typeof value === "number") {
    return !(Number.isFinite(value) || isInfinite(value));
  }

  if (isDate(value)) {
    return !Number.isFinite(+value);
  }

  if (Array.isArray(value) || isTypedArray(value)) {
    return value.length === 0;
  }

  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }

  if (isPlainObject(value)) {
    return isBlankObject(value);
  }

  return false;
}

/**
 * Check to see if a given value is "present", translated from Rails' standards
 * into JavaScript.
 *
 * It is a boolean complement of {@linkcode module:railsish/presence.isBlank isBlank}.
 * Simply put, if an object is not blank, it is considered present.
 *
 * @public
 * @see {@link https://guides.rubyonrails.org/active_support_core_extensions.html#blank-questionmark-and-present-questionmark Object#present?} from Rails
 * @param {*} value
 * @return {boolean}
 */
export function isPresent(value) {
  return !isBlank(value);
}

/**
 * Test if a provided object is a blank, plain object.
 *
 * @example
 * isBlankObject({}) === true
 * isBlankObject({ foo: "bar" }) === false
 * isBlankObject([]) === false
 * isBlankObject(new Foo()) === false
 * isBlankObject(Object.create(null)) === false
 *
 * @public
 * @param {object} value
 * @return {boolean}
 */
export function isBlankObject(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  for (const prop in value) {
    /* istanbul ignore else */
    if (hasProp.call(value, prop)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if a provided `value` is a plain object with at least 1 key set.
 *
 * @note Boolean complement of `isBlankObject`.
 *
 * @example
 * isPresentObject({}) === false
 * isPresentObject({ foo: "bar" }) === true
 * isPresentObject([]) === false
 * isPresentObject(new Foo()) === false
 * isPresentObject(Object.create(null)) === false
 *
 * @public
 * @param {*} value
 * @return {boolean}
 */
export function isPresentObject(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  for (const prop in value) {
    /* istanbul ignore else */
    if (hasProp.call(value, prop)) {
      return true;
    }
  }

  return false;
}
