import DocPage from '@docs/doc-page';

<DocPage>

# Development setup

Data Driven Forms is a monorepo that uses [Lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/), so you can use all its commands as well.

## Install

```bash
yarn install
```

## Build

```bash
yarn build
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.

Don't forget to build all packages, which are linked together!

## Run a package

Each package has a small playground `package/demo`, where you can test your changes.

```bash
cd packages/pf3-component-mapper
yarn start
```

## Run documentation

The documentation is a server-side rendered React application based on [NextJS framework](https://nextjs.org/).

```bash
cd packages/react-renderer-demo
yarn dev
```

## How to clean?

```bash
yarn lerna clean # will delete all node_modules
```

## Tests

Tests needed to be run from the core folder.

```bash
yarn test

yarn test packages/pf3-component-mapper
```

## Commits

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

## Changes to documentation

If your changes influence API or add new features, you should describe these new options in the `react-renderer-demo` repository. Thanks!

## Generating a mapper template

To generate a mapper template, run:

```bash
yarn generate-template
```

This command starts a CLI, that provides an interface for generating mappers. A mapper folder will be created and it will be populated with all neccesary files.
## Adding form component example

To add additional examples of [custom form components](/examples/sample-example), please follow these steps.

1. Create a new markdown file in this directory: https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/pages/examples.
2. Wrap the whole content into `DocPage` component:
```md
import DocPage from '@docs/doc-page';

<DocPage>
  Your content
</DocPage>

```
3. Add this information to the file:
    1.  Description of the component
    2. A problem it may help to solve
    3. Example of the component implementation and usage in a form
4. To create an example follow these steps:
    1. Create a new JS file in this directory: https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/examples/components/examples
    2. Import the code example using this path `components/examples/<file name without extenstion>`

```md

import CodeExample from '@docs/code-example';

<CodeExample source="components/examples/sample-example" mode="preview" />

```
5. Add the component to the navigation. Add a new object to this file: https://github.com/data-driven-forms/react-forms/blob/master/packages/react-renderer-demo/src/components/navigation/schemas/custom-examples.schema.js
    1. Title: text of the link
    2. Component: exact filename of the **markdown file**

</DocPage>
