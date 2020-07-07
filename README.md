[![codecov](https://codecov.io/gh/data-driven-forms/react-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/data-driven-forms/react-forms)
[![CircleCI](https://circleci.com/gh/data-driven-forms/react-forms/tree/master.svg?style=svg)](https://circleci.com/gh/data-driven-forms/react-forms/tree/master)
[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer.svg)](https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer)

[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

Data Driven Forms is a React library used for rendering and managing forms with a lot of provided features based on [React Final Form](https://github.com/final-form/react-final-form).


:question: Why to use Data Driven Forms? :question:
- All forms shared the same functionality!
- Components are controlled in one place!
- You can easily migrate to different sets of components!
- All functionality is provided (see below!)

:tada: Features :tada:
- Easily readable schema, you don't need to know any HTML or JS to be able to write your own form schemas!
- You can use your own components or use one of our provided mappers ([PatternFly 3](https://patternfly-react.surge.sh/patternfly-3/index.html), [PatternFly 4](https://patternfly-react.surge.sh/patternfly-4/), [Material-UI](https://material-ui.com/) or [Ant Design](https://ant.design/)!)
- Form state managing out-of-the-box (including error states!)
- Fully customizable (you can use your own buttons, actions, etc.)!
- Conditional fields!
- Custom field validation with basic set included!
- Datatype validation!
- Cross-field validation!
- Asynchronous validation supported!
- Supporting Wizard forms!
- Supporting [Final Form Field Array](https://github.com/final-form/react-final-form-arrays)!
- ... and a lot more!

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [Material-UI Mapper](#material-ui-mapper)
  - [PatternFly 3 Mapper](#patternfly-3-mapper)
  - [PatternFly 4 Mapper](#patternfly-4-mapper)
  - [BlueprintJS Mapper](#blueprintjs-mapper)
  - [Semantic UI Mapper](#semantic-ui-mapper)
  - [Material-UI Mapper](#material-ui-mapper)
  - [Ant Design Mapper](#ant-design-mapper)
- [Usage](#usage)
  - [Custom mapper](#custom-mapper)
- [Basic provided components](#basic-provided-components)
- [Documentation](#documentation)
- [Useful links](#useful-links)
- [Development setup](#development-setup)
  - [Tests](#tests)
  - [Commits](#commits)
  - [Changes to documentation](#changes-to-documentation)
- [Contribution](#contribution)
- [LICENSE](#license)

### Installation

Add React Form Renderer

#### [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)

```console
$ npm install @data-driven-forms/react-form-renderer -S
```

```console
$ yarn add @data-driven-forms/react-form-renderer
```

Optionally you can install one of provided mappers:


#### [Material-UI Mapper](https://data-driven-forms.org/mappers/mui-component-mapper)

```console
$ npm install @data-driven-forms/mui-component-mapper -S
```

```console
$ yarn add @data-driven-forms/mui-component-mapper
```

#### [PatternFly 3 Mapper](https://data-driven-forms.org/mappers/pf3-component-mapper)

```console
$ npm install @data-driven-forms/pf3-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf3-component-mapper
```

#### [PatternFly 4 Mapper](https://data-driven-forms.org/mappers/pf4-component-mapper)

```console
$ npm install @data-driven-forms/pf4-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf4-component-mapper
```

#### [BlueprintJS Mapper](https://data-driven-forms.org/mappers/blueprint-component-mapper)

```console
$ npm install @data-driven-forms/blueprint-component-mapper -S
```

```console
$ yarn add @data-driven-forms/blueprint-component-mapper
```

#### [Semantic UI Mapper](https://data-driven-forms.org/mappers/suir-component-mapper)

```console
$ npm install @data-driven-forms/suir-component-mapper -S
```

```console
$ yarn add @data-driven-forms/suir-component-mapper
```

Component libraries in mappers are external dependencies. Make sure to install them in your bundles.

#### [Ant Design Mapper](https://www.npmjs.com/package/@data-driven-forms/ant-component-mapper)

```console
$ npm install @data-driven-forms/ant-component-mapper -S
```

```console
$ yarn add @data-driven-forms/ant-component-mapper
```

### Usage

In order to Data Driven Forms in your component you need the renderer and a component mapper, which provides component mapper and form template.

```jsx
import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';

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

#### Custom mapper

You can also use custom mapper.

```jsx
import React from 'react';
import FormRenderer, { componentTypes, useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = props => {
  const {label, input, meta, ...rest} = useFieldApi(props)
  return (
    <div>
      <label htmlForm={input.name}>{label}</label>
      <input {...input} {...rest} id={input.name}/>
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'custom-type': TextField
}

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Your name'
    type: 'search',
  }]
}
```

For more information, please check [this page](https://data-driven-forms.org/renderer/component-mapping).

Mappers can be also generated by using `yarn generate-template` [command](https://data-driven-forms.org/renderer/development-setup#generatingamappertemplate).

### Basic provided components

Data Driven Forms supports all kinds of component, basic set is consisted of:

- Text input
- Text area
- Checkbox (Multiple checkboxes)
- Select (dropdown)
- Dual list select
- Field array
- Switch
- Radio buttons
- Date picker
- Time picker
- Tabs
- Slider
- Sub-form
- Wizard

Any other components can be added to mapper and renderer with the form renderer. Existing components can be also overriden.

### Documentation

Please use our [documentation site](https://data-driven-forms.org/). In case of any problem, you can access documentation files directly in GitHub.

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [PatternFly 3 Design documentation](https://www.patternfly.org/v3/)
- [PatternFly 4 Design documentation](https://www.patternfly.org/v4/)
- [Material-UI documentation](https://material-ui.com/)
- [Ant Design documentation](https://ant.design/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [PatternFly 3 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper)
  - [PatternFly 4 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)
  - [MaterialUI Mapper](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper)
  - [Ant Design Mapper](https://www.npmjs.com/package/@data-driven-forms/ant-component-mapper)
- Examples of schemas (PatternFly 3)
  - [ManageIQ Form Components](https://github.com/ManageIQ/manageiq-ui-classic/tree/master/app/javascript/components)

### Development setup

Data Driven Forms is a monorepo which uses [Lerna](https://github.com/lerna/lerna), so you can use all its commands as well.

1. Install

```console
yarn install
```

2. Build

```console
yarn build
```

3. Run a package

Each package has a small playground `package/demo`, where you can test your changes.

```console
cd packages/pf3-component-mapper
yarn start
```

4. How to clean?

```console
yarn lerna clean # will delete all node_modules
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.

#### Tests

Tests needed to be run from the core folder.

```console
yarn test

yarn test packages/pf3-component-mapper
```

#### Commits

Data Driven Forms uses [Semantic Release](https://github.com/semantic-release/commit-analyzer)

Format:

```
[type]([package]): message

fix(pf3): title accepts node
```

Types:
- `feat`: a new feature, will trigger new `_.X._` release
- `fix`: a fix, will trigger new `_._.X` release

Packages:
- Please describe which package is being changed `pf3`, `renderer`, ...

Please, do not use Semantic Release, if you update only the demo.

All packages are releasing together and they share the version number.

#### Changes to documentation

If your changes influence API or add new features, you should describe these new options in the `react-renderer-demo` repository. Thanks!

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0


