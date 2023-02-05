[![codecov](https://codecov.io/gh/data-driven-forms/react-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/data-driven-forms/react-forms)
[![CircleCI](https://circleci.com/gh/data-driven-forms/react-forms/tree/master.svg?style=svg)](https://circleci.com/gh/data-driven-forms/react-forms/tree/master)
[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer.svg)](https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

Data Driven Forms is a React library used for rendering and managing forms with a lot of provided features based on [React Final Form](https://github.com/final-form/react-final-form).

:question: Why to use Data Driven Forms? :question:
- All forms **shared** the same **functionality**!
- Components are **controlled** in **one place**!
- You can **easily migrate** to different sets of components!
- All **functionality** is **provided** (see below!)

:tada: Features :tada:
- **Easily readable schema**, you don't need to know any HTML or JS to be able to write your own form schemas!
- You can use your **own components** or use one of our **provided mappers**: [PatternFly 4](https://patternfly-react.surge.sh/patternfly-4/), [Material-UI](https://mui.com/), [Ant Design](https://ant.design/)! and more, see below!)
- **Form state manager** out-of-the-box (including error states!)
- Fully **customizable** (you can use your own buttons, actions, etc.)!
- **Conditional** fields!
- Custom field **validation** with basic set included!
- **Datatype** validation!
- **Cross-field** validation!
- **Asynchronous** validation supported!
- Supporting **Wizard** forms!
- Supporting **[Final Form Field Array](https://github.com/final-form/react-final-form-arrays)!**
- ... and a lot more!

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
  - [React Form Renderer](#react-form-renderer)
  - [Provided mappers](#provided-mappers)
    - [Material-UI Mapper](#material-ui-mapper)
    - [PatternFly 4 Mapper](#patternfly-4-mapper)
    - [BlueprintJS Mapper](#blueprintjs-mapper)
    - [Semantic UI Mapper](#semantic-ui-mapper)
    - [Ant Design Mapper](#ant-design-mapper)
    - [Carbon Mapper](#carbon-mapper)
  - [Basic provided components](#basic-provided-components)
- [Usage](#usage)
  - [Custom mapper](#custom-mapper)
- [Documentation](#documentation)
- [Development setup](#development-setup)
  - [Requirements](#requirements)
  - [Common commands](#common-commands)
    - [Install](#install)
    - [Build](#build)
    - [Run a playground](#run-a-playground)
    - [Run documentation](#run-documentation)
    - [How to clean node_modules](#how-to-clean-node_modules)
    - [Cleaning built files](#cleaning-built-files)
    - [Tests](#tests)
  - [Checklist before you send a PR](#checklist-before-you-send-a-pr)
    - [Build passes](#build-passes)
    - [Linter passes](#linter-passes)
    - [Write tests](#write-tests)
    - [Documentation update](#documentation-update)
    - [Correct commit message](#correct-commit-message)
- [Useful links](#useful-links)
- [Contribution](#contribution)
- [LICENSE](#license)

# Installation

## [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)

```console
$ npm install @data-driven-forms/react-form-renderer -S
```

```console
$ yarn add @data-driven-forms/react-form-renderer
```

## Provided mappers


### [Material-UI Mapper](https://data-driven-forms.org/mappers/mui-component-mapper)

```console
$ npm install @data-driven-forms/mui-component-mapper -S
```

```console
$ yarn add @data-driven-forms/mui-component-mapper
```

### [PatternFly 4 Mapper](https://data-driven-forms.org/mappers/pf4-component-mapper)

```console
$ npm install @data-driven-forms/pf4-component-mapper -S
```

```console
$ yarn add @data-driven-forms/pf4-component-mapper
```

### [BlueprintJS Mapper](https://data-driven-forms.org/mappers/blueprint-component-mapper)

```console
$ npm install @data-driven-forms/blueprint-component-mapper -S
```

```console
$ yarn add @data-driven-forms/blueprint-component-mapper
```

### [Semantic UI Mapper](https://data-driven-forms.org/mappers/suir-component-mapper)

```console
$ npm install @data-driven-forms/suir-component-mapper -S
```

```console
$ yarn add @data-driven-forms/suir-component-mapper
```

### [Ant Design Mapper](https://data-driven-forms.org/mappers/ant-component-mapper)

```console
$ npm install @data-driven-forms/ant-component-mapper -S
```

```console
$ yarn add @data-driven-forms/ant-component-mapper
```

### [Carbon Mapper](https://data-driven-forms.org/mappers/carbon-component-mapper)

```console
$ npm install @data-driven-forms/carbon-component-mapper -S
```

```console
$ yarn add @data-driven-forms/carbon-component-mapper
```

Component libraries in mappers are external dependencies. Make sure to install them and their styles in your bundles.

## Basic provided components

Provided mappers of Data Driven Forms support contains following set of components:

- [Text input](https://data-driven-forms.org/mappers/text-field?mapper=mui)
- [Text area](https://data-driven-forms.org/mappers/textarea?mapper=mui)
- [Checkbox](https://data-driven-forms.org/mappers/checkbox?mapper=mui) ([Multiple checkboxes](https://data-driven-forms.org/mappers/checkbox-multiple?mapper=mui))
- [Select (dropdown)](https://data-driven-forms.org/mappers/select?mapper=mui)
- [Dual list select](https://data-driven-forms.org/mappers/dual-list-select?mapper=mui)
- [Field array](https://data-driven-forms.org/mappers/field-array?mapper=mui)
- [Switch](https://data-driven-forms.org/mappers/switch?mapper=mui)
- [Radio buttons](https://data-driven-forms.org/mappers/radio?mapper=mui)
- [Date picker](https://data-driven-forms.org/mappers/date-picker?mapper=mui)
- [Time picker](https://data-driven-forms.org/mappers/time-picker?mapper=mui)
- [Tabs](https://data-driven-forms.org/mappers/tabs?mapper=mui)
- [Slider](https://data-driven-forms.org/mappers/slider?mapper=mui)
- [Sub-form](https://data-driven-forms.org/mappers/sub-form?mapper=mui)
- [Plain text](https://data-driven-forms.org/mappers/plain-text?mapper=mui)
- [Wizard](https://data-driven-forms.org/mappers/wizard?mapper=mui)

Any other components can be added to mapper and renderer with the form renderer. Existing components can be also overriden.

# Usage

In order to Data Driven Forms in your component you need the renderer and a component mapper, which provides component mapper and form template.

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

## Custom mapper

You can also use custom mapper.

```jsx
import React from 'react';
import { FormRenderer, componentTypes, useFieldApi } from '@data-driven-forms/react-form-renderer';

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

# Documentation

Please use our [documentation site](https://data-driven-forms.org/). In case of any problem, you can access documentation files directly in GitHub.

# Development setup

Data Driven Forms is a monorepo that uses [Lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/), so you can use all its commands as well.

---

## Requirements

- **○ NodeJS 16**

- **○ Unix like OS (MacOS, Linux)**

We do not support developing on Windows at this moment. However, we would welcome any PR to change this.

---

## Common commands

### Install

```bash
yarn install
```

### Build

```bash
yarn build
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package. A package has to be built first before it is used in other package.

### Run a playground

Each package has a small playground `package/demo`, where you can test your changes.

```bash
cd packages/pf3-component-mapper
yarn start
```

### Run documentation

The documentation is a server-side rendered React application based on [NextJS framework](https://nextjs.org/).

```bash
cd packages/react-renderer-demo
yarn dev
```

### How to clean node_modules

```bash
yarn lerna clean
rm -rf node_modules
```
### Cleaning built files

To clean built files use following command: (This script is also ran automatically before each build.)

```bash
yarn clean-build
```

### Tests

Tests can be ran from core folder or from specific package.

```bash
yarn test

yarn test --watchAll packages/pf4-component-mapper

# or

cd packages/pf4-component-mapper
yarn test
```

---

## Checklist before you send a PR

Please follow following checklist if you are going to open a PR. It will help you make the PR finished.

### Build passes

Run `yarn build` in root folder to build all packages. You can run this command only in package you changed. All packages are linked by default, you have to build them first.

### Linter passes

Run `yarn lint` in root folder to check if the code is correctly formatted. You can use `yarn lint --fix` to automatically correct issues.
### Write tests

All new code should be properly tested. Run `yarn test` in root folder to test all files. Check codecoverage report to see uncovered lines of code. We are using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### Documentation update

If you introduce a new feature, you should document this change in our documentation. The documentation is located in `react-renderer-demo` package and it is a web application based on [NextJS](https://nextjs.org/). We do not write tests for the documentation.

`yarn dev` starts a local version of the documentation.

`yarn build` prepares files for deployment.

`yarn serve` emulates the web application running in local emulator.

### Correct commit message

A correct commit message is important, because we are using [semantic release](https://github.com/semantic-release/commit-analyzer) to automatically releease new versions. These messages are also used in our release notes, so other users can see what is being changed.

**My change introduces a new feature**

Prefix your commit message with `feat` and specify the package that is being changed. An example: `feat(pf4): a new dual list integration`. If you change multiple packages, you can use `feat(common): ...` or `feat(all): ...`.

**My change fixes a bug or technical debt**

Prefix your commit message with `fix`. Otherwise, the same rules apply. An example: `fix(pf4): fixed missed proptype in select`.

**My change does not change any released package**

If your change does not change any of the released packages, you can simple just descibe the change, an example: `Fix button on documenation example page`. This also applies for any change in the documentation repo.

**My change introduces a breaking change**

We are trying to avoid breaking changes. Please, open an issue and discuss the issue with us, we will try to come up with alternative options.

---

# Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)
- [PatternFly 4 Design documentation](https://www.patternfly.org/v4/)
- [Material-UI documentation](https://mui.com/)
- [Ant Design documentation](https://ant.design/)
- [Semantic UI React](https://react.semantic-ui.com/)
- [BlueprintJS](https://blueprintjs.com/)
- [IBM Carbon](https://www.carbondesignsystem.com/)
- NPM
  - [React Form Renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
  - [PatternFly 4 Mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)
  - [MaterialUI Mapper](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper)
  - [Ant Design Mapper](https://www.npmjs.com/package/@data-driven-forms/ant-component-mapper)
  - [Semantic UI Mapper](https://www.npmjs.com/package/@data-driven-forms/suir-component-mapper)
  - [BlueprintJS Mapper](https://www.npmjs.com/package/@data-driven-forms/blueprint-component-mapper)
  - [Carbon Mapper](https://www.npmjs.com/package/@data-driven-forms/carbon-component-mapper)

# Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

# LICENSE

Apache License 2.0

