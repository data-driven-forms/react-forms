import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';
import Alert from '@mui/material/Alert';

<DocPage>

# MaterialUI mapper

<ComponentMapperBar prefix="mui" href="https://mui.com/" />

<br />

<Alert severity="warning">MUI component mapper is using MUI5. Check the migration guide below.</Alert>

<br />

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

## Migration to version 5

MaterialUI (known just as MUI now) released a version 5 that introduces a lot of new features and some breaking changes. Data Driven Forms follows this release with our integration in `mui-component-mapper`. Due to inability to release new version of packages independently, we are going to introduce new changes as a feature release to not disrupt any other mappers. We deeply apologise for any issues it can introduce, but we agreed that this is the best way that won't break any of our current workflows.

### Migration

#### Convert your app to use MUI 5

Please follow [official migration guide](https://mui.com/guides/migration-v4/). *Note: emotion packages are being installed by the mapper itself.*

#### Use new version of the mapper

Use `3.16.0` and higher versions ([check here](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper).)

<br />

**And that's it!**

<br />

`mui-component-mapper` itself does not require any additional migration steps!

Only if you are using `date-picker` or `time-picker`, you have to provide `LocalizationProvider` ([read more](https://mui.com/components/time-picker/#localization)), the components themselves do not longer contain it.

### Feedback

If you encounter any issues, please let us know in [our Issues section](https://github.com/data-driven-forms/react-forms/issues).

### What if I do not want to migrate

Please lock your `mui-component-mapper` version in `package.json`:

```diff
# package.json

- "@data-driven-forms/mui-component-mapper": "^3.15.7",
+ "@data-driven-forms/mui-component-mapper": "3.15.7",
```

For any future bug fixes, we will use `3.15.7` as a base version. (example: next bugfix would be `3.15.8` and these versions will be tagged as `deprecated` in the npm registry.)

In the near future, we will support bugfixes for Material-UI v4 mapper version, but no new features will be implemented. We are open to accept PRs by community. Also, this older version should work with the latest `react-form-renderer` at least until Data Driven Forms version 4 is released.

</DocPage>
