[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fsuir-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fsuir-component-mapper)

[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

Semantic ui react component mapper for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [SUIR mapper](#suir-mapper)
- [Usage](#usage)
- [Basic provided components](#basic-provided-components)
- [Useful links](#useful-links)
- [Development setup](#development-setup)
  - [Tests](#tests)
  - [Commits](#commits)
  - [Changes to documentation](#changes-to-documentation)
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

#### [SUIR mapper](https://data-driven-forms.org/mappers/suir-component-mapper)

```console
$ npm install @data-driven-forms/suir-component-mapper -S
```

```console
$ yarn add @data-driven-forms/suir-component-mapper
```


### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/suir-component-mapper';

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

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [Semantic UI React documentation](https://react.semantic-ui.com/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [Semantic UI React react Mapper](https://www.npmjs.com/package/@data-driven-forms/suir-component-mapper)


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
cd packages/suir-component-mapper
yarn start
```

4. How to clean?

```console
rm yarn.lock
yarn lerna clean # will delete all node_modules
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.

#### Tests

Tests needed to be run from the core folder.

```console
yarn test

yarn test packages/suir-component-mapper
```

#### Commits

Data Driven Forms uses [Semantic Release](https://github.com/semantic-release/commit-analyzer)

Format:

```
[type]([package]): message

fix(suir): title accepts node
```

Types:
- `feat`: a new feature, will trigger new `_.X._` release
- `fix`: a fix, will trigger new `_._.X` release

Packages:
- Please describe which package is being changed `pf3`, `renderer`, ...

Please, do not use Semantic Release, if you update only the demo.

All packages are releasing together and they share the version number.

#### Changes to documentation

If your changes influence API or add new features, you should describe these new options in the `demo` repository. Thanks!

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0