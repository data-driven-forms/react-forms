import CodeExample from '@docs/code-example';
import DocPage from '@docs/doc-page';
import InputMeta from '../input-meta.md';

<DocPage>

# Component mapper

In order to successfully render a form via FormRenderer you need to assign component mappers. Component mapper is an object of React components, where key is a component identifier and value is the component or an [object](/mappers/global-component-props) with the component and globally defined props. Each component in mapper must have an unique key, which corresponds to `componentType` in the schema. Keys names can be chosen but there are some predefined [constants](/schema/constants#componenttypes) which cover most common component types. Use these to prevent typos and inconsistencies.

## Creating form input components

A custom component is just a standard React component, that has access to two form state objects: **meta** and **input**.

---

<InputMeta />

---

### Connecting component to form state

You have two options how to connect your component to these objects:

### useFieldApi

**Recommended**

First, you can use [useFieldApi](/hooks/use-field-api) hook.

This hook needs `name`, in case of special input types which are using checked as the input value (checbkoxes, switches) you have to assign `type: checkbox`. The hook will return all field props, including input and meta.

```jsx
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

...

const { input, isDisabled, label, helperText, description, meta } = useFieldApi(props);
```

### FieldProvider

Or you can import [FieldProvider](/components/field-provider) component from Data Driven Forms. This component needs to obtain `render` or `Component` prop.

```jsx
import { FieldProvider } from '@data-driven-forms/react-form-renderer'

<FielProvider Component={TextField}>

// or

<FielProvider render={({input, meta, ...props}) => <TextField {...props} input={input} meta={meta}>}>
```

## Non-input form components

Data Driven Forms will render any component you pass to it, so you don't have to connect components to the form state in order to render it. Be aware that the component will receive metadata props such as `component`, `validate`, etc. You have to catch them before passing to other elements, otherwise it could throw DOM warnings.

```jsx
const Title = ({component, name, label, ...props }) => <h1 id={name} {...props}>{label}</h1>
```

### Form methods

Using [useFormApi](/hooks/use-form-api) you can get access to mutliple form methods without connecting a form field. Some most used methods are following:

**renderForm**

*(fields) => React.Element*

If you want to render fields from a component (`tabs`, `subform`, etc.) you can use `renderForm(fields)` function.

**getState**

*() => FormState*

Using `getState` components you get an access to the form state. Be aware of subscription - if your component is not subscribed to the form state, it won't be updated when the state is changed. See [FormSpy](/components/form-spy).

**change**

*(name, value) => void*

You can change value of any field using this function.

---

## Register component in component mapper

To be able to use your component in the schema, you need to register the component in your component mapper.

```jsx
import NewComponent from './new-component'

const componentMapper = {
  'new-component': NewComponent
}
```

And then use the component mapper in the form renderer component:

```jsx
import FormRenderer from '@data-driven-forms/react-form-renderer';

const Form = (props) => <FormRenderer
  componentMapper={componentMapper}
  {...props}
/>
```

## Example

Below, you can see an basic implementation of custom component mapper:

<CodeExample
  source="components/component-mapper/form-fields-mapper"
  mode="preview"
/>

---

## Generating a component mapper

If you are building a new component mapper inside the Data Driven Forms repository, you can use a terminal command in the root folder to generate a basic mapper for you:

```bash
yarn generate-template
```

Or you can get the files directly on [GitHub](https://github.com/data-driven-forms/react-forms/tree/master/templates).

</DocPage>