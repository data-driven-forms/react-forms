import React from 'react';
import ReactMarkdown from '../md-helper';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const getTypes = () => Object.entries(componentTypes).reduce((acc, curr) => `${acc}\n  ${curr[0]}: '${curr[1]}',`,
  '//TEXTEAREA_FIELD and SELECT COMPONENT ARE DEPRECATED!\n  //Please use TEXTAREA and SELECT!');

const text =  `
There are currently 3 schema definitions you can use to define your forms. With the intention to provide additional customization in the future. Currently supported schemas are:

- Default-schema
- ManageIQ schema
- Mozilla json schema

### Default schema
This is the default schema that is used directly for rendering the form. All other schema types are parsed to this one. This gives the option to write your custom parser that transforms any of your existing definitions into the default one, and use this renderer.

The default schema is also very extensible. There is only a few requirements for the format. Most of the attributes are meta information and their shape is based upon **your** form components.

\`\`\`jsx
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const schema = {
  title: 'My form title',
  description: 'My form description',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'first-name',
    label: 'First name'
    validate: [{
      type: validatorTypes.REQUIRED,
      message: 'First name is required'
    }, {
      type: validatorTypes.MIN_LENGTH,
      threshold: 3,
      message: 'First name must be at least 3 characters long'
    }]
  }, {
    component: componentTypes.TEXT_FIELD,
    type: 'password',
    name: 'password',
    label: 'password',
  }]
}
\`\`\`

Example above shows definition of a very simple form with two form fields and a validation. We will now take a closer look at its attributes.

#### default-schema-attributes
|name|data type|
|---|---|
|\`title?\`| string|
|\`description?\`| string|
|\`fields\`|Array of Objects|

Detailed descriptions of each attribute is below.

#### title?: string
Attribute defining form title.

#### description?: string
Attribute defining form description.

#### fields: Array of Objects
Array that contains field definitions.

#### Fields
This is the main data structure that holds definitions of all of the form fields. It is designed to match React rendering process. It must follow this rule:

\`\`\`jsx
const fields = [{...}, [{...}, {...}], {...}, {...}, [[[{...}]]]]
\`\`\`

In human language, items of field array must be either objects, where each object represents one formField (React component), or array of objects, which are form fields as well. This rule allows the component to render all the fields in one cycle with minimal code branching.

The structure of a single object is following:

#### field attributes

There are listed all field (items of the \`fields\` array) attributes that are defined by the default schema. Any other attributes given to field object are automatically passed to the specified component.

Detailed descriptions of each attribute is below.


|name|type|
|---|---|
|\`component\`|string|
|\`name\`| string|
|\`validate?\`|Array of Objects|
|\`condition?\`|Object|
|\`dataType\`|string|
|\`assignFieldProvider?\`|bool|
|SubForm only||
|\`fields\`| Array (only for \`SUB_FORM\`)|
|\`title?\`|string|
|\`description?\`|string|

\`\`\`jsx
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.TEXT_FIELD,
  name: 'first-name',
  label: 'First name',
  ...
}
\`\`\`

Note that the field structure may vary based on your component implementation. There are few required attributes and most of them do not have to match the given types. Most of them are based on used form components.

#### component: string
Unique identifier of the component. Final component will be picked based on this key. There are several pre-defined constants identifying the most common components for ManageIQ and Insights apps.

\`\`\`jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

componentTypes = {
  ${getTypes()}
}
\`\`\`

We are not limited by these component types. You can add your own type or use only few of them or combination of both. More detailed explanation of how this impacts the rendered form [can be found here](#form-fields-mapper).

#### name: string
This is traditional html5 name attribute for input elements.

#### label
Label for form field. The type is based on your component definition.

#### validate: Array? of Objects
Array of validation definitions. These are limited by the form renderer (Might be configurable in future).

If you want to use out of the box validation, you must use this format:
\`\`\`jsx
const validate = [{
  type: string,
  message: string?,
  ...
}]
\`\`\`

Each validator type has additional configuration options in addition to custom error message:
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

#### dataType: string?
Adds field validation based on the value data type.

\`\`\`jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.TEXT_FIELD,
  name: 'number',
  type: 'number',
  label: 'Integer number',
  dataType: 'integer',
}
\`\`\`

There are currently four defined data types:
\`\`\`jsx
['integer', 'number', 'bool', 'string']
\`\`\`

#### assignFieldProvider: bool?
FieldProvider is just a fancy name for [Field component](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops).

Following component types are wrapped in the FieldProvider by default:

\`\`\`jsx
const wrappedComponents = [
  componentTypes.TEXT_FIELD,
  componentTypes.TEXTAREA_FIELD,
  componentTypes.FIELD_ARRAY,
  componentTypes.SELECT_COMPONENT,
  componentTypes.FIXED_LIST,
  componentTypes.CHECKBOX,
  componentTypes.RADIO,
  componentTypes.DATE_PICKER,
  componentTypes.TIME_PICKER,
  componentTypes.TAG_CONTROL,
];
\`\`\`

This wrapper will add necessary props to your component that will handle form state updates. It is reccomended to read about field component in React Final Form docs. 

#### condition: Object?
Condition is used to define condition fields. For instance, field **A** should render only when field **B** has value **Foo**.

\`\`\`jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const fields = [{
  component: componentTypes.TEXT_FIELD,
  name: 'Foo'
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'Bar'
  condition: {
    when: 'Foo',
    is: 'Show Bar field',
  }

}]
\`\`\`

Sometimes you might want to show field when it's matching multiple values:

\`\`\`jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const fields = [{
  component: componentTypes.TEXT_FIELD,
  name: 'Foo'
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'Bar'
  condition: {
    when: 'Foo',
    is: ['Show Bar field', true, 123, 'Or now'],
  }
}]
\`\`\`

In example above, field \`Bar\` will appear when fields \`Foo\` value is \`Show bar field\`, \`true\`, \`123\` or \`Or now\`.

#### Other attributes

Any other attributes will be passed to the component matching the \`component\` identifier.

For examples definition of select component might look something like this:

\`\`\`jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.SELECT,
  name: 'color'
  label: 'Choose your favorite color'
  options: [{
    label: 'Red',
    value: 'red'
  }, {
    label: 'Blue',
    value: 'blue',
  }, {
    label: 'Green',
    value: 'sneaky-red',
  }]
}
\`\`\`

Remember that the components define the interface. If your label is an image, pass the image source with isImage flag maybe and handle rendering in the component.

### Field array and Fixed list
TO DO add documentaion here
`;

export default <ReactMarkdown source={ text } />;
