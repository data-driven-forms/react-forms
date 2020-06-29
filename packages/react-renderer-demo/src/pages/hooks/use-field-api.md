import DocPage from '@docs/doc-page';
import InputMeta from '../input-meta.md';

<DocPage>

# useFieldApi

React form renderer is using [react-final-form](https://github.com/final-form/react-final-form) for form state management.
Most of its features are not directly available for consistency and performance reasons. If you want to create any custom
components, you can access these features via `FieldProvider` component or `useFieldApi` hook.

`FieldProvider` is a wrapper using `useFieldApi` to get the access to the form state.

`useFieldApi` is a wrapper around [React Final Form useField hook](https://final-form.org/docs/react-final-form/api/useField).

You can read more about that in [Component mapping](/mappers/custom-mapper).

## Usage

Next example shows simple input field with label and error message.

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

<InputMeta />

</DocPage>
