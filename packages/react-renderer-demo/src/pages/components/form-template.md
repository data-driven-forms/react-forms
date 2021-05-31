import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# FormTemplate

[FormTemplate component](/components/renderer#formtemplate) allows you to fully customize the form layout. FormTemplate receives only two props from renderer: `formFields` and `schema`.

## Props

### formFields

*node*

Fields of the form.

### schema

*object*

[Schema](/components/renderer#schema) from renderer. You can use it to extract a form title, description or whatever you need.

## Minimal FormTemplate

Minimal FormTemplate could look like this:

```jsx
const FormTemplate = ({schema, formFields}) => {
  const { handleSubmit } = useFormApi();

  return (
    <form onSubmit={handleSubmit}>
      { schema.title }
      { formFields }
      <button type="submit">Submit</button>
    </form>
  )
}
```

With using `useFormApi` hook you can get access to all form information and functions you need. For example, you can use it to display form errors wherever you want to.

## Default FormTemplates

FormTemplates of the provided DDF mappers offers additional customization via using props.

```jsx
import { FormTemplate } from '@data-driven-forms/pf4-component-mapper'

<FormRenderer
  ...
  FormTemplate={(props) => <FormTemplate {props} showFormControls={false} ... />}
/>
```

### Props

#### alertProps

*object*

Props passed to `FormError` alert component.

---

#### buttonClassName

*string*

Class which will be given to the buttons wrapper.

---

#### buttonOrder

*string[]*

You can specify the order of the form buttons.

*Example*

`[ 'submit', 'reset', 'cancel' ]`

---
#### buttonGroupProps

*object*

Props passed to an element wrapping all buttons.

---
#### buttonsProps

*object*

Props passed to buttons. Please follow this structure: `{ submit: submitButtonProps, cancel: cancelButtonProps, reset: resetButtonProps }`.

---
#### cancelLabel

*node = 'Cancel'*

Label for cancel button.

---
#### canReset

*boolean*

Shows/hides the reset button.

---
#### disableSubmit

*string[]*

You can specify a form attributes (see [here](https://final-form.org/docs/final-form/types/FormState)) which will make the submit button disabled when true.

---
#### formWrapperProps

*object*

Props passed to a form wrapper.

---

#### headerProps

*object*

Props passed to a header element.

---

#### resetLabel

*node = 'Reset'*

Label for reset button.

---

#### showFormControls

*boolean = true*

You can disable showing form buttons. Use it with wizard component which has its own buttons.

---

#### submitLabel

*node = 'Submit'*

Label for submit button.

---

#### titleProps

*object*

Props passed to a title element.

---

## Examples

**[Custom form buttons](/examples/custom-form-buttons)**

**[Form level errors](/examples/form-level-errors)**

</DocPage>
