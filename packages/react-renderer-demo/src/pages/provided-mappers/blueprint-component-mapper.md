import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# BlueprintJS

<ComponentMapperBar prefix="blueprint" href="https://blueprintjs.com/" />

BlueprintJS mapper provides components from [Blueprint UI toolkit](https://blueprintjs.com/).

## Installation

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

Blueprint components do not use asterisks for indicating that fields are required, instead of it, it uses `(required)` string. This message can be customized via `requiredLabelInfo` prop passed to the default `formTemplate`. By default this message is set to `<span className="bp4-text-muted">(required)</span>`. Notice the className, that provides default Blueprint styles.

```jsx
import { FormTemplate } from '@data-driven-forms/blueprint-component-mapper';

const FormTemplateWrapper = (props) => (
    <FormTemplate
        {...props}
        requiredLabelInfo={<span className="bp4-text-muted">(povinné)</span>}
    />
) // Czech translation
```

This content is accessible via

```jsx
import { BlueprintContext } from '@data-driven-forms/blueprint-component-mapper';
```

## Custom FormTemplates

If you are using a custom FormTemplate, wrap it in the `BlueprintContext` to provide the required label.

```jsx
import { BlueprintContext } from '@data-driven-forms/blueprint-component-mapper';

const FormTemplate = ({ formFields }) => {
    const { handleSubmit } = useFormApi();

    return (
        <form onSubmit={handleSubmit}>
            <BlueprintContext.Provider
                value={{ required: { <span className="bp4-text-muted">(required)</span> }}}
            >
                {formFields}
            </BlueprintContext.Provider>
            <Buttons />
        <form>
    )
}
```

</DocPage>
