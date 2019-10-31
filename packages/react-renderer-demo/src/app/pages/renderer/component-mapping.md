import RawComponent from '@docs/raw-component';
import Grid from '@material-ui/core/Grid'

import '@docs/doc-components/component-mapper/form-fields-mapper-docs.css';
import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

## Introduction

In order to successfully render a form via FormRenderer you need to assign component mappers. Component mapper is an object of React components,
where key is a component identifier and value is the Component. The identifiers must be equivalent to `componentTypes` in your schema.

There are two types of component mappers required by FormRenderer: `layoutMapper` and `formFieldsMapper`.


### LayoutMapper
In layout mapper you have to define your form layout components like form wrapper, form groups etc.


### FormFieldsMapper
Form fields mapper defines form inputs which can mutate the form state.

## Creating layoutMapper

Layout mapper components define the form layout. There are several different components which you have to implement. If you don't need
any special wrapper for the component, you can define it as `React.Fragment`.

```jsx
import { layoutComponents } from '@data-driven-forms/react-form-renderer';

const layoutComponents = {
  [layoutComponents.FORM_WRAPPER]: 'FormWrapper',
  [layoutComponents.BUTTON]: 'Button',
  [layoutComponents.COL]: 'Col',
  [layoutComponents.FORM_GROUP]: 'FormGroup',
  [layoutComponents.BUTTON_GROUP]: 'ButtonGroup',
  [layoutComponents.ICON]: 'Icon',
  [layoutComponents.ARRAY_FIELD_WRAPPER]: 'ArrayFieldWrapper',
  [layoutComponents.HELP_BLOCK]: 'HelpBlock',
  [layoutComponents.TITLE]: 'Title',
  [layoutComponents.DESCRIPTION]: 'Description',
}
```

Required components are: `FORM_WRAPPER`, `BUTTON`, `COL`, `FORM_GROUP` and `BUTTON_GROUP`. The rest is used only if you use certain
components in your schema.

Check the example below to see a simple implementation of layout components.

<RawComponent source="component-mapper/layout-mapper" />

### Layout components props

#### FormWrapper
|Prop|Type|Description|Value|Customizable|
|----|----|-----------|-----|------------|
|children|node|Content of the form||Based on form schema|

#### Col
|Prop|Type|Description|Value|Customizable|
|----|----|-----------|-----|------------|
|children|node|Wrapper around form field||Based on form schema|

#### Button
|Prop|Type|Description|Value|Customizable|
|----|----|-----------|-----|------------|
|label|string|Button label|"Submit", "Cancel", "Reset"|Yes, \`buttonsLabels\` FormRenderer prop|
|variant|string|Variant of button. Submit button will receive "primary" value |"primary", undefined|No|
|onClick|function|Button click event handler|function|Yes, \`onSubmit\`, \`onCancel\`, \`onReset\` FormRenderer props|

#### ButtonGroup
|Prop|Type|Description|Value|Customizable|
|----|----|-----------|-----|------------|
|children|node|Wrapper around form buttons||No|

#### FormGroup
|Prop|Type|Description|Value|Customizable|
|----|----|-----------|-----|------------|
|children|node|Form field group||Based on form schema|

#### Icon, Array Field Wrapper, Help Block
TO DO when array field docs are done


## Creating formFieldsMapper

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
  [componentTypes.SWITCH]: 'switch-field',
  [componentTypes.TEXTAREA]: 'textarea-field',
  [componentTypes.SELECT]: 'select-field',
}
```

<RawComponent source="component-mapper/form-fields-mapper" />
</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/component-mapping" />
</Grid>
</Grid>
