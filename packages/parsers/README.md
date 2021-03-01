[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](../../images/logo.png)](https://data-driven-forms.org/)

Parsers for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Parsers](#parsers)
  - [ManageIQ parser](#manageiq-parser)
  - [Mozilla JSON schema parser](#mozilla-json-schema-parser)
- [Useful links](#useful-links)
- [Development setup](#development-setup)
  - [Commits](#commits)
  - [Changes to documentation](#changes-to-documentation)
- [Contribution](#contribution)
- [LICENSE](#license)

### Installation

```console
$ npm install @data-driven-forms/parsers -S
```

```console
$ yarn add @data-driven-forms/parsers
```


### Usage

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';

import { mozilla } from '@data-driven-forms/parsers';

const mozillaSchema = [
  "namespace": "myapi",
  "properties": {
    "SOME_PROPERTY": {
     "value": 24,
     "description": "Description of my property here."
    }
  }
]

const parsedSchema = mozilla(mozillaSchema)

const Form = () => (
  <FormRenderer
    schema={parsedSchema}
    componentMapper={componentMapper}
    FormTemplate={FormTemplate}
    onSubmit={console.log}
  />
)
```

### Parsers

#### ManageIQ parser

#### Mozilla JSON schema parser

### Useful links

- [Data Driven Forms documentation](https://data-driven-forms.org/)

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

3. Test a package

You can test parsers using tests. Tests needed to be run from the core folder.

```console
cd packages/pf4-component-mapper
yarn test --watchAll packages/parsers
```

4. How to clean?

```console
yarn lerna clean # will delete all node_modules
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.


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