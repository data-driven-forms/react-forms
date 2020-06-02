import Grid from '@material-ui/core/Grid'
import CodeExample from '@docs/code-example';

import ListOfContents from '@docs/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Initialize On Mount

Data Driven Forms provides a way how you can easily initialized a field when the field is mounted (re-mounted).

Just pass a `initializeOnMount` prop and set it to `true`.

The field will use the `initialValue` set in the schema ([initialValue](/renderer/component-api#formgroupwrappedcomponents)).

`initialValue` has higher priority than a value from `initialValues`.

## Example


```jsx
{
  component: componentTypes.TEXT_FIELD,
  name: 'name',
  initializeOnMount: true,
  initialValue: 'this value will be set'
}
```

## When to use it?

This feature comes handy if you need change a value when an user traverses a form, which shows and hides fields, and the value is not set by the user. Very useful case is used it wizard forms, where you can set different value for the same input according the way the user went in the wizard form by using this option combined with [hideField](/renderer/component-api#commonpropsforallformfields) prop.

<CodeExample source="components/initialize-mount" mode="preview" />

## Clear the value

If you need clear the value after unmounting, you can do it by using [clearOnUnmount](/renderer/unmounting).

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/initialize-mount" />
</Grid>
</Grid>
