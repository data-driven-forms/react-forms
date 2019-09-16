import { NavLink } from 'react-router-dom';

### Form Renderer API

Form Renderer provides a lot of customization via props.


#### Required props

|Prop|Type|Description|
|----|:--:|----------:|
|<NavLink to="/renderer/component-mapping">formFieldsMapper</NavLink>|object|Defines types of form field components. Field components can change the state of the form.|
|<NavLink to="/renderer/component-mapping">layoutMapper</NavLink>|object|Defines types of layout components, which can't change the state of the form.|
|onSubmit|func|A submit callback which receives two arguments: `values` and `formApi`.|
|schema|object|A schema which defines structure of the form.|

#### Optional props

|Prop|Type|Description|Default|
|----|:--:|----------:|------:|
|buttonClassName|string|Class which will be given to the buttons wrapper.|{ }|
|buttonsLabels|object|You can specify custom labels for all three form buttons.|`{submit: 'Submit', cancel: 'Cancel', reset: 'Reset'}`|
|buttonOrder|array of strings|You can specify the order of the form buttons.|`[ 'submit', 'reset', 'cancel' ]`|
|<NavLink to="/renderer/form-controls">renderFormButtons</NavLink>|one of `[node, element, func]`|You can provide your own form buttons component. This component will receive all needed props.||
|<NavLink to="/renderer/unmounting">clearOnUnmount</NavLink>|bool|Will clear values of unmounted components. You can also set this to specific component in the form schema.|false|
|canReset|bool|Show/hide reset button.|false|
|onReset|func|A reset callback. You don't need to manually clear the form values!||
|onCancel|func|A cancel callback, which receives `values` as the first argument.||
|onStateUpdate|func|A function which will be called with every form update, i.e. `({ values }) => setValues(values)`||
|disableSubmit|array of strings|You can specify a form attributes (see [here](https://final-form.org/docs/final-form/types/FormState)) which will make the submit button disabled. |[ ]|
|initialValues|object|An object of fields names as keys and values as their values.||
|schemaType|one of `['mozilla', 'miq', 'default']`|Data driven forms includes two basic parsers: mozilla and manageiq service dialogs.|'default'|
|showFormControls|bool|You can disable showing form buttons. Use it with wizard component which has its own buttons.|true|
|subscription|object|You can pass your own [subscription](https://final-form.org/docs/react-final-form/types/FormProps#subscription), which will be added to default settings.|`{ pristine: true, submitting: true, valid: true }`|
|uiSchema|object|Use when you need to use mozilla schema.|{ }|
|<NavLink to="/renderer/validators">validate</NavLink>|func|A function which receives all form values and returns an object with errors.||

### Schema

The root object of the schema represents the <NavLink to="/renderer/component-mapping#formwrapper">Form</NavLink> component, which accepts only these three props:

|Prop|Type|Description|
|----|:--:|----------:|
|label, title|node|<NavLink to="/renderer/component-mapping#title">Title</NavLink> of the form. Optional.|
|description|node|<NavLink to="/renderer/component-mapping#description">Description</NavLink> of the form. Optional.|
|fields|array of objects|<NavLink to="/renderer/component-api">Components</NavLink> of the form. Required!|

#### Example

```javascript
schema = {
  title: 'Your name',
  description: 'Add your name',
  fields: [{
    name: 'userName',
    label: 'Your name is',
    component: componentTypes.TEXT_FIELD,
  }]
};
```
