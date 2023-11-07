import CodeExample from '@docs/code-example';
import DocPage from '@docs/doc-page';

<DocPage>

# Condition mapper

The [ConditionMapper](/components/renderer#conditionmapper) allows to map condition attributes to a functions defined on the form renderer. This is useful when your schema is not written in JavaScript source files and functions can't be defined inside schema. For example for schemas stored in databases.

The functions defined in condition mapper are higher order functions. This allows configuration of the function arguments via schema.

## Mapper

```TS
type ConditionMapper = {
    [functionName: string]: (...args: any[]) => (value: any, conditionConfig: ConditionDefinition) => boolean;
}
```

## Schema

```
[
  // Field that is a condition dependency
  {
    name: 'field1',
    label: 'Field 1',
    component: 'text-field',
  },
  {
    name: 'mapped-condition',
    label: 'Mapped Condition',
    component: 'text-field',
    condition: {
      mappedAttributes: {
        // first array entry is the function name in the mapper, rest are the higher order function arguments
        is: ['nameFn', 'John', 'Doe'],
      },
      when: 'field1',
    },
  },
]
```

## Example

Lets image a simple scenario. We have a form, with a `name` text field. If the `name` field has a certain value, a second field will appear in the form. The value is a variable filed from database and we can't statically define it in the schema.

Firstly, a condition mapper must be defined.

```js
const conditionMapper = {
  resolveCondition: (requiredValue) => (value, _conditionConfig) => requiredValue === value
}
```

Add this object as a prop to the `FormRenderer`.

```JS
<FormRenderer
  {...props}
  schema={schema}
  conditionMapper={conditionMapper}
/>
```

In your schema, map the condition attribute a function.

```JSON
{
  "fields": [
    {
      "name": "first-name",
      "label": "First name",
      "component": "text-field",
    },
    {
      "name": "mapped-condition",
      "label": "Mapped Condition",
      "component": "text-field",
      "condition": {
        "mappedAttributes": {
          "is": ["resolveCondition", "John"],
        },
        "when": "first-name",
      },
    },
  ]
}
```
<CodeExample source="components/condition-mapper" mode="preview" />

## Mappable attributes

Currently, mapping the `when` and `is` condition attributes is allowed.

</DocPage>