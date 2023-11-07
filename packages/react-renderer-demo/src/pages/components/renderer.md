import DocPage from '@docs/doc-page';

<DocPage>

# Form Renderer

Form renderer is the core component of Data Driven Forms. It is used to generate and render forms.

```jsx
import { FormRenderer } from '@data-driven-forms/react-form-renderer';

const App = () => (<FormRenderer
  onSubmit={onSubmit}
  schema={schema}
  componentMapper={componentMapper}
  FormTemplate={FormTemplate}
/>)
```

## Required props

### componentMapper

*object*

Defines types of form field components. Field components can change the state of the form.

You can use [globally defined attributes](/mappers/global-component-props).

[Read more](/mappers/custom-mapper).

---

### FormTemplate

*Component*

**Note** You have to pass at least one of `FormTemplate` or a `children` render function to render the fields.

A component that defines a template of the form. This component receives two props from the renderer: `formFields` and `schema`. `formFields` is the content of the form. You should wrap this content into your `<form>` component and add form buttons.

[Read more](/components/form-template).

---

### children

**Note** You have to pass at least one of `FormTemplate` or a `children` render function to render the fields.

*function*

Children render function. It serves the same purpose as `FormTemplate` prop. [Read more](/components/children).

---

### onSubmit

*(values, [formApi](/hooks/use-form-api)) => void*

A submit callback which receives two arguments: `values` and `formApi`.

[Read more](https://final-form.org/docs/react-final-form/types/FormProps#onsubmit).

---

### schema

*object*

A schema which defines structure of the form. Consists of [fields](/schema/introduction).

**Example**

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

---

## Optional props

### actionMapper

*object*

Action mapper allows to map functions as props.

[Read more](/mappers/action-mapper).

---

### clearOnUnmount

*boolean*

Will clear values of unmounted components. You can also set this to specific component in the form schema.

[Read more](/schema/clear-on-unmount).

---

### clearedValue

*any*

Value that will be set to field with **initialValue** after deleting it. Useful for forms while editing.

[Read more](/schema/cleared-value).

---

### conditionMapper

*object*

Condition mapper allows to map condition attributes to functions.

[Read more](/mappers/condition-mapper).

### onReset

*func*

A reset callback that refresh the form state to the initial state.

---

### onCancel

*(values) => void*

A cancel callback, which receives `values` as the first argument.

---

### debug

*(formState) => void*

A function which will be called with every form update, i.e. `({ values }) => setValues(values)`.

[Read more](https://final-form.org/docs/react-final-form/types/FormProps#debug)

---

### initialValues

*object*

An object of fields names as keys and values as their values.

**Example**

```jsx
initialValues={{ name: 'initial-name', nested: { value: 'neste-value' }}}
```

---

### schemaValidatorMapper

*object*

Schema validators mapper. You can control schemas of your components, validators and actions.

[Read more](/mappers/schema-validator-mapper).

---

### subscription

*object*

You can pass your own [subscription](https://final-form.org/docs/react-final-form/types/FormProps#subscription), which will be added to default settings.

**Default subscription**

`{ pristine: true, submitting: true, valid: true }`

---

### validate

*(values) => void | Errors*

A function which receives all form values and returns an object with errors.

[Read more](https://final-form.org/docs/react-final-form/types/FormProps#validate).

---

### validatorMapper

*object*

A mapper containing custom validators, it's automatically merged with the default one.

[Read more](/mappers/validator-mapper).


</DocPage>