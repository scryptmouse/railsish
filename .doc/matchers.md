Some helpers for jest ship with this library that you can install into your test environment.

```javascript
import { install as installRailsishMatchers } from "railsish/jest-matchers"

installRailsishMatchers(expect)

describe("some tests", () => {
  it("returns a present response", () => {
    expect(myLibrary.doSomething()).toBePresent();
  });

  it("returns something blank", () => {
   expect(anonymousRequest.getCurrentUser()).toBeBlank();
  });

  it("implements foo", () => {
    expect({ foo: () => "bar" }).toRespondTo("foo");
  });
});
```
