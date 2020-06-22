import { booleanize, isPresent, isBlank, respondTo, respondToPath } from "./main";

/**
 * A collection of matchers for use with jest.
 *
 * @see {@link https://jestjs.io/docs/en/expect#expectextendmatchers expect.extend}
 * @summary A collection of matchers for use with Jest
 * @namespace
 * @static
 * @type {object}
 * @name matchers
 */
const matchers = {
  /**
   * @memberof matchers
   * @static
   * @param {*} received something to check for presence
   * @return {jestMatcherResult}
   * @example
   * expect(0).toBePresent();
   * expect([]).not.toBePresent();
   * expect(false).not.toBePresent();
   * expect("some string").toBePresent();
   * expect({}).not.toBePresent();
   * expect({ foo: "bar" }).toBePresent();
   */
  toBePresent(received, expected) {
    const { isNot, promise } = this;

    const options = {
      comment: "presence",
      isNot,
      promise,
    };

    this.utils.ensureNoExpected(expected, "toBePresent", options);

    const pass = isPresent(received);

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("toBePresent", undefined, undefined, options) +
      "\n\n" +
      `Expected: ${this.utils.printExpected(!isNot)}\n` +
      `Received: isPresent(${this.utils.printReceived(received)})`
    );

    return { pass, message };
  },

  /**
   * @memberof matchers
   * @static
   * @param {*} received something to check for blankness
   * @return {jestMatcherResult}
   * @example
   * expect(0).not.toBeBlank();
   * expect([]).toBeBlank();
   * expect({}).toBeBlank();
   * expect(NaN).toBeBlank();
   * expect(Infinity).not.toBeBlank();
   * expect("\t\n\t").toBeBlank();
   */
  toBeBlank(received, expected) {
    const { isNot, promise } = this;

    const options = {
      comment: "blankness",
      isNot,
      promise,
    };

    this.utils.ensureNoExpected(expected, "toBeBlank", options);

    const pass = isBlank(received);

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("toBeBlank", undefined, undefined, options) +
      "\n\n" +
      `Expected: ${this.utils.printExpected(!isNot)}\n` +
      `Received: isBlank(${this.utils.printReceived(received)})`
    );

    return { pass, message };
  },

  /**
   * Test a value to see how it booleanizes.
   *
   * @memberof matchers
   * @static
   * @see {@link booleanize}
   * @param {*} received something to `booleanize`
   * @param {boolean} expected the value that `booleanize` should evaluate to
   * @return {jestMatcherResult}
   * @example
   * expect("some text").toBooleanizeAs(true);
   * expect([]).toBooleanizeAs(false);
   */
  toBooleanizeAs(received, expected) {
    const { isNot, promise } = this;

    const value = Boolean(expected);

    const options = {
      comment: "booleanization",
      isNot,
      promise,
    };

    const pass = booleanize(received) === value;

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("booleanize", undefined, undefined, options) +
      "\n\n" +
      `Expected: ${this.utils.printExpected(isNot ? !value : value)}\n` +
      `Received: booleanize(${this.utils.printReceived(received)})`
      );

    return { pass, message };
  },

  /**
   * A wrapper around {@link #matcherstobooleanizeas matchers.toBooleanizeAs} with `expected` set to `false`.
   *
   * @memberof matchers
   * @static
   * @see {@link booleanize}
   * @param {*} received something to `booleanize`
   * @return {jestMatcherResult}
   * @example
   * expect("some text").toBooleanizeTrue();
   * expect([]).not.toBooleanizeTrue();
   */
  toBooleanizeTrue(received, expected) {
    const { isNot } = this;

    this.utils.ensureNoExpected(expected, "toBooleanizeTrue", { comment: "booleanization", isNot });

    return toBooleanizeAs.call(this, received, true);
  },

  /**
   * A wrapper around {@link #matcherstobooleanizeas matchers.toBooleanizeAs} with `expected` set to `false`.
   *
   * @memberof matchers
   * @static
   * @see {@link booleanize}
   * @param {*} received something to `booleanize`
   * @return {jestMatcherResult}
   * @example
   * expect("some text").not.toBooleanizeFalse();
   * expect([]).toBooleanizeFalse();
   */
  toBooleanizeFalse(received, expected) {
    const { isNot } = this;

    this.utils.ensureNoExpected(expected, "toBooleanizeFalse", { comment: "booleanization", isNot });

    return toBooleanizeAs.call(this, received, false);
  },

  /**
   * @memberof matchers
   * @static
   * @see {@link respondTo}
   * @param {*} received something that might have a function
   * @param {string} expected a function name
   * @return {jestMatcherResult}
   * @example
   * expect(new Date()).toRespondTo("toISOString");
   */
  toRespondTo(received, expected) {
    const { isNot, promise } = this;

    const options = {
      comment: "implements",
      isNot,
      promise,
    };

    const pass = respondTo(received, expected);

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("toRespondTo", undefined, undefined, options) +
      "\n\n" +
      `Expected ${this.utils.printReceived(received)}\nto have a function named ${this.utils.printExpected(expected)}`
    );

    return { pass, message };
  },

  /**
   * @memberof matchers
   * @static
   * @see {@link respondToPath}
   * @param {*} received something that might have a function
   * @param {string|string[]} expected a path to a function
   * @return {jestMatcherResult}
   * @example
   * expect({ foo: { bar: { baz: () => "quux" } } }).toRespondToPath("foo.bar.baz");
   */
  toRespondToPath(received, expected) {
    const { isNot, promise } = this;

    const options = {
      comment: "implements",
      isNot,
      promise,
    };

    const pass = respondToPath(received, expected);

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("toRespondToPath", undefined, undefined, options) +
      "\n\n" +
      `Expected ${this.utils.printReceived(received)}\nto have a function at path ${this.utils.printExpected(expected)}`
    );

    return { pass, message };
  },
};

/**
 * @ignore
 */
const { toBooleanizeAs } = matchers;

export { matchers };

/**
 * Install the associated `matchers` into your
 * jest environment to have presence, blankness, booleanization, and response helpers.
 *
 * @example
 * // in a file called by "setupFilesAfterEnv":
 * import { install } from "railsish/jest-matchers"
 *
 * install(expect);
 *
 * @public
 * @see {@link https://jestjs.io/docs/en/expect#expectextendmatchers expect.extend}
 * @param {object} expect jest's global `expect` method
 * @param {function} expect.extend the function that will accept the jest matchers
 * @return {void}
 */
export function install(expect) {
  expect.extend(matchers);
}

export default matchers;

/**
 * An interface returned from a jest matcher.
 *
 * @name jestMatcherResult
 * @interface jestMatcherResult
 * @property {boolean} pass whether or not the matcher passed
 * @property {function(void): string} message a function that takes no args and returns a string representing the reason for the failure, if applicable
 */
