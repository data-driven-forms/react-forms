[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fant-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fant-component-mapper)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](images/logo.png)](https://data-driven-forms.org/)

Ant Design component mapper for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [More information](#more-information)
- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [ANT mapper](#ant-mapper)
- [Usage](#usage)
- [Basic provided components](#basic-provided-components)
- [Useful links](#useful-links)
- [Contribution](#contribution)
- [LICENSE](#license)

### More information

For more information please check the root [repository](https://github.com/data-driven-forms/react-forms) or our [documentation page](https://data-driven-forms.org/).

### Installation

You need to add React Form Renderer

#### [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)

```console
$ npm install @data-driven-forms/react-form-renderer -S
```

```console
$ yarn add @data-driven-forms/react-form-renderer
```

Optionally you can install one of provided mappers:

#### [ANT mapper](https://www.npmjs.com/package/@data-driven-forms/ant-component-mapper)

```console
$ npm install @data-driven-forms/ant-component-mapper -S
```

```console
$ yarn add @data-driven-forms/ant-component-mapper
```


### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, layoutMapper } from '@data-driven-forms/ant-component-mapper';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Your name'
  }]
}

const Form = () => (
  <FormRenderer
    schema={schema}
    componentMapper={componentMapper}
    layoutMapper={layoutMapper}
    onSubmit={console.log}
  />
)
```

### Basic provided components

Data Driven Forms supports all kinds of component, basic set is consisted of:

- [Text input](https://data-driven-forms.org/mappers/text-field?mapper=ant)
- [Text area](https://data-driven-forms.org/mappers/textarea?mapper=ant)
- [Checkbox](https://data-driven-forms.org/mappers/checkbox?mapper=ant) ([Multiple checkboxes](https://data-driven-forms.org/mappers/checkbox-multiple?mapper=ant))
- [Select (dropdown)](https://data-driven-forms.org/mappers/select?mapper=ant)
- [Dual list select](https://data-driven-forms.org/mappers/dual-list-select?mapper=ant)
- [Field array](https://data-driven-forms.org/mappers/field-array?mapper=ant)
- [Switch](https://data-driven-forms.org/mappers/switch?mapper=ant)
- [Radio buttons](https://data-driven-forms.org/mappers/radio?mapper=ant)
- [Date picker](https://data-driven-forms.org/mappers/date-picker?mapper=ant)
- [Time picker](https://data-driven-forms.org/mappers/time-picker?mapper=ant)
- [Tabs](https://data-driven-forms.org/mappers/tabs?mapper=ant)
- [Slider](https://data-driven-forms.org/mappers/slider?mapper=ant)
- [Sub-form](https://data-driven-forms.org/mappers/sub-form?mapper=ant)
- [Plain text](https://data-driven-forms.org/mappers/plain-text?mapper=ant)
- [Wizard](https://data-driven-forms.org/mappers/wizard?mapper=ant)

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [Material-UI documentation](https://mui.com/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [MaterialUI Mapper](https://www.npmjs.com/package/@data-driven-forms/ant-component-mapper)

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0