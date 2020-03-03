import RawComponent from '@docs/raw-component';
import Grid from '@material-ui/core/Grid'

import '@docs/doc-components/component-mapper/form-fields-mapper-docs.css';
import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Introduction

In order to successfully render a form via FormRenderer you need to assign component mappers. Component mapper is an object of React components,
where key is a component identifier and value is the Component. The identifiers must be equivalent to `componentTypes` in your schema.

## FormTemplate

TODO

## ComponentMapper
Component mapper defines form inputs which can mutate the form state.

# Creating FormTemplate


# Creating componentMapper

Form fields mapper defines components that are rendered from input schema. Each component in mapper must have an unique key,
which corresponds to `componentType` in input schema. Keys names can be chosen but there are some predefined constants
which cover most common component types. Predefined components are also automatically enhanced and connected to the form state.

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

<RawComponent source="component-mapper/form-fields-mapper" />
</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/component-mapping" />
</Grid>
</Grid>
