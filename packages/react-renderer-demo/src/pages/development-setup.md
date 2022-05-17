import DocPage from '@docs/doc-page';

<DocPage>

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

## Generating a mapper template

We provide a simple CLI tool for generating component mappers. It will create a based project structure and dummy components.

```bash
yarn generate-template
```

---

## Adding form component example

To add additional examples of [custom form components](/examples/sample-example), please follow these steps.

(1) Create a new markdown file in this directory: https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/pages/examples.

<br />

(2) Wrap the whole content into `DocPage` component:

```md
import DocPage from '@docs/doc-page';

<DocPage>
  Your content
</DocPage>
```

<br />

(3) Add this information to the file:

&nbsp;&nbsp;&nbsp;&nbsp;(a) Description of the component

&nbsp;&nbsp;&nbsp;&nbsp;(b) A problem it may help to solve

&nbsp;&nbsp;&nbsp;&nbsp;(c) Example of the component implementation and usage in a form

<br />

(4) To create an example follow these steps:

&nbsp;&nbsp;&nbsp;&nbsp;(a) Create a new JS file in this directory: https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/examples/components/examples

&nbsp;&nbsp;&nbsp;&nbsp;(b) Import the code example using this path `components/examples/<file name without extenstion>`

```md
import CodeExample from '@docs/code-example';

<CodeExample source="components/examples/sample-example" mode="preview" />
```

<br />

(5) Add the component to the navigation. Add a new object to this file: https://github.com/data-driven-forms/react-forms/blob/master/packages/react-renderer-demo/src/components/navigation/schemas/custom-examples.schema.js

&nbsp;&nbsp;&nbsp;&nbsp;(a) Title: text of the link

&nbsp;&nbsp;&nbsp;&nbsp;(b) Component: exact filename of the **markdown file**

</DocPage>
