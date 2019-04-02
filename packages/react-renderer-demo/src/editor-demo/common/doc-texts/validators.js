import React from 'react';
import ReactMarkdown from '../md-helper';
import TableOfContent from '../helpers/list-of-content';

const text = `
You can validate a form by using of \`dataType\` or \`validate\`.

DataTypes is used when you need validate only a data type of a value. For more complicated validators, you have to use validate.

### dataType

You can specify a type of a component by providing \`dataType\`, which will automatically validates the component.

\`\`\`jsx
{
  component: 'text-field',
  name: 'number',
  type: 'number',
  label: 'Integer number',
  dataType: 'integer',
}
\`\`\`

Currently, there are four types supported:
\`\`\`jsx
['integer', 'number', 'bool', 'string']
\`\`\`

### Overwriting default messages

Validators is a singleton. You can change its default messages:

\`\`\`jsx
import { Validators } from '@data-driven-forms/react-form-renderer';

Validators.messages = {
  ...Validators.messages,
  required: 'Required field!',
};
\`\`\`

Types of validators:
\`\`\`jsx
[
  even
  equalTo,                  // equal => \`Must be equal to \${equal}\`
  greaterThan,              // number => ....
  greaterThanOrEqualTo,     // number => ....
  lessThan,                 // number => ....
  lessThanOrEqualTo,        // number => ....
  mustBeBool,
  mustBeString,
  notANumber,
  odd,
  otherThan,                // number => ....
  pattern,                  // pattern => ....
  required,
  tooLong,                  // count => ....
  tooShort,                 // count => ....
  wrongLength,              // count => ....
]
\`\`\`

### validate

You need to provide a \`validate\` array in the schema:

\`\`\`jsx
{
  component: 'text-field',
  name: 'field',
  label: 'Validated field!',
  validate: [
    {
      type: 'required-validator',
    }
  ]
}
\`\`\`

A item of the validate array is 
* a) object containing type and other specific values (see Default validators)
* b) function

#### Default validators

There are standard validators, which you can import from react-form-renderer package.

\`\`\`jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';

validatorTypes = {
  REQUIRED: 'required-validator',
  /**
   * Minimum length of the input value
   */
  MIN_LENGTH: 'min-length-validator',
  /**
   * Maximum length of the input value
   */
  MAX_LENGTH: 'max-length-validator',
  /**
   * Exact length of input value
   */
  EXACT_LENGTH: 'exact-length-validator',
  /**
   * Minimum count of fields in some dynamic list of fields
   */
  MIN_ITEMS_VALIDATOR: 'min-items-validator',
  /**
   * Minimum value of number input
   */
  MIN_NUMBER_VALUE: 'min-number-value',
  /**
   * Maximum value of number input
   */
  MAX_NUMBER_VALUE: 'max-number-value',
  /**
   * Regexp pattern validator
   */
  PATTERN_VALIDATOR: 'pattern-validator',
}

const validate = [{
  type: validatorTypes.REQUIRED,
  message: 'This is custom error message'
}, {
  type: validatorTypes.MIN_LENGTH,
  threshold: integer
}, {
  type: validatorTypes.MAX_LENGTH,
  threshold: integer
}, {
  type: validatorTypes.EXACT_LENGTH,
  threshold: integer
}, {
  type: validatorTypes.MIN_ITEMS_VALIDATOR,
  threshold: integer
}, {
  type: validatorTypes.MIN_NUMBER_VALUE
  value: integer
}, {
  type: validatorTypes.MAX_NUMBER_VALUE
  value: integer
}, {
  type: PATTERN_VALIDATOR,
  pattern: string // regex pattern
  showPatter: bool? // if message is not define turns on/of pattern in error message
}]
\`\`\`

Validation functions are triggered only when field has a value with exception of required validator.

Each validator type has additional configuration options in addition to custom error message.

#### Custom function

As validator you can provide your custom function:

\`\`\`jsx
{
  component: 'text-field',
  name: 'field',
  label: 'Validated field!',
  validate: [
    isOdd,
  ]
}
\`\`\`

\`\`\`jsx
const isOdd = (value) => value % 2 === 0 ? undefined : 'Value is odd!';
// undefined - passes
// something [string as error message] - fails
\`\`\`

The function takes \`value\` as an argument and should return undefined when pasess or string as an error message when fails.

#### Async validator

You can use a Async function as a validator. However, the returned promise will overwrite all other validators 
(because it is returned last),
so you need combine all validators into one function.

Example (Async + Required):

\`\`\`jsx
export const asyncValidator = value => API.get(\`/api/isNameValid?name=\${value}\`)
  .then((json) => {
    if (!json.valid) {                         // async validator
      return "Name is not valid!";
    }
    if (value === '' || value === undefined) { // required validator
      return "Name can't be blank";
    }
    return undefined;
  });
\`\`\`

If you do not want to trigger the async validator after every stroke, you can use a debounce promise [library](https://github.com/slorber/awesome-debounce-promise)
(or any other implementation of debouncing.)

Example:

\`\`\`jsx
const asyncValidatorDebounced = debouncePromise(asyncValidator);

...

validate: [
  asyncValidatorDebounced,
],
...
\`\`\`

### validateOnMount

By providing \`validateOnMount\` the validation will be triggered immediately after mounting of the component.

\`\`\`jsx
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
\`\`\`

`;

export default <React.Fragment>
  <TableOfContent text= { text } />
  <ReactMarkdown source={ text } />
</React.Fragment>;

