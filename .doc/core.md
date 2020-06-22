`isPresent` and `isBlank` trace their inspiration to Rails and ActiveSupport's `Object#blank?` logic.

`booleanize` is loosely inspired by how `ActiveRecord` converts values from forms to booleans,
but has been expanded for handling other edge cases I've come across when developing.
