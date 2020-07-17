import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# Ant Design

<ComponentMapperBar prefix="ant" href="https://ant.design/" />

Ant Design provides components from [Ant Design Design System](https://ant.design/).

## Installation

```bash
npm install --save @data-driven-forms/ant-component-mapper
```
or
```bash
yarn add @data-driven-forms/ant-component-mapper
```

Ant Design has to be installed seperately. Please follow their [guidelines](https://ant.design/docs/react/introduce#Installation).

## ValidateOnMount

Ant Design provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.

## Layout Specification

Ant Design provides horizontal and vertical layouts for form. Layout can be specified by passing a `layout` prop to `formTemplate`. By default it is set to `vertical`.

```
<FormTemplate layout='horizontal' />}
```
</DocPage>
