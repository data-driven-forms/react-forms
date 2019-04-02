# React Form Renderer

Rendering forms from data structures

## Online demo: http://data-driven-forms.surge.sh/

## Table of contents

- [ Instalation ](#instalation)
- [ Getting started ](#getting-started)
- [ Form schemas ](#form-schemas)
  - [ Default schema ](#default-schema)
    - [ `Default schema attributes` ](#default-schema-attributes)
    - [ `Fields` ](#fields)
    - [ `Field attributes` ](#field-attributes)
- [ Component mappers ](#component-mappers)
  - [ Layout mapper ](#layout-mapper)
  - [ Form Fields Mapper ](#form-fields-mapper)

## <a name="instalation"></a>Instalation

```
npm install --save @data-driven-forms/react-form-renderer
```
or
```
yarn add @data-driven-forms/react-form-renderer
```

## <a name="getting-started"></a>Getting started
React form renderer is a component designed for ManageIQ and Insighs projects that takes json form definitions and renders them into react components. It uses [React final form](https://github.com/final-form/react-final-form) for the form state management. It is highly recommended to check their documentations first to fully understand how the [data-driven-forms](https://github.com/data-driven-forms) libraries work.

Code examples:

```JSX
import FormRender from '@data-driven-forms/react-form-renderer';

const DataDrivenForm = () => (
  <FormRender
    formFieldsMapper={formFieldsMapper}
    layoutMapper={layoutMapper}
    schema={schema}
    onSubmit={...}
    onCancel={...}
    onReset={...}
    canReset
  />
);
```

There are several required props that must be passed to the component. Check the examples below to learn how it works.

## <a name="form-schemas"></a> Form schemas
There are currently 3 schema definitions you can use to define your forms. With the intention to provide additional customization in the future. Currently supported schemas are:

- [default schema](#default-schema)
- ManageIQ schema
- Mozilla json schema

### <a name="default-schema"></a> Default schema
This is the default schema that is used directly for rendering the form. All other schema types are parsed to this one. This gives the option to write your custom parser that transforms any of your existing definitions into the default one, and use this renderer.

The default schema is also very extensible. There is only a few requirements for the format. Most of the attributes are meta information and their shape is based upon **your** form components.

```javascript
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
      treshold: 3,
      message: 'First name must be at least 3 characters long'
    }]
  }, {
    component: componentTypes.TEXT_FIELD,
    type: 'password',
    name: 'password',
    label: 'password',
  }]
}
```

Example above shows definition of a very simple form with two form fields and a validation. We will now take a closer look at its attributes.

#### <a name="default-schema-attributes"></a> `default-schema-attributes`
|name|data type|
|---|---|
|`title?`| string|
|`description?`| string|
|`fields`|Array of Objects|

Detailed descriptions of each attribute is below.

#### `title?: string`
Attribute defining form title.

#### `description?: string`
Attribute defining form description. 

#### `fields: Array.<Object>`
Array that contains field definitions.

#### <a name="fields"></a> Fields
This is the main data structure that holds definitions of all of the form fields. It is designed to match React rendering process. It must follow this rule:

```javascript
const fields = [{...}, [{...}, {...}], {...}, {...}, [[[{...}]]]]
```

In human language, items of field array must be either objects, where each object represents one formField (React component), or array of objects, which are form fields as well. This rule allows the component to render all the fields in one cycle with minimal code branching.

The structure of a single object is following:

#### <a name="field-attributes"></a> `field attributes`

There are listed all field (items of the `fields` array) attributes that are defined by the default schema. Any other attributes given to field object are automatically passed to the specified component.

Detailed descriptions of each attribute is below.


|name|type|
|---|---|
|`component`|string|
|`name`| string|
|`validate?`|Array of Objects|
|`condition?`|Object|
|`dataType`|string|
|`assignFieldProvider?`|bool|
|SubForm only||
|`fields`| Array (only for `SUB_FORM`)|
|`title?`|string|
|`description?`|string|

```javascript
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.TEXT_FIELD,
  name: 'first-name',
  label: 'First name',
  ...
}
```

Note that the field structure may vary based on your component implementation. There are few required attributes and most of them do not have to match the given types. Most of them are based on used form components.

#### `component: string`
Unique identifier of the component. Final component will be picked based on this key. There are several pre-defined constants identifying the most common components for ManageIQ and Insights apps.

```javascript
import { componentTypes } from '@data-driven-forms/react-form-renderer';

componentTypes = {
  TEXT_FIELD: 'text-field',
  TEXTAREA_FIELD: 'textarea-field', // deprecated, please use TEXTAREA
  FIELD_ARRAY: 'field-array', 
  SELECT_COMPONENT: 'select-field', // deprecated, please use SELECT
  FIXED_LIST: 'fixed-list',
  CHECKBOX: 'checkbox',
  SUB_FORM: 'sub-form',
  RADIO: 'radio',
  TABS: 'tabs',
  TAB_ITEM: 'tab-item',
  DATE_PICKER: 'date-picker',
  TIME_PICKER: 'time-picker',
  TAG_CONTROL: 'tag-control',
  SWITCH: 'switch',
  TEXTAREA: 'textarea-field',
  SELECT: 'select-field',
}
```

We are not limited by these component types. You can add your own type or use only few of them or combination of both. More detailed explanation of how this impacts the rendered form [can be found here](#form-fields-mapper).

#### `name: string`
This is traditional html5 name attribute for input elements.

#### `label`
Label for form field. The type is based on your component definition.

#### `validate: Array?<Object>`
Array of validation definitions. These are limited by the form renderer (Might be configurable in future).

If you want to use out of the box validation, you must use this format:
```javascript
const validate = [{
  type: string,
  message: string?,
  ...
}]
```

Each validator type has additional configuration options in addition to custom error message:
```javascript
import { validatorTypes } from '@data-driven-forms/react-form-renderer';

validatorTypes = {
  REQUIRED: 'required-validator',
  /**
  * min length if the input value
  */
  MIN_LENGTH: 'min-length-validator',
  /**
  * minimum count of fileds in some dynamic list of fields
  */
  MIN_ITEMS_VALIDATOR: 'min-items-validator',
  /**
  * Minimum value of number input
  */
  MIN_NUMBER_VALUE: 'min-number-value',
  /**
   * Maximum value of number inpuy
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
  treshold: integer
}, {
  type: validatorTypes.MIN_ITEMS_VALIDATOR,
  treshold: integer
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
```
Validation functions are triggered only when field has a value with exception of required validator.

#### `dataType: string?`
Adds field validation based on the value data type.

```javascript
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.TEXT_FIELD,
  name: 'number',
  type: 'number',
  label: 'Integer number',
  dataType: 'integer',
}
```

There are currently four defined data types:
```javascript
['integer', 'number', 'bool', 'string']
```

#### <a name="assign-field-provider"></a> `assignFieldProvider: bool?` [DEPRECATED]
FieldProvider is just a fancy name for [Field component](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops). Following component types are wrapped in the FieldProvider by default:

```javascript
import { componentTypes } from '@data-driven-forms/react-form-renderer';

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
```

Because we can't possibly guess all viable component types, by using `assignFieldProvider` attribute you will add the `FieldProvider` component to your Form Field props. This wrapper will add necessary props to your component that will handle form state updates. It is reccomended to read about field component in React Final Form docs. 

#### `condition: Object?`
Condition is used to define condition fields. For instance, field **A** should render only when field **B** has value **Foo**.

```javascript
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
```

Sometimes you might want to show field when it's matching multiple values:

```javascript
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
```

In example above, field `Bar` will appear when fields `Foo` value is `Show bar field`, `true`, `123` or `Or now`.

#### Other attributes

Any other attributes will be passed to the component matching the `component` identifier.

For examples definition of select component might look something like this:

```javascript
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const field = {
  component: componentTypes.SELECT_COMPONENT,
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
```

Remember that the components define the interface. If your label is an image, pass the image source with isImage flag maybe and handle rendering in the component.

### Field array and Fixed list
TO DO add documentaion here

## <a name="component-mappers"></a> Component Mapping

As it was already mentioned, you can define your own components for rendering. In fact, you have to define them because the Form Renderer does not know anything about them. This way, the renderer is universal and can be used with any component library or your custom components. It is also very easy to swap the look of the form without any changes to the format!

We also understand that writing form components from the scratch might not be very user friendly. ManageIQ and Insights are using [patternfly style patterns](http://patternfly-react.surge.sh/), so you can get inspired with [Patternfly 3](https://github.com/data-driven-forms/pf3-component-mapper) and [Patternfly 4](https://github.com/data-driven-forms/pf4-component-mapper) mappers.

Form renderer requires two different mappers. Layout mapper and Form  FieldsMapper.

### <a name="layout-mapper"></a> Layout mapper
Component inside this mapper influence the layout of the form. Now compared to the Form Fields mapper, we have to be very strict because we cannot define our own elements. Layout mapper must contain these types components:

```javascript
import { layoutComponents } from '@data-driven-forms/react-form-renderer';

const layoutComponents = {
  [layoutComponents.FORM_WRAPPER]: 'FormWrapper',
  [layoutComponents.BUTTON]: 'Button',
  [layoutComponents.COL]: 'Col',
  [layoutComponents.FORM_GROUP]: 'FormGroup',
  [layoutComponents.BUTTON_GROUP]: 'ButtonGroup',
  [layoutComponents.ICON]: 'Icon',
  [layoutComponents.ARRAY_FIELD_WRAPPER]: 'ArrayFieldWrapper',
  [layoutComponents.HELP_BLOCK]: 'HelpBlock'
}
```

LayoutMapper is just good old javascript object with keys from layoutComponents, and the values are just React components:

#### FormWrapper

Form wrapper is your form wrapper component. Typically it will be your react version of `<form>` tag:

```JSX
import FormRenderer, { layoutComponents } from '@data-driven-forms/react-form-renderer';

const FormWrapper = ({ children }) => <form>{children}</form>

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
}

const MyForm = () => (
  <FormRenderer
    layoutMapper={layoutMapper}
  />
)
```

#### Button
Button component will be used for your submit, reset and cancel buttons.

```JSX
import layoutComponents } from '@data-driven-forms/react-form-renderer';

const Button = ({ label, bsStyle, ...props }) => (
  <button
    {...props}
    style={{ backgroud: bsStyle === primary ? 'blue' : 'initial' }}
  >
    {label}
  </button>
)
const layoutMapper = {
  [layoutComponents.BUTTON]: FormWrapper,
}
```

#### Col
Col represents wrapper arround one Form Field (hence the name Col). It does not have to mirror bootstrap Col, which is just the name we have decided to go with. If you for instance don't need any Col (or other wrapping) component, and you are handling this inside the actual Field component, you can use `<React.Fragment>` component. This way you will not create any element in your DOM. On the other hand, it might be usefull to implement it as a container for your components. Because we can't possibly create layout that suit 100% of our use cases, we can use this wrapper to pass additional styles to field components.

```JSX
import './form/styles.scss';

const Col = ({ children }) => (
  <div className="form-row">{children}</div>
)
```

#### FormGroup

Very similar to Col component.

```JSX
import './form/styles.scss';

const FormGroup = ({ children }) => (
  <div className="form-group">{children}</div>
)
```

#### ButtonGroup
Wrapper for your form buttons

```JSX
import './form/styles.scss';

const ButtonGroup = ({ children }) => (
  <div className="button-group">{children}</div>
)
```

#### Icon, Array Field Wrapper, Help Block
TO DO when array field docs are done

#### Putting it all together

```JSX
import FormRenderer, { layoutComponents } from '@data-driven-forms/react-form-renderer';

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
  [layoutComponents.BUTTON]: Button,
  [layoutComponents.COL]: Col,
  [layoutComponents.FORM_GROUP]: FormGroup,
  [layoutComponents.BUTTON_GROUP]: ButtonGroup,
  [layoutComponents.ICON]: Icon,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: ArrayFieldWrapper,
  [layoutComponents.HELP_BLOCK]: HelpBlock
}

const MyForm = () => (
  <FormRenderer
    ...
    layoutMapper={layoutMapper}
    ...
  />
)
```

### <a name="form-fields-mapper"></a> Form Fields mapper

Unlike the layout components, the form fields are completely customizable, and the implementation is restricted to only one rule. In order to correctly change the form state, you have to use provided `input` and `meta` props to your input fields. These objects provide functions like `onChange`, `onBlur`, error messages, valid state and more. Again you should probably read more about that in the [React Final Form docs](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops).

Some of the component types are wrapped in the Field component [by default](#assign-field-provider) and if you need to use different component type, you can pass it as a prop by adding the `assignFieldProvider: true` attribute to the field.

In an example below you can see an implementation of a simple input component using both predefined component type and a custom one.

```JSX
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

// if no id is provided field will use name and assign it to ID
const DefaultInput = ({ input, meta, label, name, ...rest }) => {
  const id = rest.id || name;
  return (
    <div className={`form-group ${meta.error ? 'error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...rest} {...input} />
      {meta.error && <span className="error-text">{meta.error}</span>}
    </div>
  )
}

const CustomInput = ({ FieldProvider, ...rest }) => (
  <FieldProvider
    {...rest}
    component={DefaultInput}
  />
)

const formFieldsMapper = {
  [componentTypes.TEXT_FIELD]: DefaultInput,
  'custom-input': CustomInput,
}

const schema = {
  fields:[{
    component: componentTypes.TEXT_FIELD.
    name: 'first-name',
    label: 'First Name',
    type: 'text',
    validate: [{
      type: validatorTypes.REQUIRED,
    }]
  }, {
    component: 'custom-input'.
    name: 'last-name',
    label: 'Last Name',
    type: 'text',
    assignFieldProvider: true,
    validate: [{
      type: validatorTypes.REQUIRED,
    }]
  }]
}

```

#### What about nesting?
There might be a need to create something like a SubForm in your Forms. We made it possible, and there are two ways to do it.

1. Use pre defined `componentTypes.SUB_FORM` component type:
```JSX
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'first-name',
    ...
  }, {
    component: componentTypes.SUB_FORM,
    title: 'Address',
    description: 'Please provide us with your shipping address.',
    name: 'address',
    fields: [{
      component: componentTypes.TEXT_FIELD,
      name: 'city',
      label: 'City',
      validate: [...],
      ...
    }]
  }]
}
```

This renders and bundles fields and their values inside the `SUB_FORM` component. When the form is submitted, the values object will look something like this:
```json
{
  "first-name": "Bob",
  "address": {
    "city": "Prague"
    ...
  }
}
```

2. Custom component
Again, the `SUB_FORM` component type might not be the correct solution for your use case. You can always create your own. Let's use the same schema as in example above, but only with one change:
```javascript
component: componentTypes.SUB_FORM, -> component: 'custom-sub-form'
```

If you use custom type, in addition to all the attributes in the field specification, you will also receive `formOptions` props. Form options contains some global form properties, and most importantly, there is a `renderForm` function. It does exactly what it says. It is the main loop that renders the form. It accepts two arguments, `fields` and `formOptions`:

```JSX
const CustomSubForm = ({ formOptions, fields, ...rest }) => (
  <SubFormWrapper>
    {formOptions.renderForm(fields, {
      ...formOptions,
      someExtendingAttribute: 'foo'
    })}
  </SubFormWrapper>
)
```

FormOptions are passed to every field (default and custom). If you extend it, the child of the sub form will receive your modified formOptions. You can even change te rendering function if you wish.
