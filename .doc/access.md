Methods used to fetch various deeply-nested values based on presence or booleanization from an object.

Process an API response, elasticsearch document, JSON document, or anything else and remove the need for complex code like:

```javascript
import { getPresentArray }
const response = {
  foo: {
    bar: {
      baz: {
        quux: []
      }
    }
  }
};

// instead of this:
function extractDeepValue(value) {
  if (value && value.foo) {
    if (value.foo.bar) {
      if (value.foo.bar.baz) {
        if (Array.isArray(value.foo.bar.baz.quux) && value.foo.bar.baz.quux.length > 0) {
          return value;
        }
      }
    }
  }

  return ["default"];
};

extractDeepValue(response, ["default"]);

// you can just:
getPresentArray(response, "foo.bar.baz.quux", ["default"]);
```

#### Caveat!

While all of the `get___` accessors accept a `defaultValue` as their third parameter,
no type-checking or related validation is performed on it: it's returned as is. This
is by design, so that you can handle unset values at a higher level.

```javascript
import { getPresentArray } from "railsish";

const NO_TAGS_SELECTED = Symbol("NO_TAGS");

const getSelectedTags = (config) => getPresentArray(config, "user.selected.tags", NO_TAGS_SELECTED);

// A contrived express handler
export async function renderSelectedTags(req, res) {
  const tags = getSelectedTags(req.user.config);

  if (tags === NO_TAGS_SELECTED) {
    // take the user to a 
    return res.json({
      error: "User needs to select tags",
      code: "SELECT_TAGS_FIRST"
    }).status(400);
  }

  const tagResponse = await myDB.getTags(tags);

  res.json(tagResponse);
}
```
