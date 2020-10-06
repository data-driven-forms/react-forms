import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Clear on unmount

*boolean*

When using dynamic forms where more fields share the same name, the value is preserved when a user switches the field. You can disable this behavior by setting 
`clearOnUnmount` option in the renderer component or in the schema of the field. The option in the schema has always higher priority. (When 
`clearOnUnmount` is set in the renderer and the field has it this attribute set to `false`, the field value will not be cleared.)

## Examples

### Form example

<CodeExample source="components/clear-on-unmount" mode="preview" />


### Form level configuration

```jsx
<FormRenderer
  FormTemplate={ formTemplate }
  componentMapper={ componentMapper }
  schema={ schema }
  onSubmit={ submit }
  clearOnUnmount
/>
```

### Field level configuration

```jsx
{
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field_1',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field_2',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something else',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field_3',
  label: 'Value of this field will not be cleared after unmounting! Be aware!',
  clearOnUnmount: false, // default value
  condition: {
    when: 'something',
    is: 'something else and something',
  },
},
```

</DocPage>
