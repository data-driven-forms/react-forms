import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# PatternFly 3 mapper

<ComponentMapperBar prefix="pf3" href="https://www.patternfly.org/v3/" />

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
