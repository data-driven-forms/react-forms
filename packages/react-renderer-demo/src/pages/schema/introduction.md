import DocPage from '@docs/doc-page';

<DocPage>

# Schema Introduction

<br/>

## Schema definition

A schema is an object consists of `fields`:

```jsx
{
    fields: []
}
```

Other attributes, such as `title` or `description`, can be used in [form templates](/components/form-template).

<br/>

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
<br/>

### component (required)

*string*

The value of `component` is a *string* that represents used component. Available options depend on the [component mapper](/mappers/custom-mapper#Componentmapper). 

**Data Driven Forms** automatically checks if the component is available; if not, it shows an error message. You can use [componentTypes](/schema/constants#componenttypes) to prevent typos. 

This attribute is not required for the first level of the `fields` in the following components, as this first level of the `fields` is implemented with special predefined components: 

`wizard`, `field-array`, `tabs`

<br/>

Here is an example for `wizard`:
``` jsx
const schema = {
  fields: [{
    component: 'wizard', // here you define the wizard component
    name: 'wizard-field',
    ...
    // first level of this `fields` are the direct children of wizard - wizard-steps
    fields: [{
      name: 'step-1',
      title: 'Foo',
      ...
      fields: [{
        // these are not children of the wizard step and you require a component attribute again
        component: 'text-field',
        name: 'bar',
        ...
      }]
    }]
  }]
}
```

---

### name (required)

*string*

`name` represents the variable that stores the form value. You can use [dot notation](https://final-form.org/docs/final-form/field-names) to create nested objects.

```jsx
{
    ...,
    name: 'person.name'
}
```

 The code above will be automatically transformed to:

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

The *object* of actions maps other properties to globally defined actions. 

For example, a `select` has lazy loaded option. With actions, you can define parameters for the function, and keep them in a *string* format. 

[Read more.](/mappers/action-mapper)


---

### clearedValue

*any*

If the field is cleared, clearedValue defines the value that will be used.

[Read more.](/schema/cleared-value)


---

### clearOnUnmount

*bool*

When clearOnUnmount is `true`, after the component is unmounted, the value will be cleared.

[Read more](/schema/clear-on-unmount).

---

### condition

*object* | *array*

When a [`condition`](/schema/condition-schema) is fulfilled, it can show or hide a component.

Here is an example:

```jsx
{
    ...,
    condition: {
        when: 'first-name',
        is: 'Douglas'
    }
}
```

In this example, only if the `first-name` is `Douglas`, the field appears.

<br/>

The following multiple condition types can be [nested](/schema/condition-nesting): 

[`and`](/schema/and), [`or`](/schema/or), [`not`](/schema/not), [`sequence`](/schema/condition-sequence).

<br/>

The following are multiple matchers: 

[`is`](/schema/is), [`isEmpty`](/schema/is-empty), [`isNotEmpty`](/schema/is-not-empty), [`pattern`](/schema/pattern). 

You can use [`notMatch`](/schema/not-match) to invert matchers.

<br/>

The following actions can be binded to conditions: 

[`set`](/schema/condition-set), [`visible`](/schema/condition-visible).


---

### dataType

*string*

The value of dataType must be one of the following strings: 

`"integer"`, `"float"`, `"number"`, `"boolean"` or `"string"`.

<br/>

The value of this component will be converted to the type that dataType indicates.

[Read more.](/schema/data-types)


---

### FieldProps

*object*

You can pass additional [Final Form FieldProps](https://final-form.org/docs/react-final-form/types/FieldProps) via FieldProps object. This prop is made to avoid conflicts between Final Form props and component props.


---

### hideField

*bool*

When the hideField is `true`, CSS hides this filed. The value will be still registered and submitted.


---

### initializeOnMount

*bool*

When initializeOnMount is `true`, every time the component is mounted, the value will be re-initialized. 

[Read more.](/schema/initialize-on-mount)


---

### initialValue

*any*

Sets an initial value of the field. 

[Read more.](https://final-form.org/docs/react-final-form/types/FieldProps#initialvalue)


---

### resolveProps

*function (props, &#123;meta, input&#125;, formOptions) => props*

**resolveProps is only applicable for fields that connected to the form state.**

The function of resolveProps can compute field properties from the current state of the field. 

[Read more.](/schema/resolve-props)


---

### validate

*array*

`validate` array sets up validation of the field. It is an array of the following objects or functions:

<br/>

**Object**

```jsx
{
    ...,
    validate: [{type: 'required', message: 'This field is required'}]
}
```

Type is one of our provided validators: 

[`REQUIRED`](/schema/required-validator), [`[MIN|MAX|EXACT]_LENGTH`](/schema/length-validator), [`URL`](/schema/url-validator), [`PATTERN`](/schema/pattern-validator) or [`[MIN|MAX]_NUMBER_VALUE`](/schema/number-value-validator). 

You can use [validatorTypes](/schema/constants#validatortypes) to prevent typos.

You can also implement your own validator by creating a [validator mapper](/mappers/validator-mapper).

<br/>

**Message**

All provided validators allows you to change the message via [message attribute](/schema/custom-validator-message); you can also set the message [globally](/schema/overwriting-default-message).

By default, each validator provides a default message in English.

<br/>

**Function**

You can pass a [custom function](/schema/custom-validator) as the following example:

```jsx
{
    ...,
    validate: [function]
}
```

This also supports using [async functions](/schema/async-validator).


---

### componentSpecificAttributes

Each component defines its required and optional props.

```jsx
{
    component: 'text-field',
    name: 'password',
    label: 'Enter password', // component defined prop
    type: 'password', // component defined prop
    helperText: 'Please enter your password' // component defined prop
}
```

[Read more.](/provided-mappers/component-api)

</DocPage>
