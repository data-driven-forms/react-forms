import CodeExamples from '@docs/code-example';
import DocPage from '@docs/doc-page';

<DocPage>

# FieldArray

[React Final Form Array](https://github.com/final-form/react-final-form-arrays) is exported via Data Driven Forms.

```jsx
import { FieldArray } from '@data-driven-forms/react-form-renderer';
```

## Dynamic fields

Dynamic fields allow you to add or remove field inputs in your forms. In Data Driven Forms, Field Array is used to provide this functionality. Simillarly to [FieldProvider](/components/field-provider) Data driven forms include [React Final Form Arrays](https://github.com/final-form/react-final-form-arrays). Please visit their documentation to learn more about the functionality and implementation.

## Using FieldArray

You have to just import `FieldArray` from Data Driven Forms.

```jsx
import { FieldArray } from '@data-driven-forms/react-form-renderer';
```

<CodeExamples source="components/field-array/form-fields-mapper" mode="preview" />

## Naming

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

## Validators

You can use user a few provided validators (you can also use your [own](/mappers/validator-mapper).)

```jsx
MIN_ITEMS_VALIDATOR: ({threshold})
MAX_LENGTH: ({threshold})
EXACT_LENGTH: ({threshold})
```


## Implementation

All DDF mappers contain its own implementation [field array](/provided-mappers/field-array?mapper=pf4)

<CodeExamples source="components/field-array/pf4-demo" mode="preview" />

</DocPage>