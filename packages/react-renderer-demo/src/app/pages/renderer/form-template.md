import Grid from '@material-ui/core/Grid'
import CodeExample from '../../src/components/code-example';

import ListOfContents from '@docs/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# FormTemplate

FormTemplate component allows you to fully customize the form layout. FormTemplate receives only two props:

|Prop|Description|
|----|-----------|
|formFields|Fields of the form.|
|schema|Schema from renderer. You can use it to extract a form title, description or whatever you need.|

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

## Customize form buttons

You can customize form buttons in your [FormTemplate](/renderer/renderer-api#requiredprops) component

<CodeExample source="components/form-template/custom-buttons" mode="preview" />

## Form level validation

To display all form errors, you will need to add a component to your FormTemplate. Following example shows how to list all errors at the top of a form.

<CodeExample source="components/form-template/form-level-validation" mode="preview" mapper="mui" />

## Default FormTemplates

FormTemplates of the provided DDF mappers offers additional customization via using props.

```jsx
import { FormTemplate } from ‘@data-driven-forms/pf4-component-mapper’

<FormRenderer
  ...
  FormTemplate={(props) => <FormTemplate {props} showFormControls={false} ... />}
/>
```

|Prop|Type|Description|Default|
|----|:--:|----------:|------:|
|buttonClassName|string|Class which will be given to the buttons wrapper.|{ }|
|buttonsLabels|object|You can specify custom labels for all three form buttons.|`{submit: 'Submit', cancel: 'Cancel', reset: 'Reset'}`|
|buttonOrder|array of strings|You can specify the order of the form buttons.|`[ 'submit', 'reset', 'cancel' ]`|
|canReset|bool|Show/hide reset button.|false|
|disableSubmit|array of strings|You can specify a form attributes (see [here](https://final-form.org/docs/final-form/types/FormState)) which will make the submit button disabled. |[ ]|
|showFormControls|bool|You can disable showing form buttons. Use it with wizard component which has its own buttons.|true|

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/form-template" />
</Grid>
</Grid>
