[![Data Driven Form logo](images/logo.png)](https://data-driven-forms.org/)

Data Driven Forms is a React library used for rendering and managing forms with a lot of provided features based on [React Final Form](https://github.com/final-form/react-final-form).

:question: Why to use Data Driven Forms? :question:
- All forms shared the same functionality!
- Components are controlled in one place!
- You can easily migrate to different sets of components!
- All functionality is provided (see below!)

:tada: Features :tada:
- Easily readable schema, you don't need to know any HTML or JS to be able to write your own form schemas!
- You can use your own components or use one of our provided mappers ([PatternFly 3](https://patternfly-react.surge.sh/patternfly-3/index.html), [PatternFly 4](https://patternfly-react.surge.sh/patternfly-4/) or [Material-UI](https://material-ui.com/)!)
- Form state managing out-of-the-box (including error states!)
- Fully customizable (you can use your own buttons, actions, etc.)!
- Conditional fields!
- Custom field validation with basic set included!
- Datatype validation!
- Cross-field validation!
- Asynchronous validation supported!
- Supporting Wizard forms!
- Supporting Mozzila form schema!
- ... and a lot more!

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

Used by [ManageIQ](http://manageiq.org/), Red Hat Cloud Services.

**Table of Contents**

- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [PatternFly 3 Mapper](#patternfly-3-mapper)
  - [PatternFly 4 Mapper](#patternfly-4-mapper)
  - [Material-UI Mapper](#material-ui-mapper)
- [Usage](#usage)
- [Basic provided components](#basic-provided-components)
- [Documentation](#documentation)
- [Useful links](#useful-links)
- [Contribution](#contribution)
- [LICENSE](#license)

### Installation

You neet to add React Form Renderer

#### [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)

```console
$ npm install @data-driven-forms/react-form-renderer -S
```

```console
$ yarn add @data-driven-forms/react-form-renderer
```

Optionally you can install one of provided mappers:

#### [PatternFly 3 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper)

```console
$ npm install @data-driven-forms/pf3-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf3-component-mapper
```

#### [PatternFly 4 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)

```console
$ npm install @data-driven-forms/pf4-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf4-component-mapper
```

#### [Material-UI Mapper](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper)

```console
$ npm install @data-driven-forms/mui-component-mapper -S
```

```console
$ yarn add @data-driven-forms/mui-component-mapper
```

### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';

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
    formFieldsMapper={formFieldsMapper}
    layoutMapper={layoutMapper}
    onSubmit={console.log}
  />
)
```

### Basic provided components

Data Driven Forms supports all kinds of component, basic set is consisted of:

- Text input
- Text area
- Checkbox (Multiple checkboxes)
- Select (dropdown)
- Switch
- Radio buttons
- Date picker
- Time picker
- Tabs
- Sub-form
- Wizard

### Documentation

Please use our [documentation site](https://data-driven-forms.org/). In case of any problem, you can access documentation files directly in GitHub:

- [Documentation pages](packages/react-renderer-demo/src/docs-components/)
  - [Form renderer API](packages/react-renderer-demo/src/docs-components/renderer-api.md)
  - [Components API](packages/react-renderer-demo/src/docs-components/component-api.md)
  - [Components mapping](packages/react-renderer-demo/src/docs-components/component-mapping.md)
  - [Field provider](packages/react-renderer-demo/src/docs-components/field-provider.md)

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [PatternFly 3 Design documentation](https://www.patternfly.org/v3/)
- [PatternFly 4 Design documentation](https://www.patternfly.org/v4/)
- [Material-UI documentation](https://material-ui.com/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [PatternFly 3 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper)
  - [PatternFly 4 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)
  - [MaterialUI Mapper](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper)
- Examples of schemas (PatternFly 3)
  - [ManageIQ Form Components](https://github.com/ManageIQ/manageiq-ui-classic/tree/master/app/javascript/components)

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0