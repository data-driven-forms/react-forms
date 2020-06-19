import DocPage from '@docs/doc-page';

<DocPage>

# MaterialUI mapper

MaterialUI mapper provides components from [MaterialUI React library](https://material-ui.com/).

## Installation

Link to [NPM](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper).

```bash
npm install --save @data-driven-forms/mui-component-mapper
```
or
```bash
yarn add @data-driven-forms/mui-component-mapper
```

MaterialUI has to be installed seperately. Please follow their [guidelines](https://material-ui.com/getting-started/installation/).

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

## Contribution

You can contribute to this mapper [here](https://github.com/data-driven-forms/react-forms/tree/master/packages/mui-component-mapper).

</DocPage>
