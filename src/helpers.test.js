import { isDate, isInfinite, isMap, isSet } from "./helpers";

describe("isDate", () => {
  it("works with invalid dates", () => {
    expect(isDate(new Date("2020-03-32"))).toBe(true);
  });

  it("works with dates", () => {
    expect(isDate(new Date())).toBe(true);
  });
});

describe("isInfinite", () => {
  it("works with 'Infinity'", () => {
    expect(isInfinite("Infinity")).toBe(true);
  });

  it("works with '-Infinity'", () => {
    expect(isInfinite("-Infinity")).toBe(true);
  });

  it("works with numeric constants", () => {
    expect(isInfinite(-Infinity)).toBe(true);
    expect(isInfinite(Infinity)).toBe(true);
  });

  test("NaN is not finite, but it is not infinite", () => {
    expect(isInfinite(NaN)).toBe(false);
  });

  test("anything else is not infinite", () => {
    expect(isInfinite(new Date())).toBe(false);
  });
});

test("isMap works", () => {
  expect(isMap(new Map())).toBe(true);
});

test("isSet works", () => {
  expect(isSet(new Set())).toBe(true);
});
