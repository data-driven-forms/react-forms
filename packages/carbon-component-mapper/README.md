[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fcarbon-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fcarbon-component-mapper)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

Carbon component mapper for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [More information](#more-information)
- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [Carbon Mapper](#carbon-mapper)
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

#### [Carbon Mapper](https://data-driven-forms.org/mappers/carbon-component-mapper)

```console
$ npm install @data-driven-forms/carbon-component-mapper -S
```

```console
$ yarn add @data-driven-forms/carbon-component-mapper
```


### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/carbon-component-mapper';

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
    FormTemplate={FormTemplate}
    onSubmit={console.log}
  />
)
```

### Basic provided components

Data Driven Forms supports all kinds of component, basic set is consisted of:

- [Text input](https://data-driven-forms.org/mappers/text-field?mapper=carbon)
- [Text area](https://data-driven-forms.org/mappers/textarea?mapper=carbon)
- [Checkbox](https://data-driven-forms.org/mappers/checkbox?mapper=carbon) ([Multiple checkboxes](https://data-driven-forms.org/mappers/checkbox-multiple?mapper=carbon))
- [Select (dropdown)](https://data-driven-forms.org/mappers/select?mapper=carbon)
- [Dual list select](https://data-driven-forms.org/mappers/dual-list-select?mapper=carbon)
- [Field array](https://data-driven-forms.org/mappers/field-array?mapper=carbon)
- [Switch](https://data-driven-forms.org/mappers/switch?mapper=carbon)
- [Radio buttons](https://data-driven-forms.org/mappers/radio?mapper=carbon)
- [Date picker](https://data-driven-forms.org/mappers/date-picker?mapper=carbon)
- [Time picker](https://data-driven-forms.org/mappers/time-picker?mapper=carbon)
- [Tabs](https://data-driven-forms.org/mappers/tabs?mapper=carbon)
- [Slider](https://data-driven-forms.org/mappers/slider?mapper=carbon)
- [Sub-form](https://data-driven-forms.org/mappers/sub-form?mapper=carbon)
- [Plain text](https://data-driven-forms.org/mappers/plain-text?mapper=carbon)
- [Wizard](https://data-driven-forms.org/mappers/wizard?mapper=carbon)

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
- [Carbon Mapper NPM](https://www.npmjs.com/package/@data-driven-forms/carbon-component-mapper)
- [Carbon Design System documentation](https://www.carbondesignsystem.com/)
- [Carbon React Compononents storybook](https://react.carbondesignsystem.com/)

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0