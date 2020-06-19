import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Custom components

React form renderer is using [react-final-form](https://github.com/final-form/react-final-form) for form state management.
Most of its features are not directly available for consistency and performance reasons. If you want to create any custom
components, you can access these features via `FieldProvider` component or `useFieldApi` hook.

`FieldProvider` is a wrapper using `useFieldApi` to get the access to the form state.

`useFieldApi` is a wrapper around [React Final Form useField hook](https://final-form.org/docs/react-final-form/api/useField).

You can read more about that in [Component mapping](/renderer/component-mapping).

## Implementation of component

Next example shows simple input field with label and error message.

```jsx
import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer'

const NewComponent = (props) => {
  const { input, meta } = useFieldApi(props);

  return (
    <div>
      <label>{props.label}</label>
      <input {...input} />
      {meta.error && <label>{meta.error}</label>}
    </div>
  )
}

export default NewComponent
```

## Register component

To be able to use your component in the schema, you first need to register the component in your component mapper.

```jsx
import NewComponent from './new-component'

const componentMapper = {
  'new-component': NewComponent
}
```

# What are input and meta?

## Input

Input is an object which contains field values and methods that change form state. See the selection of most important attributes:

```jsx
{
  value: any, // any value of given form field. Its data type is based on field data type
  name: string, // unique name of form field. Value will be accessible under this key in form state
  onBlur: (event) => void, // function that should be triggered on field blur event
  onChange: (value) => void, // function that changes value of field in formState. Should be called whenever you want to change value of field
  onFocus: (event) => void, // function that should be triggered on field focus event
}
```

Every user interaction that updates field value in form state should also call `input.onChange` with correct value.

## Meta

Meta is a object which contains meta information about field with given name. There is a lot of information about every field.
[Full list is here](https://final-form.org/docs/react-final-form/types/FieldRenderProps#metaactive). These are commonly used meta informations
```jsx
{
  error: any, // whatever your validation function returns
  pristine: bool, // true if the current value is === to the initial value, false if the values are !==.
  dirty: bool, // opposite of pristine
  touched: bool, //true if this field has ever gained and lost focus. false otherwise. Useful for knowing when to display error messages.
  valid: bool //true if this field has no validation or submission errors. false otherwise.
}
```

# useFormApi - formOptions

This property contains a number of useful methods and attributes that will give you additional level of control
and information about the formState.

You can access it from every component by using `useFormApi` hook.

```jsx
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Component = (props) => {
     const formOptions = useFormApi();
     ...
}
```

This hook returns object containing following information:

```jsx
{
  blur: (name) => void, // calls onBlur event on field with given name
  change: (name, value) => void, // calls onChange event on field with given name
  focus: (name) => void, // calls onFocus event on field with given name
  getFieldState: (name) => object, // returns a state of given field, state contains input and meta information of field
  getRegisteredFields: () => string[], // returns an array of field names that are rendered in DOM
  getState: () => object, // returns an object with whole form state. More info https://final-form.org/docs/final-form/types/FormState
  pristine: bool, // true if the all field values is === to the initial values, false if the values are !==.
  renderForm: (defaultSchema) => void, // function that is used by form renderer to render form fields defined by defaultSchema; can be used for schema nesting
  valid: bool //true if all fields have no validation or submission errors. false otherwise.
}
```

# FormSpy

[FormSpy](https://final-form.org/docs/react-final-form/api/FormSpy) is exported via Data Driven Forms.

```jsx
import { FormSpy } from '@data-driven-forms/react-form-renderer';
```

# FieldArray

[React Final Form Array](https://github.com/final-form/react-final-form-arrays) is exported via Data Driven Forms.

```jsx
import { FieldArray } from '@data-driven-forms/react-form-renderer';
```

# Form

For testing purposes, you can also import React Final Form's `Form` component.

```jsx
import { Form } from '@data-driven-forms/react-form-renderer';
```

</DocPage>
