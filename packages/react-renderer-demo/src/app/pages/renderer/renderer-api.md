import RouterLink from 'next/link';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Form Renderer API

Form Renderer provides a lot of customization via props.


## Required props

|Prop|Type|Description|
|----|:--:|----------:|
|<RouterLink href="/renderer/component-mapping"><Link href="/renderer/component-mapping">componentMapper</Link></RouterLink>|object|Defines types of form field components. Field components can change the state of the form.|
|<RouterLink href="/renderer/component-mapping"><Link href="/renderer/component-mapping">FormTemplate</Link></RouterLink>|Component|Components which defines a template of the form. This component receives two props from the renderer: `formFields` and `schema`. `formFields` is the content of the form. You should wrap this content into your `<form>` component and add form buttons.|
|onSubmit|func|A submit callback which receives two arguments: `values` and `formApi`.|
|schema|object|A schema which defines structure of the form.|

## Optional props

|Prop|Type|Description|Default|
|----|:--:|----------:|------:|
|<RouterLink href="/renderer/unmounting"><Link href="/renderer/unmounting">clearOnUnmount</Link></RouterLink>|bool|Will clear values of unmounted components. You can also set this to specific component in the form schema.|false|
|<RouterLink href="/renderer/cleared-value"><Link>clearedValue</Link></RouterLink>|any|Value that will be set to field with **initialValue** after deleting it. Useful for forms while editing.|undefined|
|onReset|func|A reset callback. You don't need to manually clear the form values!||
|onCancel|func|A cancel callback, which receives `values` as the first argument.||
|debug|func|A function which will be called with every form update, i.e. `({ values }) => setValues(values)`, please take a look [here](https://final-form.org/docs/react-final-form/types/FormProps#debug)||
|initialValues|object|An object of fields names as keys and values as their values.||
|subscription|object|You can pass your own [subscription](https://final-form.org/docs/react-final-form/types/FormProps#subscription), which will be added to default settings.|`{ pristine: true, submitting: true, valid: true }`|
|<RouterLink href="/renderer/validators"><Link href="/renderer/validators">validate</Link></RouterLink>|func|A function which receives all form values and returns an object with errors.||

# Schema

The root object of the schema represents the <RouterLink href="/renderer/component-mapping#formwrapper"><Link href="/renderer/component-mapping#formwrapper">Form</Link></RouterLink> component, that needs only this prop:

|Prop|Type|Description|
|----|:--:|----------:|
|fields|array of objects|<RouterLink href="/renderer/component-api"><Link href="/renderer/component-api">Components</Link></RouterLink> of the form. Required!|

You can use all other props in your `formTemplate` components.

## Example

```javascript
schema = {
  title: 'Your name', // you can extract this in formTemplate
  description: 'Add your name', // you can extract this in formTemplate
  fields: [{
    name: 'userName',
    label: 'Your name is',
    component: componentTypes.TEXT_FIELD,
  }]
};
```

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/renderer-api" />
</Grid>
</Grid>

