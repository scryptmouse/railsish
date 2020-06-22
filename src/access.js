import get from "lodash.get";
import isNumber from "is-number";

import { booleanize } from "./booleans";
import { isInfinite } from "./helpers";
import { isBlank } from "./presence";

/**
 * @private
 * @inner
 * @constant
 */
const NULL = Symbol("NULL");

/**
 * Get a property from `object` at `path` that
 * {@link isPresent isPresent}.
 *
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?object}
 */
export function getPresent(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || isBlank(value)) {
    return defaultValue;
  }

  return value;
}

/**
 * Extract an `Array`-typed value from `object` at `path`.
 *
 * Unlike {@link getPresentArray}, the array _can_ be blank.
 *
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?array}
 */
export function getArray(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || !Array.isArray(value)) {
    return defaultValue;
  }

  return value;
}

/**
 * Extract an `Array`-typed value from `object` at `path`.
 *
 * If the value {@link isBlank is blank}, it will return `defaultValue` instead.
 *
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?array}
 */
export function getPresentArray(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || !Array.isArray(value) || isBlank(value)) {
    return defaultValue;
  }

  return value;
}

/**
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?number}
 */
export function getPresentNumber(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || !(isNumber(value) || isInfinite(value))) {
    return defaultValue;
  }

  return typeof value === "string" ? +value : value;
}

/**
 * Retrieve a present string from an `object` at `path`.
 *
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?string}
 * @example
 * getPresentString({ foo: "\t" }, "foo", "default") === "default";
 */
export function getPresentString(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || typeof value !== "string") {
    return defaultValue;
  }

  return value;
}

/**
 * Get a boolean value from `object` at `path`.
 *
 * @see {@link booleanize}
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {boolean}
 * @example
 * // It'll booleanize a deeply-nested value
 * getBoolean({ foo: { bar: [] } }, "foo.bar") === false;
 */
export function getBoolean(object, path, defaultValue = false) {
  const value = get(object, path, NULL);

  if (value === NULL || value == null) {
    return defaultValue;
  }

  return booleanize(value);
}

/**
 * @param {*} object
 * @param {string|string[]} path
 * @param {*} defaultValue
 * @return {?function}
 */
export function getFunction(object, path, defaultValue) {
  const value = get(object, path, NULL);

  if (value === NULL || typeof value !== "function") {
    return defaultValue;
  }

  return value;
}
