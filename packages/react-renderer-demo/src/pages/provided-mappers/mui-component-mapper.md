import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# MaterialUI mapper

<ComponentMapperBar prefix="mui" href="https://mui.com/" />

MaterialUI mapper provides components from [MaterialUI React library](https://mui.com/).

## Installation

```bash
npm install --save @data-driven-forms/mui-component-mapper
```
or
```bash
yarn add @data-driven-forms/mui-component-mapper
```

MaterialUI has to be installed seperately. Please follow their [guidelines](https://mui.com/getting-started/installation/).

## ValidateOnMount

MUI mapper provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.

</DocPage>
