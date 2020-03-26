import Grid from '@material-ui/core/Grid'
import RawComponent from '@docs/raw-component';

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Dynamic fields

Dynamic fields allow you to add or remove field inputs in your forms. In Data Driven Forms, Field Array is used to provide this functionality. Simillarly to [FieldProvider](/renderer/field-provider) Data driven forms include [React Final Form Arrays](https://github.com/final-form/react-final-form-arrays). Please visit their documentation to learn more about the functionality and implementation.

## Using FieldArray

You have to just import `FieldArray` from Data Driven Forms.

```jsx
import { FieldArray } from '@data-driven-forms/react-form-renderer';
```

<RawComponent source="field-array/form-fields-mapper" />

# Naming

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

# Validators

You can use user a few provided validators (you can also use your [own](/renderer/validators).)

```jsx
MIN_ITEMS_VALIDATOR: ({threshold})
MAX_LENGTH: ({threshold})
EXACT_LENGTH: ({threshold})
```


# PF4 implementation

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

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/dynamic-fields" />
</Grid>
</Grid>