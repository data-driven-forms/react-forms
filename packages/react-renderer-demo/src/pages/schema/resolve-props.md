import DocPage from '@docs/doc-page';
import InputMeta from '../input-meta.md';
import CodeExample from '@docs/code-example';

<DocPage>

# resolveProps

*function (props, &#123;meta, input&#125;, formOptions) => props*


**resolveProps is only applicable for fields that connected to the form state.**

The function of resolveProps can compute field properties from the current state of the field. 

<br/>

## Example

```jsx
const schema = {
    fields: [{
        component: 'text-field',
        resolveProps: (props, {meta, input}, formOptions) => ({ helperText: input.value ? 'You set a value' : 'No value' })
    }]
}
```

<br/>

## Arguments

### props

`props` are all field properties passed in the schema.

<br/>

### meta and input

<br/>
<InputMeta />

<br/>

### formOptions

`formOptions` is an object containing access to the form state. 

[Read more.](/hooks/use-form-api)

<br/>

## Rules

Here are some rules about using `resolveProps`:

I. `resolveProps` cannot return `actions`. You can access `actions`'s code in the `resolveProps` props if you need it.

II. Do not use `async` functions to get the props.

III. Do not trigger any side effects, as it may introduce bugs.

IV. `resolveProps` are merged together with the following priority:

`actions.resolveProps` (highest) > `field.resolveProps` > `mapper.resolveProps` (lowest)

<br/>

## Global resolveProps

You can modify the behavior for all components of the same type in your `componentMapper` via [global component props](/mappers/global-component-props).

```jsx
const componentMapper = {
    'text-field': {
        component: TextField,
        resolveProps: () => { ... }
    }
}
```

<br/>

## Change props according to the state of other components

You can get states of all the other fields in the form via functions from `formOptions`. 

Don't forget to set the right [subscription](/components/renderer#subscription) to trigger `resolveProps` functions from the other changing fields.

<br/>

## Example

The following example shows how `resolveProps` changes a behavior of components . 

In this example, after the component is validated, it will have different colors and helper texts.

<CodeExample mode="preview" source="components/resolve-props" />

</DocPage>
