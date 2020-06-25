import DocPage from '@docs/doc-page';

<DocPage>

# Introduction

```jsx
{
    // required
    component: '',
    name: '',
    // optional
    validate: [],
    clearedValue: null,
    hideField: true,
    initializeOnMount: true,
    clearOnUnmount: true,
    actions: {}
    // + component specific attributes
}
```

## Validate

You need to provide a `validate` array in the schema to add validation to your form fields.

A item of the validate array can be:
* a) object containing type and other specific configuration attributes (see validators description)
* b) function

</DocPage>
