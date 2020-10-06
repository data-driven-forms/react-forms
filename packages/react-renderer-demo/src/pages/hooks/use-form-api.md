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

## renderForm

*(fields: schema) => React.Element*

If you want to render fields from a component (`tabs`, `subform`, etc.) you can use `renderForm(fields)` function.

## getState

*() => FormState*

Using `getState` components you get an access to [the form state](https://final-form.org/docs/final-form/types/FormState). Be aware of subscription - if your component is not subscribed to the form state, it won't be updated when the state is changed. See [FormSpy](/components/form-spy).

## change

*(name: string, value: any) => void*

You can change value of any field using this function.

## focus

*(name: string) => void*

Calls onFocus event on field with given name.

## blur

*(name: string) => void*

Calls onBlur event on field with given name.

## getFieldState

*(name: string) => FormFieldState*

Returns a state of given field. State contains input and meta information of the field.

## getRegisteredFields

*() => string[]*

Returns an array of field names that are currently rendered in DOM. Useful to know when you collect variables in wizard forms.

## pristine

*boolean*

True if the all field values is === to the initial values, false if the values are !==. Same as in the FormState.

## valid

*boolean*

True if all fields have no validation or submission errors. false otherwise. Same as in the FormState.

</DocPage>
