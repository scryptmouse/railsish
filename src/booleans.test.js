describe("booleanize", () => {
  it("treats a non-zero number as true", () => {
    expect(1).toBooleanizeTrue();
    expect(-3.14).toBooleanizeTrue();
  });

  it("treats infinity as true", () => {
    expect(Infinity).toBooleanizeTrue();
  });

  it("treats actual booleans correctly", () => {
    expect(true).toBooleanizeTrue();
    expect(false).toBooleanizeFalse();
  });

  it("treats null as false", () => {
    expect(null).toBooleanizeFalse();
  });

  it("treats undefined as false", () => {
    expect(undefined).toBooleanizeFalse();
  });

  it("treats NaN as false", () => {
    expect(NaN).toBooleanizeFalse();
  });

  it("treats 0 as false", () => {
    expect(0).toBooleanizeFalse();
  });

  it("treats '0' as false", () => {
    expect("0").toBooleanizeFalse();
  });

  it("handles various falsey strings", () => {
    expect("f").toBooleanizeFalse();
    expect("false").toBooleanizeFalse();
    expect("N").toBooleanizeFalse();
    expect("nil").toBooleanizeFalse();
    expect("no").toBooleanizeFalse();
    expect("none").toBooleanizeFalse();
    expect("NULL").toBooleanizeFalse();
  });

  it("treats other strings as true", () => {
    expect("anything").toBooleanizeTrue();
  });

  it("treats an empty array as false", () => {
    expect([]).toBooleanizeFalse();
  });

  it("treats an empty typed array as false", () => {
    expect(new Int8Array()).toBooleanizeFalse();
  });

  it("treats an empty object as false", () => {
    expect({}).toBooleanizeFalse();
  });

  it("treats any other value by its presence", () => {
    expect(new Date()).toBooleanizeTrue();
  });
});
