import DocPage from '@docs/doc-page';
import InputMeta from '../input-meta.md';
import CodeExample from '@docs/code-example';

<DocPage>

# Resolve props

*function (props, {meta, input}, formOptions) => props*

**Only applicable for fields connected to the form state.**

A function allowing to compute field properties from the current state of the field.

## Schema

```jsx
const schema = {
    fields: [{
        component: 'text-field',
        resolveProps: (props, {meta, input}, formOptions) => ({ helperText: input.value ? 'You set a value' : 'No value' })
    }]
}
```

## Arguments

### Props

All field props passed in the schema.

### Meta and input

<InputMeta />

### FormOptions

Object containing access to the form state. Read more [here](/hooks/use-form-api).

## Rules

I. `resolveProps` cannot return `actions`. You can access `actions`'s code in the `resolveProps` prop if you need it.

II. Do not use `async` functions to get the props.

III. Do not trigger any side effects, as it could introduce bugs.

IV. `resolveProps` are merged together with following priority: `actions.resolveProps` (highest) > `field.resolveProps` > `mapper.resolveProps` (lowest)

## Global resolveProps

You can modify behavior for all components of the same type in your `componentMapper` via [global component props](/mappers/global-component-props).

```jsx
const componentMapper = {
    'text-field': {
        component: TextField,
        resolveProps: () => { ... }
    }
}
```

## Change props according to state of other components

You can get states of all other fields in the form via functions from `formOptions`. Don't forget to set the right [subscription](/components/renderer#optionalprops) to trigger `resolveProps` functions from changing other fields.

## Example

Following example shows how can be a behavior of components changed using `resolveProps`. In this example, the component will have different color and helper text after it is validated.

<CodeExample mode="preview" source="components/resolve-props" />

</DocPage>
