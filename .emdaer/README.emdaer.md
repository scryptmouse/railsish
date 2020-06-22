# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

A collection of functions that operate on principles found in Rails,
specifically with regard to figuring out if a given value is `blank`
or `present`.

# Example Usage

```javascript
import { strict: assert } from "assert";
import { isPresent, isBlank } from "railsish";

// It treats empty or invalid values as blank...
assert(isBlank([]), "an empty array is blank");
assert(isBlank({}), "an empty object is blank");
assert(isBlank(new Date("2020-03-32")), "an invalid date is blank");
assert(isBlank(NaN), "NaN is blank");
assert(isBlank("\n\t  "), "a string containing only whitespace is blank");

// But there's a special case: 0 is present!
assert(isPresent(0), "0 is present");
```

### Accessor helpers

Related to the above concepts, `railsish` includes some helper methods
that can be used to extract values from nested objects, perform some
checks, and do what you want them to.

#### Get any present value

```javascript
import { strict: assert } from "assert";
import { getPresent } from "railsish";

assert.equal(getPresent({ foo: { bar: { baz: null } } }, "foo.bar.baz", "quux"), "quux", "it will return a default value");
```

#### Get a present number or string

```javascript
import { strict: assert } from "assert";
import { getPresentNumber, getPresentString } from "railsish";

assert.equal(getPresentNumber({ foo: "-3.14" }, "foo"), -3.14, "fetching a numeric string will cast it");
assert.equal(getPresentString({ foo: "\t" }, "foo", "default"), "default", "whitespace-only strings are not present");
```

### Converting values to booleans

Sometimes you want to work with boolean values directly, distinct from blankness and presence,
and so there's also the `booleanize` function. It works a little differently, in that it _does_
treat 0, and certain string values as falsey. It's intended for use with API responses or
other inconsistent data containing booleanesque values that aren't `true` or `false`. 

```javascript
import { booleanize } from "railsish";

<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/booleans.js
    functionName: "booleanize"
    tag: example
-->
```

#### Get a boolean value

There's a helper method for this one, too, that uses its logic instead:

```javascript
import { strict: assert } from "assert";
import { getBoolean } from "railsish";

assert.fail(getBoolean({ foo: [] }, "foo"), "it will booleanize the value at a given path");
```

# API Documentation

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: "./.emdaer/documentation.js"
    args:
      - yarnTask: "docs:api:md"
-->
