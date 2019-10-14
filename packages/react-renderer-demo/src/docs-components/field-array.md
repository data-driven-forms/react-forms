import { NavLink } from 'react-router-dom';
import RawComponent from '../common/component/raw-component';

### Field Array Provider

Simillarly to <NavLink to='/renderer/field-provider'>FieldProvider</NavLink> Data driven forms provide an option how to inlude <a href='https://github.com/final-form/react-final-form-arrays'>React Final Form Arrays</a> in your form.

<b>Please visit their documentation to learn about functionality.</b>

#### Using FieldArrayProvider

Component mapped to `componentTypes.FIELD_ARRAY` (`field_array`) receives as a prop `FieldArrayProvider`. You can wrap your component into it and they you have an access to all functionallity.

<RawComponent source="field-array/form-fields-mapper" />

### Naming

FieldArray supports [final form notation](https://final-form.org/docs/final-form/field-names).

Prefix is made by `name` of the `FIELD-ARRAY` component.

Nested components can have custom names, then the values are saved as an array of objects:

```jsx
{
    fieldArrayName: [
        {
            nestedName: 'VALUE 1'
        },
                {
            nestedName: 'VALUE 2'
        },
        ...
    ]
}
```

You don't need to name the nested components, then the values are saved as an array of values:

```jsx
{
    fieldArrayName: [
        'VALUE 1',
        'VALUE 2',
        ...
    ]
}
```

### Validators

You can use user a few provided validators (you can also use your <NavLink to='/renderer/validators'>own</NavLink>.)

```jsx
MIN_ITEMS_VALIDATOR: ({threshold})
MAX_LENGTH: ({threshold})
EXACT_LENGTH: ({threshold})
```


### PF4 implementation

PF4 component mapper provides an experimental implementation of PF4 field arrays.

|Prop|Type|Description|
|:---|:--:|----------:|
|label|`node`|Label of the array.|
|description|`node`|Description of the array.|
|fields|`array`|A group of fields, which are being added to the array.|
|defaultItem|`any`|Default item which is inserted into a newly created fields group. If you have nested names, don't forget you need to insert an object!|
|minItems|`number`|Remove button is disabled, if the length of the array is equal or smaller.|
|maxItems|`number`|Add button is disabled, if the length of the array is equal or bigger.|
|noItemsMessage|`node`|A message which is shown, when there are no items in the array.|

<RawComponent source="field-array/pf4-demo" />
