[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

Patternfly 4 component mapper for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [PatternFly 4 Mapper](#patternfly-4-mapper)
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

You need to add React Form Renderer


#### [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)

```console
$ npm install @data-driven-forms/react-form-renderer -S
```

```console
$ yarn add @data-driven-forms/react-form-renderer
```

#### [PatternFly 4 Mapper](https://data-driven-forms.org/mappers/pf4-component-mapper)

```console
$ npm install @data-driven-forms/pf4-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf4-component-mapper
```


### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
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

### Basic provided components

Data Driven Forms supports all kinds of component, basic set is consisted of:

- [Text input](https://data-driven-forms.org/mappers/text-field?mapper=pf4)
- [Text area](https://data-driven-forms.org/mappers/textarea?mapper=pf4)
- [Checkbox](https://data-driven-forms.org/mappers/checkbox?mapper=pf4) ([Multiple checkboxes](https://data-driven-forms.org/mappers/checkbox-multiple?mapper=pf4))
- [Select (dropdown)](https://data-driven-forms.org/mappers/select?mapper=pf4)
- [Dual list select](https://data-driven-forms.org/mappers/dual-list-select?mapper=pf4)
- [Field array](https://data-driven-forms.org/mappers/field-array?mapper=pf4)
- [Switch](https://data-driven-forms.org/mappers/switch?mapper=pf4)
- [Radio buttons](https://data-driven-forms.org/mappers/radio?mapper=pf4)
- [Date picker](https://data-driven-forms.org/mappers/date-picker?mapper=pf4)
- [Time picker](https://data-driven-forms.org/mappers/time-picker?mapper=pf4)
- [Tabs](https://data-driven-forms.org/mappers/tabs?mapper=pf4)
- [Slider](https://data-driven-forms.org/mappers/slider?mapper=pf4)
- [Sub-form](https://data-driven-forms.org/mappers/sub-form?mapper=pf4)
- [Plain text](https://data-driven-forms.org/mappers/plain-text?mapper=pf4)
- [Wizard](https://data-driven-forms.org/mappers/wizard?mapper=pf4)


### ValidateOnMount

PF4 mapper provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.


### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [PatternFly 4 Design documentation](https://www.patternfly.org/v4/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [PatternFly 4 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)


### Development setup

Data Driven Forms is a monorepo that uses [Lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/), so you can use all its commands as well.

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
cd packages/pf4-component-mapper
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

fix(pf4): title accepts node
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