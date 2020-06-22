import { getArray, getPresent, getPresentArray, getPresentNumber, getPresentString, getBoolean, getFunction } from "./access";

const DEFAULT = Symbol("DEFAULT");

describe("getPresent", () => {
  it("will return defaultValue on an undefined path", () => {
    expect(getPresent({}, "foo", DEFAULT)).toBe(DEFAULT);
  });

  it("will return defaultValue on a blank path", () => {
    expect(getPresent({ foo: [] }, "foo", DEFAULT)).toBe(DEFAULT);
  });

  it("will fetch a present path", () => {
    expect(getPresent({ foo: 0 }, "foo", DEFAULT)).not.toBe(DEFAULT);
  });
});

describe("getArray", () => {
  it("will return an array from a deeply-nested path", () => {
    const bar = ["baz", "quux"];

    expect(getPresentArray({ foo: { bar } }, "foo.bar", DEFAULT)).toBe(bar);
  });

  it("returns defaultValue if the path is not an array", () => {
    expect(getArray({ foo: { bar: true } }, "foo.bar", DEFAULT)).toBe(DEFAULT);
  });

  it("will return an empty array", () => {
    const bar = [];

    expect(getArray({ foo: { bar } }, "foo.bar", DEFAULT)).toBe(bar);
  });
});

describe("getPresentArray", () => {
  it("will return an array from a deeply-nested path", () => {
    const bar = ["baz", "quux"];

    expect(getPresentArray({ foo: { bar } }, "foo.bar", DEFAULT)).toBe(bar);
  });

  it("returns defaultValue if the path is not an array", () => {
    expect(getPresentArray({ foo: { bar: true } }, "foo.bar", DEFAULT)).toBe(DEFAULT);
  });

  it("will return defaultValue if the path is an empty array", () => {
    const bar = [];

    expect(getPresentArray({ foo: { bar } }, "foo.bar", DEFAULT)).toBe(DEFAULT);
  });
});

describe("getPresentNumber", () => {
  it("will return defaultValue on an undefined path", () => {
    expect(getPresentNumber({}, "foo", DEFAULT)).toBe(DEFAULT);
  });

  it("will return defaultValue on a blank path", () => {
    expect(getPresentNumber({ foo: NaN }, "foo", DEFAULT)).toBe(DEFAULT);
  });

  it("handles infinity", () => {
    expect(getPresentNumber({ foo: Infinity }, "foo", DEFAULT)).toBe(Infinity);
    expect(getPresentNumber({ foo: -Infinity }, "foo", DEFAULT)).toBe(-Infinity);
    expect(getPresentNumber({ foo: "Infinity" }, "foo", DEFAULT)).toBe(Infinity);
    expect(getPresentNumber({ foo: "-Infinity" }, "foo", DEFAULT)).toBe(-Infinity);
  });

  it("handles string representations", () => {
    expect(getPresentNumber({ foo: "-3" }, "foo", DEFAULT)).toBe(-3);
  });
});

describe("getPresentString", () => {
  it("will retrieve a present string", () => {
    expect(getPresentString({ foo: "bar" }, "foo", DEFAULT)).toEqual("bar");
  });

  it("will return defaultValue on a blank path", () => {
    expect(getPresentString({}, "foo", DEFAULT)).toBe(DEFAULT);
  });
});

describe("getBoolean", () => {
  it("retrieves the booleanized value of some path", () => {
    expect(getBoolean({ foo: 0 }, "foo", true)).toBe(false);
  });

  it("returns defaultValue on null or undefined paths", () => {
    expect(getBoolean({ foo: null }, "foo", DEFAULT)).toBe(DEFAULT);
    expect(getBoolean({}, "foo", DEFAULT)).toBe(DEFAULT);
  });

  it("defaults to false when no default provided", () => {
    expect(getBoolean({}, "foo")).toBe(false);
  });
});

describe("getFunction", () => {
  it("retrieves a function from a path", () => {
    const bar = () => "baz";

    expect(getFunction({ foo: { bar } }, "foo.bar", DEFAULT)).toBe(bar);
  });

  it("returns defaultValue if the path is not a function", () => {
    expect(getFunction({ foo: { bar: "baz" } }, "foo.bar", DEFAULT)).toBe(DEFAULT);
  });

  it("returns defaultValue on null or undefined paths", () => {
    expect(getFunction({ foo: null }, "foo", DEFAULT)).toBe(DEFAULT);
    expect(getFunction({}, "foo", DEFAULT)).toBe(DEFAULT);
  });
});
