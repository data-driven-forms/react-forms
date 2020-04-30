import Grid from '@material-ui/core/Grid'
import CodeExamples from '@docs/code-example';

import ListOfContents from '@docs/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Dynamic fields

Dynamic fields allow you to add or remove field inputs in your forms. In Data Driven Forms, Field Array is used to provide this functionality. Simillarly to [FieldProvider](/renderer/field-provider) Data driven forms include [React Final Form Arrays](https://github.com/final-form/react-final-form-arrays). Please visit their documentation to learn more about the functionality and implementation.

## Using FieldArray

You have to just import `FieldArray` from Data Driven Forms.

```jsx
import { FieldArray } from '@data-driven-forms/react-form-renderer';
```

<CodeExamples source="components/field-array/form-fields-mapper" mode="preview" />

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


# Implementation

PF4 and MUI component mapper provides an experimental implementation of field arrays.

[PF4 Field Array](/component-example/field-array?mapper=pf4)

[MUI Field Array](/component-example/field-array?mapper=mui)

<CodeExamples source="components/field-array/pf4-demo" mode="preview" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/dynamic-fields" />
</Grid>
</Grid>