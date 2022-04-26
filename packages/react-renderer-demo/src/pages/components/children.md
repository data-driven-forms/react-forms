import DocPage from '@docs/doc-page';

<DocPage>

# Children

[A prop](/components/renderer#children) to customize the form layout. Children render function receives the same props as `FormTemplate`:&nbsp;`formFields` and `schema`.

## Props

Children are supplied with `formFields` and `schema` props. If a child has one of `schema` or `formFields` prop explicitly set, the explicit props will be used.

```jsx

/**
 * The ChildComponent will receive schema and formFields props from the FormRenderer.
 */
<FormRenderer {...props}><ChildComponent/></FormRenderer>


/**
 * The ChildComponent will not receive schema prop from the FormRenderer! The schema prop will be equal to "Foo".
 * It will still receive the formFields prop from the renderer.
 */
<FormRenderer {...props}><ChildComponent schema="Foo"/></FormRenderer>
```

### formFields

*node*

Rendered fields of the form.

### schema

*object*

[Schema](/components/renderer#schema) from renderer. You can use it to extract a form title, description, or whatever you need.

## Children node minimal example

Check the [Form template documentation](/components/form-template) for detailed example.

```jsx
const CustomTemplate = ({hideButtons, formFields, schema}) => {
  const { handleSubmit } = useFormApi();
  return (
    <form onSubmit={handleSubmit}>
      { schema.title }
      { formFields }
      {!hideButtons && (
        <button type="submit">Submit</button>
      )}
    </form>
  )
}

const MyForm = (props) => {
  return (
    <FormRenderer
        componentMapper={simpleComponentMapper}
        onSubmit={handleFormSubmit}
        schema={formSchema}
        subscription={{values: true}}
        clearOnUnmount
    >
        <CustomTemplate hideButtons />
    </FormRenderer>
  )
}
```

## Children render function

Check the [Form template documentation](/components/form-template) for detailed examples.

```jsx
<FormRenderer
    componentMapper={simpleComponentMapper}
    onSubmit={handleFormSubmit}
    schema={formSchema}
    subscription={{values: true}}
    clearOnUnmount
>
    {({formFields, schema}) => (
      {/** Template implementation */}
    )}
</FormRenderer>
```

</DocPage>
