import Grid from '@material-ui/core/Grid'
import RawComponent from '@docs/raw-component';

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

## Description

When using dynamic forms where more fields share the same name, the value is preserved when a user switches the field. You can disable this behavior by setting 
`clearOnUnmount` option in the renderer component or in the schema of the field. The option in the schema has always higher priority. (When 
`clearOnUnmount` is set in the renderer and the field has it this attribute set to `false`, the field value will not be cleared.)

## Examples

### Form example

<RawComponent source="clear-on-unmount" />


### Form level configuration

```jsx
<FormRenderer
  layoutMapper={ layoutMapper }
  formFieldsMapper={ formFieldsMapper }
  schema={ schema }
  onSubmit={ submit }
  clearOnUnmount
/>
```

### Field level configuration

```jsx
{
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  key: 1,
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  key: 2,
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something else',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will not be cleared after unmounting! Be aware!',
  key: 3,
  clearOnUnmount: false, // default value
  condition: {
    when: 'something',
    is: 'something else and something',
  },
},
```

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/unmounting" />
</Grid>
</Grid>
