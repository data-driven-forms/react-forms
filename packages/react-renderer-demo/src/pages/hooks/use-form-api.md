import DocPage from '@docs/doc-page';

<DocPage>

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

</DocPage>
