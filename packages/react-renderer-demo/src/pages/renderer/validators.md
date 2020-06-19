import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Validate field

You need to provide a `validate` array in the schema to add validation to your form fields.

A item of the validate array can be:
* a) object containing type and other specific configuration attributes (see validators description)
* b) function

## Required validator

<CodeExample source="components/validators/required-validator" mode="preview" />

## Length validators

<CodeExample mode="preview" source="components/validators/length-validators" />

## Number value validators

<CodeExample mode="preview" source="components/validators/number-validator" />

## Pattern validators

<CodeExample mode="preview" source="components/validators/pattern-validator" />

## URL validators

<CodeExample mode="preview" source="components/validators/url-validator" />

## Custom function

As validator you can provide your custom function:

<CodeExample mode="preview" source="components/validators/custom-function" />

The function takes `value` as an argument and should return undefined when pasess or string as an error message when fails.

## Async validator

You can use a Async function as a validator. But it **must be first in the validate array**. Other async validators will be ignored. This rule was created to prevent long asynchronous validation sequences.

You can either use custom function, or custom validator from validator mapper.

<CodeExample mode="preview" source="components/validators/async-validator" />


Validator inputs and results are being cached so you will get immediate feedback for recurring values before the validation is actually finished.

If you do not want to trigger the async validator after every stroke, you can use a debounce promise [library](https://github.com/slorber/awesome-debounce-promise)
(or any other implementation of debouncing.)

# Custom validator mapper

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

# ValidateOnMount pf3 only

By providing `validateOnMount` the validation will be triggered immediately after mounting of the component.

```jsx
{
  component: 'text-field',
  name: 'field',
  label: 'Validated field!',
  validateOnMount: true,
  validate: [
    {
      type: 'required-validator',
    }
  ]
}
```

# Record Level validation

This form of validation enables you to create validation function for whole form. It is useful for some cross validation between multiple fields etc.
Detailed information can be found [here](https://final-form.org/docs/react-final-form/examples/record-level-validation).

<CodeExample mode="preview" source="components/validators/record-level-validation" />

# Overwriting default messages

You can either specify message attribute while adding validator or override validation message of specific validator globally via Validators config.

<CodeExample mode="preview" source="components/validators/global-message" />

</DocPage>