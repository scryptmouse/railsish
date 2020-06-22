import { respondTo } from "./duck-typing";

describe("respondTo", () => {
  it("works as expected", () => {
    expect({ foo: () => "bar" }).toRespondTo("foo");
  });

  it("handles null objects", () => {
    expect(respondTo(null, "name")).toBe(false);
  });

  it("handles empty names", () => {
    expect(respondTo({}, "")).toBe(false);
  });
});

describe("respondToPath", () => {
  it("works as expected", () => {
    expect({ foo: { bar: { baz: () => "quux" } } }).toRespondToPath("foo.bar.baz");
  });

  it("accepts an array", () => {
    expect({ foo: { bar: { baz: () => "quux" } } }).toRespondToPath(["foo", "bar", "baz"]);
  });
});
