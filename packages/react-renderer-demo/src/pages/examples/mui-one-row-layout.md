import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# MUI one row layout

This example show how to place two fields in the same row. **Only for MUI mapper**.
Other mappers can have similar solutions.

---

Each MUI component mapper component is wrapped in [Grid](https://material-ui.com/components/grid/#grid) component by default and this component is configurable via `FormFieldGridProps` object you can pass via schema - this object is of the same shape as props for the Grid component.

```jsx
{
    name: "first-name",
    label: "First name",
    component: componentTypes.TEXT_FIELD,
    FormFieldGridProps: { xs: 6 },
    isRequired: true,
    validate: [
        {
        type: validatorTypes.REQUIRED
        }
    ]
}
```

Please, don't forget that `<Grid item/>` has to rendered inside `<Grid container/>`. Components that contain nested fields in the MUI mapper are all using the Container component by default.

## Preview

<CodeExample source="components/examples/mui-one-row-layout" mode="preview" />

</DocPage>