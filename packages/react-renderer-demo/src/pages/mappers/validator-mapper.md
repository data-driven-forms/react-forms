import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Validator mapper

If you need to expand default Data Driven Forms validator types, you can use [validatorMapper](/renderer/renderer-api#optionalprops).

```jsx
const customValidatorMapper = {
  custom: () => (value) => value > 6 ? 'Value is bigger than 6' : undefined
}

const schema = {
  fields: [{
   name: 'name',
   component: 'text-field',
   validate: [{type: 'custom'}]
  }]
}

<FormRenderer
  ...
  schema={schema}
  validatorMapper={customValidatorMapper}
/>

```

Validator in a mapper must be a function which returns a function. This makes validator easily configurable (different messages for same validator).

The higher order function receives the whole validator object.

```jsx
const customValidatorMapper = {
  custom: ({ threshold }) => (value) => value > threshold ? `Value is bigger than ${threshold}` : undefined
}

const schema = {
  fields: [{
   name: 'name',
   component: 'text-field',
   validate: [{type: 'custom', threshold: 6}]
  }]
}
```

Also, each validator function receives value of the current field as the first argument and all form values as the second.

```jsx
const validatorMapper = {
  [type]: (validatorSchema) => (value, allValues) => isValid ? undefined : 'error message'
}
```

</DocPage>
