import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Frequently Asked Questions (FAQ)

## Q. Docs for version 1.x still available anywhere?

**A.** Docs are available [here](https://pokus-next.firebaseapp.com/) or you can use [old branch](https://github.com/data-driven-forms/react-forms/tree/v1/packages/react-renderer-demo/src/app/pages) on GitHub.
<br />

---
<br />

## Q. Is there a way for a field to access another field's value and receive updates whenever it changes?

**A.** Right now, there are two standard ways how to update the second component:

1) Set [subscription](/components/renderer#optionalprops)

```jsx
<FormRenderer
  schema={schema}
  FormTemplate={FormTemplate}
  componentMapper={componentMapper}
  onSubmit={console.log}
  subscription={{values: true}}
/>
```

All fields will be updated when values are changed. It will hurt the performance, but in small forms it should be ok.

2) use [formSpy](/components/form-spy)

```jsx
<FormSpy subscription={{values: true}}>
   {(formState) => <CustomComponent />}
</FormSpy>
```
<br />

---
<br />

## Q. How to fill the form values programmatically?

**A.** Use [useFormApi.change(name, value)](/hooks/use-form-api#change) function that allows you to set any value you need.
<br />

---
<br />

## Q. Is there a way to divide my form into hierarchial (nested) subsections using only the schema?

**A.**

You can divide the form by using default [sub-form components](/mappers/sub-form).

```
{
  "component": "sub-form",
  "title": "Subform",
  "description": "This is a subform",
  "name": "subform",
  "fields": [
    {
      "name": "carrot",
      "label": "Carrot",
      "component": "text-field"
    }
  ]
}
```

Or you can easily implement your own component:

```jsx
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Section = ({fields}) => {
   const { renderForm } = useFormApi();

   return (<div>
    {renderForm(fields)}
  </div>);
}
```
<br />

---
<br />

## Q. I see 'useField must be used inside of a Form' component error when using DDF

**A.** You have probably mixed different DDF modules. Please see [optimization](/optimization) page.
<br />

---
<br />

## Q. Using conditions in FieldArray

**A.** To use conditions in FieldArray correctly, you have to use the right field index in `when` field. This can be achieved via using a [function](/schema/condition-schema#when) instead of a direct name. Functions in `when` field receive the current field, so you know the full name with the correct index.

</DocPage>
