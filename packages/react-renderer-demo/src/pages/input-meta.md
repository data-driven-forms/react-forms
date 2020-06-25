**What are input and meta?**

- Input

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

- Meta

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