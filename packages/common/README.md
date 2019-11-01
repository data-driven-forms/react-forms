[![Data Driven Form logo](images/logo.png)](https://data-driven-forms.org/)

# `@data-driven-forms/common` - common code shared by multiple `@data-driven-forms/*` packages
￼
This package exists to share code used by more than one data-driven-forms package, such as:

* shared interfaces - propTypes
* common mapper code - `condition` implementation
￼

## Usage
￼
```
const common = require('@data-driven-forms/common');

// shared props
function MyComponent() {...}

MyComponent.propTypes = {
  ...common.children.propTypes,
  isMulti: PropTypes.bool.isRequired,
};

MyComponent.defaultProps = {
  ...common.children.defaultProps,
};

// condition code
common.condition.evaluate({
  when: "field",
  in: ["foo", "bar"],
}, { field: "baz" }); // false
```
