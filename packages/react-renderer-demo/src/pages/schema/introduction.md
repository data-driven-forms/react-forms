import DocPage from '@docs/doc-page';

<DocPage>

# Schema Introduction

## Schema definition

A schema is an object consists of fields:

```jsx
{
    fields: []
}
```

Other attribues, such as title or description, can be used in [form templates](/components/form-template).

## Field definition

```jsx
{
    // required
    component: 'text-field',
    name: 'login',
    // optional
    actions: { ... },
    clearedValue: null,
    clearOnUnmount: true,
    condition: { ... },
    dataType: 'string',
    FieldProps: { ... },
    hideField: true,
    initializeOnMount: true,
    initialValue: 'default-login',
    resolveProps: (props) => ({ label: props.label || 'default label' }),
    validate: [ ... ],
    // + component specific attributes
    ...componentSpecificAttributes
}
```

### component (required)

*string*

`component` is a string value representing used component. Available options depends on the component mapper. Data Driven Forms automatically checks if the component is available, if not, it shows an error message. You can use [componentTypes](/schema/constants#componenttypes) to prevent typos. This attribute is not required for fields of these components: `wizard`, `field-array` and `tabs` as these fields include only special components with no implementation.

---

### name (required)

*string*

`name` represents the variable the form value is stored in. You can use [dot notation](https://final-form.org/docs/final-form/field-names) to create nested objects.

```jsx
{
    ...,
    name: 'person.name'
}
```

will be transformed to

```jsx
{
    person: {
        name: 'value'
    }
}
```

---

### actions

*object*

An object that allows to map other properties to globally defined actions. For example, a select has lazy loaded option and with this you can define parameters for the function and keep them in a string format. Read more [here](/mappers/action-mapper).

---

### clearedValue

*any*

A value that will be used if the field is cleared. Read more [here](/schema/cleared-value).

---

### clearOnUnmount

*bool*

When `true`, the value will be cleared after the component is unmounted. Read more [here](/schema/clear-on-unmount)

---

### condition

*object* | *array*

`condition` allows to hide/show field when a [condition](/schema/condition-schema) is fulfilled.

Example:

```jsx
{
    ...,
    condition: {
        when: 'first-name',
        is: 'Douglas'
    }
}
```

A field with this configuration will be shown only if the first name is Douglas.

There are multiple condition types: [and](/schema/and), [or](/schema/or), [not](/schema/not), [sequence](/schema/condition-sequence) that can be [nested](/schema/condition-nesting).

And there are multiple matchers: [is](/schema/is), [isEmpty](/schema/is-empty), [isNotEmpty](/schema/is-not-empty), [pattern](/schema/pattern). Some of these matchers can be inverted by using [notMatch](/schema/not-match).

There are also two actions that can be binded to conditions: [set](/schema/condition-set) and [visible](/schema/condition-visible).

---

### dataType

one of strings: *integer | float | number | boolean | string*

Data type sets the type the value will be converted to. Read more [here](/schema/data-types).

---

### FieldProps

*object*

You can pass additional [Final Form FieldProps](https://final-form.org/docs/react-final-form/types/FieldProps) via FieldProps object. This prop is made to avoid conflicts between Final Form props and component props.

---

### hideField

*bool*

When `true`, then this will be hidden by CSS. The value will be still registered and submitted.

---

### initializeOnMount

*bool*

When `true`, the value will be re-initialized every time the component is mounted. Read more [here](/schema/initialize-on-mount).

---

### initialValue

*any*

Sets an initial value of the field. Read more [here](https://final-form.org/docs/react-final-form/types/FieldProps#initialvalue).

---

### resolveProps

*function (props, {meta, input}, formOptions) => props*

**Only applicable for fields connected to the form state.**

A function allowing to compute field properties from the current state of the field. Read more [here](/schema/resolve-props).

---

### validate

*array*

`validate` array sets up validation of the field. It is an array of objects/functions:

**object**

```jsx
{
    ...,
    validate: [{type: 'required'}]
}
```

Type is one of our provided validators: [required](/schema/required-validator), [length](/schema/length-validator), [URL](/schema/url-validator), [pattern](/schema/pattern-validator), [number value](/schema/number-value-validator). You can use [validatorTypes](/schema/constants#validatortypes) to prevent typos.

Or you can implement your own via creating a [validator mapper](/mappers/validator-mapper).

**function**

You can pass a [custom function](/schema/custom-validator):

```jsx
{
    ...,
    validate: [function]
}
```

This also supports using [async functions](/schema/async-validator).

---

### componentSpecificAttributes

Each component defines its required and optional props. Read more [here](/provided-mappers/component-api).

```jsx
{
    component: 'text-field',
    name: 'password',
    label: 'Enter password', // component defined prop
    type: 'password', // component defined prop
    helperText: 'Please enter your password' // component defined prop
}
```

</DocPage>
