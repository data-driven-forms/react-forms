import Grid from '@material-ui/core/Grid'
import ListOfContents from '@docs/list-of-contents';
import ListOfContentsMobile from '@docs/list-of-contents-select';

<Grid container item>

<ListOfContentsMobile file="mappers/blueprint-component-mapper" />
<Grid item xs={12} md={10}>

# BlueprintJS

BlueprintJS mapper provides components from [Blueprint UI toolkit](https://blueprintjs.com/).

## Installation

Link to [NPM](https://www.npmjs.com/package/@data-driven-forms/blueprint-component-mapper).

```bash
npm install --save @data-driven-forms/blueprint-component-mapper
```
or
```bash
yarn add @data-driven-forms/blueprint-component-mapper
```

All Blueprint packages and styles have to be installed seperately. Please follow their [guidelines](https://blueprintjs.com/docs/#blueprint/getting-started).

## ValidateOnMount

Blueprint mapper provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.

## isRequired customization

Blueprint components do not use asterisks for indicating that fields are required, instead of it, it uses `(required)` string. This message can be customized via `requiredLabelInfo` prop passed to the default `formTemplate`. By default this message is set to `<span className="bp3-text-muted">(required)</span>`. Notice the className, that provides default Blueprint styles.

```jsx
import FormTemplate from '@data-driven-forms/blueprint-component-mapper/dist/cjs/form-template';

const FormTemplateWrapper = (props) => (
    <FormTemplate
        {...props}
        requiredLabelInfo={<span className="bp3-text-muted">(povinné)</span>}
    />
) // Czech translation
```

This content is accessible via

```jsx
import BlueprintContext from '@data-driven-forms/blueprint-component-mapper/dist/cjs/blueprint-context';
```

## Custom FormTemplates

If you are using a custom FormTemplate, wrap it in the `BlueprintContext` to provide the required label.

```jsx
import BlueprintContext from '@data-driven-forms/blueprint-component-mapper/dist/cjs/blueprint-context';

const FormTemplate = ({ formFields }) => {
    const { handleSubmit } = useFormApi();

    return (
        <form onSubmit={handleSubmit}>
            <BlueprintContext.Provider
                value={{ required: { <span className="bp3-text-muted">(required)</span> }}}
            >
                {formFields}
            </BlueprintContext.Provider>
            <Buttons />
        <form>
    )
}
```

## Contribution

You can contribute to this mapper [here](https://github.com/data-driven-forms/react-forms/tree/master/packages/blueprint-component-mapper).

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="mappers/blueprint-component-mapper" />
</Grid>
</Grid>
