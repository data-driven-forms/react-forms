[![Data Driven Form logo](https://raw.githubusercontent.com/data-driven-forms/react-forms/master/images/logo.png)](https://data-driven-forms.org/)

A documentation page for [Data Driven Forms](https://github.com/data-driven-forms/react-forms). A server-side application based on [NextJS](https://nextjs.org/).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

Used by [ManageIQ](http://manageiq.org/), Red Hat Cloud Services.

**Table of Contents**

- [Development setup](#development-setup)
  - [Tests](#tests)
  - [Commits](#commits)
- [Contribution](#contribution)
- [LICENSE](#license)

### Development setup

1. Install

```console
cd ../..
yarn install
```

2. Build

```console
cd ../..
yarn build
```

3. Run a package

```console
yarn dev
```

1. How to clean?

```console
cd ../..
rm yarn.lock
yarn lerna clean # will delete all node_modules
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.

#### Tests

Documentation does not contain any test files currently.

#### Commits

Please, do not use Semantic Release, if you update only the demo.

### Contribution

We welcome any community contribution. Don't be afraid to report bug or to create issues and pull-requests! :trophy:

### LICENSE

Apache License 2.0