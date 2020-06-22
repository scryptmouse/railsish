import get from "lodash.get";

/**
 * A duck-typing method to check if a property on `object` named `name` is a function.
 *
 * @see {@link https://ruby-doc.org/core-2.7.1/Object.html#method-i-respond_to-3F Object#respond_to?} from Ruby
 * @param {*} object an object
 * @param {string} name a function name
 * @return {boolean} whether `typeof object[name] === "function"`
 */
export function respondTo(object, name) {
  if (!object || !name) {
    return false;
  }

  return typeof object[name] === "function";
}

/**
 * A duck-typing method to check if a property on `object` at the provided `path` is a function.
 *
 * Similar to `respondTo`, but allows you to use an arbitrarily nested path.
 *
 * @see {@link https://ruby-doc.org/core-2.7.1/Object.html#method-i-respond_to-3F Object#respond_to?} from Ruby
 * @param {*} object an object
 * @param {string|array<number,string>} path a path to a possible function à la `lodash.get`
 * @return {boolean} whether `typeof get(object, path) === "function"`
 */
export function respondToPath(object, path) {
  const maybeFunc = get(object, path);

  return typeof maybeFunc === "function";
}
