import { isBlankObject, isPresentObject } from "./presence";

describe("isBlank", () => {
  test("empty strings are blank", () => {
    expect("").toBeBlank();
    expect(" ").toBeBlank();
    expect("\t").toBeBlank();
  });

  test("0 is not blank", () => {
    expect(0).not.toBeBlank();
  });

  test("an empty array is blank", () => {
    expect([]).toBeBlank();
  });

  test("an empty typed array is blank", () => {
    expect(new Int8Array()).toBeBlank();
  });

  test("an empty object is blank", () => {
    expect({}).toBeBlank();
  });

  test("an arbitrary object is not blank", () => {
    const Foo = class {};

    const instance = new Foo();

    expect(instance).not.toBeBlank();
  });

  test("an empty function is not blank", () => {
    expect(() => {}).not.toBeBlank();
  });

  test("null is blank", () => {
    expect(null).toBeBlank();
  });

  test("undefined is blank", () => {
    expect(undefined).toBeBlank();
  });

  test("an invalid date is blank", () => {
    expect(new Date("2020-03-32")).toBeBlank();
  });

  test("an empty map is blank", () => {
    expect(new Map()).toBeBlank();
  });

  test("an empty set is blank", () => {
    expect(new Set()).toBeBlank();
  });
});

describe("isBlankObject", () => {
  test("a non-plain object is never blank", () => {
    expect(isBlankObject(new Date())).toBe(false);
    expect(isBlankObject([])).toBe(false);
    expect(isBlankObject(Object.create(null))).toBe(false);
  });

  test("a plain object with keys is not blank", () => {
    expect(isBlankObject({ foo: "bar" })).toBe(false);
  });

  test("an empty plain object is blank", () => {
    expect(isBlankObject({})).toBe(true);
  });
});

describe("isPresent", () => {
  test("an array with only blank values is present", () => {
    expect([null]).toBePresent();
  });

  test("0 is present", () => {
    expect(0).toBePresent();
  });

  test("Infinity is present", () => {
    expect(Infinity).toBePresent();
  });

  test("a map with something in it is present", () => {
    const m = new Map();

    m.set("foo", "bar");

    expect(m).toBePresent();
  });

  test("a map with something in it is present", () => {
    const m = new Set();

    m.add("foo");

    expect(m).toBePresent();
  });
});

describe("isPresentObject", () => {
  test("a non-plain object is never present", () => {
    expect(isPresentObject(new Date())).toBe(false);
    expect(isPresentObject([])).toBe(false);
    expect(isPresentObject(Object.create(null))).toBe(false);
  });

  test("a plain object with keys is present", () => {
    expect(isPresentObject({ foo: "bar" })).toBe(true);
  });

  test("an empty plain object is not present", () => {
    expect(isPresentObject({})).toBe(false);
  });
});
