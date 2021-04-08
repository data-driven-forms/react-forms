import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# Semantic UI react

<ComponentMapperBar prefix="suir" href="https://react.semantic-ui.com/" />

Semantic UI react mapper provides components from [Semantic UI react](https://react.semantic-ui.com/).

## Installation

```bash
npm install --save @data-driven-forms/suir-component-mapper
```
or
```bash
yarn add @data-driven-forms/suir-component-mapper
```

Semantic UI react library is an external dependency and will not be installed with the mapper. Make sure that [Semantic UI react](https://react.semantic-ui.com/usage) is installed in your project.

## ValidateOnMount

Semantic UI react mapper provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.

## Components customization
All components accept all other props described in Semantic UI react documentation. You can find prop names for each component in component definition section of this documentation when the SUIR mapper is selected. You can start by looking at [checkbox example](/provided-mappers/checkbox?mapper=suir).

To avoid re-refining common customization for each field in schema, check out the [global component props](/mappers/global-component-props) section.

</DocPage>
