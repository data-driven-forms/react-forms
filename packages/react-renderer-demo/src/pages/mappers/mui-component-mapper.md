import Grid from '@material-ui/core/Grid'
import ListOfContents from '@docs/list-of-contents';
import ListOfContentsMobile from '@docs/list-of-contents-select';

<Grid container item>

<ListOfContentsMobile file="mappers/mui-component-mapper" />
<Grid item xs={12} md={10}>

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

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="mappers/mui-component-mapper" />
</Grid>
</Grid>
