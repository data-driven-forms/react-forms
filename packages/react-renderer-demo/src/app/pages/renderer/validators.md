import Grid from '@material-ui/core/Grid'
import RawComponent from '@docs/raw-component';
import RouterLink from 'next/link';
import Link from '@material-ui/core/Link';

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Validate field

You need to provide a `validate` array in the schema to add validation to your form fields.

A item of the validate array can be:
* a) object containing type and other specific configuration attributes (see validators description)
* b) function

## Required validator

<RawComponent source="validators/required-validator" />

## Length validators

<RawComponent source="validators/length-validators" />

## Number value validators

<RawComponent source="validators/number-validator" />

## Pattern validators

<RawComponent source="validators/pattern-validator" />

## URL validators

<RawComponent source="validators/url-validator" />

## Custom function

As validator you can provide your custom function:

<RawComponent source="validators/custom-function" />

The function takes `value` as an argument and should return undefined when pasess or string as an error message when fails.

## Async validator

You can use a Async function as a validator. However, the returned promise will overwrite all other validators
(because it is returned last),
so you need combine all validators into one function.

<RawComponent source="validators/async-validator" />


Validator inputs and results are being cached so you will get immediate feedback for recurring values before the validation is actually finished.

If you do not want to trigger the async validator after every stroke, you can use a debounce promise [library](https://github.com/slorber/awesome-debounce-promise)
(or any other implementation of debouncing.)

# validatorMapper

If you need to expand default Data Driven Forms validator types, you can use <RouterLink href="/renderer/renderer-api#optionalprops"><Link href="/renderer/renderer-api#optionalprops">validatorMapper</Link></RouterLink>.

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

It is designed to return functions returning functions, so you can easily cached or debounce results.

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

<RawComponent source="validators/record-level-validation" />

# Overwriting default messages

You can either specify message attribute while adding validator or override validation message of specific validator globally via Validators config.

<RawComponent source="validators/global-message" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/validators" />
</Grid>
</Grid>