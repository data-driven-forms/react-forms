import DocPage from '@docs/doc-page';
import InputMeta from '../input-meta.md';

<DocPage>

# Field provider

React form renderer is using [react-final-form](https://github.com/final-form/react-final-form) for form state management.
Most of its features are not directly available for consistency and performance reasons. If you want to create any custom
components, you can access these features via `FieldProvider` component or `useFieldApi` hook.

`FieldProvider` is a wrapper using [useFieldApi](/hooks/use-field-api) to get the access to the form state. **It's recommended to use the hook.** You can read more about that in [Component mapping](/mappers/custom-mapper).

## Props

|name|type|description|
|----|----|-----------|
|Component|component|A component that receives all field props + meta + input.|
|render|function|A render function that receives all field props + meta + input.|

## Usage

Next example shows simple input field with label and error message.

```jsx
import React from 'react';

import { FieldProvider } from '@data-driven-forms/react-form-renderer';

const CustomComponent = ({input, meta, label}) => (
    <div>
      <label>{label}</label>
      <input {...input} />
      {meta.error && <label>{meta.error}</label>}
    </div>
);

const WrappedComponent = (props) => <FieldProvider Component={CustomComponent} {...props} />;

export default WrappedComponent;
```

---

<InputMeta />

</DocPage>
