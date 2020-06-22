import * as mod from "./main";

expect.extend({
  toExport(received, expected) {
    const { isNot, promise } = this;

    const options = {
      comment: "ECMA2015 module exports",
      isNot,
      promise,
    };

    const pass = typeof received[expected] === "function";

    // prettier-ignore
    const message = () => (
      this.utils.matcherHint("booleanize", undefined, undefined, options) +
      "\n\n" +
      `Expected ${this.utils.printReceived(received)} to export ${this.utils.printExpected(expected)}`
    );

    return { pass, message };
  },
});

const EXPORT_NAMES = [
  "getArray",
  "getPresent",
  "getPresentArray",
  "getPresentNumber",
  "getPresentString",
  "getBoolean",
  "getFunction",
  "booleanize",
  "respondTo",
  "respondToPath",
  "isBlank",
  "isBlankObject",
  "isPresent",
  "isPresentObject",
];

for (const exportName of EXPORT_NAMES) {
  it(`exports ${exportName}`, () => {
    expect(mod).toExport(exportName);
  });
}
