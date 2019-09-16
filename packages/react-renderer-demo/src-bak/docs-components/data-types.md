import RawComponent from '../common/component/raw-component';

## Introduction

 You can specify a type of a component by providing `dataType`, which will automatically validates the component value.
Because almost everything in html inputs is outputed as a string, adding the `dataType` props will also cast the value to given type.

### Available dataTypes

 ```jsx
['integer', 'float', 'number', 'boolean', 'string']
```
<RawComponent source="data-types/data-types-example" />
