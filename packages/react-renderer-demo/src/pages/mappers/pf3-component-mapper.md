import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';
import Alert from '@material-ui/lab/Alert';

<DocPage>

# PatternFly 3 mapper

<ComponentMapperBar prefix="pf3" href="https://www.patternfly.org/v3/" />

<Alert severity="error">With the future release of version 3.0 we are going to exclude PatternFly 3 mapper from our main branch. PF3 mapper won't be a part of this documenation and it won't get any new updates. The mapper will be moved to a seperate branch, so specific updates/bufixes will be still possible, but not guaranteed. (Version 3 should not include any breaking changes, so the mapper should work fine.) Please consider migrating to a different mapper, as PF3 does not support React 17+.</Alert>

<br />

PatternFly 3 mapper provides components from [PatternFly 3 design system](https://www.patternfly.org/v3/).

## Installation

```bash
npm install --save @data-driven-forms/pf3-component-mapper
```
or
```bash
yarn add @data-driven-forms/pf3-component-mapper
```

PatternFly 3 has to be installed seperately. Please follow their [guidelines](https://github.com/patternfly/patternfly-react/tree/patternfly-3#Setup).

## ValidateOnMount

PF3 mapper provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

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
