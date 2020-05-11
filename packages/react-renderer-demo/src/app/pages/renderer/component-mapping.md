import CodeExample from '@docs/code-example'
import Grid from '@material-ui/core/Grid'

import ListOfContents from '@docs/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# ComponentMapper

In order to successfully render a form via FormRenderer you need to assign component mappers. Component mapper is an object of React components,
where key is a component identifier and value is the Component. The identifiers must be equivalent to `componentTypes` in your schema.

## Creating componentMapper

Component mapper defines components that are rendered from input schema. Each component in mapper must have an unique key,
which corresponds to `componentType` in the schema. Keys names can be chosen but there are some predefined constants
which cover most common component types.

```jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const componentTypes = {
  [componentTypes.TEXT_FIELD]: 'text-field',
  [componentTypes.CHECKBOX]: 'checkbox',
  [componentTypes.SUB_FORM]: 'sub-form',
  [componentTypes.RADIO]: 'radio',
  [componentTypes.TABS]: 'tabs',
  [componentTypes.TAB_ITEM]: 'tab-item',
  [componentTypes.DATE_PICKER]: 'date-picker',
  [componentTypes.TIME_PICKER]: 'time-picker',
  [componentTypes.WIZARD]: 'wizard',
  [componentTypes.SWITCH]: 'switch',
  [componentTypes.TEXTAREA]: 'textarea',
  [componentTypes.SELECT]: 'select',
  [componentTypes.PLAIN_TEXT]: 'plain-text',
}
```

You have two options how to connect your component to the form state.

### useFieldApi

First, you can use `useFieldApi` hook.

This hook needs `name`, in case of special input types which are using checked as the input value (checbkoxes, switches) you have to assign `type: checkbox`. The hook will return all field props, including input and meta. [TODO: LINK TO WHAT IS INPUT AND META]

```jsx
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

...

const { input, isDisabled, label, helperText, description, meta } = useFieldApi(props);
```

### FieldProvider

Or you can import `FieldProvider` component from Data Driven Forms. This component needs to obtain `render` or `Component` prop.


```jsx
import { FieldProvider } from '@data-driven-forms/react-form-renderer'

<FielProvider Component={TextField}>

// or

<FielProvider render={({input, meta, ...props}) => <TextField {...props} input={input} meta={meta}>}>
```

## Example

Below, you can see an basic implementation of custom component mapper:
<br />


<CodeExample 
  source="components/component-mapper/form-fields-mapper"
  mode="preview"
/>

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/component-mapping" />
</Grid>
</Grid>
