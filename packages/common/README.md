[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

# `@data-driven-forms/common` - common code shared by multiple `@data-driven-forms/*` packages
￼
This package exists to share code used by more than one data-driven-forms package, such as:

- shared interfaces - propTypes
- common mappers code 
  - wizard
  - select
  - multiplechoice list
  - form template
  - dual list select
- demo schema

...and some boring config files etc.

￼
This packages is not released but can be referenced in mapper packages. Demo packages does not have access to common package!

## Usage
￼
```
import demoSchema from '@data-driven-forms/common/demoschema';

```
