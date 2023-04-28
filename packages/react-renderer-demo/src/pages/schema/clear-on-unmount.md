import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# clearOnUnmount

*boolean*

When using dynamic forms where more fields share the same name, the value is preserved when a user switches the field. 

You can disable this behavior by setting `clearOnUnmount` option in the renderer component, or in the schema of the field. 

The option in the schema has always higher priority. (When `clearOnUnmount` is set to `ture` in the renderer, and this attribute is set to `false` in the schema of the the field, the field value will not be cleared.)

<br/>

## Examples

### Form example

<CodeExample source="components/clear-on-unmount" mode="preview" />

<br/>

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

<br/>

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
