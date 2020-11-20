import DocPage from '@docs/doc-page';

<DocPage>

# useFieldApi

This hook is the main way for connecting custom components to the form state. (You can also access these features via `FieldProvider`, but it's not recommended.) You can read more about that in [Component mapping](/mappers/custom-mapper).

Data Driven Forms is using [react-final-form](https://github.com/final-form/react-final-form) for form state management. Most of its features are not directly available for consistency and performance reasons. `useFieldApi` is a wrapper around [React Final Form useField hook](https://final-form.org/docs/react-final-form/api/useField).

## Usage

Next example shows simple input field with a label and an error message.

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

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

## What are input and meta?

### Input

Input is an object which contains field values and methods that change form state. See the selection of most important attributes:

#### value

*any*

Any value of given form field. Its data type is based on field data type.

#### name

*string*

An unique name of form field. Value will be accessible under this key in form state.


#### onBlur

*() => void*

A function that should be triggered on field blur event.

#### onChange

*(value | event: any) => void*

A function that changes value of field in formState. Should be called whenever you want to change value of field.

#### onFocus

*() => void*

A function that should be triggered on field focus event.

Every user interaction that updates field value in form state should also call `input.onChange` with correct value.

#### Usage of input

**HTML Input elements**

Just spread the input object on element. Input methods are mapped 1:1 to React functions.

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = (props) => {
  const { input } = useFieldApi(props);

  return <input {...rest}>
}
```

**Custom elements**

If you have non-input element, you can still easily use all the methods.

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import Card from './custom-card.js';

const TextField = (props) => {
  const { input } = useFieldApi(props);

  return <Card onClick={() => input.onChange(props.value)}>
}
```

---

### Meta

Meta is a object which contains meta information about field with given name. There is a lot of information about every field.
[Full list is here](https://final-form.org/docs/react-final-form/types/FieldRenderProps#metaactive). These are commonly used meta informations:

#### error

*any*

Whatever your validation function returns.

#### pristine

*boolean*

True if the current value is === to the initial value, false if the values are !==.

#### dirty

*boolean*

The opposite of pristine.

#### touched

*boolean*

True if this field has ever gained and lost focus. false otherwise. Useful for knowing when to display error messages.

#### valid

*boolean*

True if this field has no validation or submission errors. False otherwise.

#### validating

*boolean*

True if this field is currently being validated. False otherwise.

#### Usage of meta

The main reason why to use meta object is to show users additional information about the field.

**Validating field**

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import Spinner from './spinner.js';

const TextField = (props) => {
  const { input, meta } = useFieldApi(props);

  return <React.Fragment>
    <input {...rest}>
    {meta.validating && <Spinner />}
  </React.Fragment>
}
```

**Error**

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import ErrorMessage from './error-message.js';

const TextField = (props) => {
  const { input, meta } = useFieldApi(props);

  return <React.Fragment>
    <input {...rest}>
    {meta.error && <ErrorMessage error={meta.error} />}
  </React.Fragment>
}
```

**Error after touched**

This combination makes the UX better, as users won't see an error until they finishes typing.

```jsx
import React from 'react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import ErrorMessage from './error-message.js';

const TextField = (props) => {
  const { input, meta } = useFieldApi(props);

  const error = meta.touched && meta.error;

  return <React.Fragment>
    <input {...rest}>
    {error && <ErrorMessage error={error} />}
  </React.Fragment>
}
```

</DocPage>
