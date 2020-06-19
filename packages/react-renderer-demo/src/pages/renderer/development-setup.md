import Grid from '@material-ui/core/Grid'

import ListOfContents from '@docs/list-of-contents';
import ListOfContentsMobile from '@docs/list-of-contents-select';

<Grid container item>

<ListOfContentsMobile file="renderer/development-setup" />

<Grid item xs={12} md={10}>

# Development setup

Data Driven Forms is a monorepo which uses [Lerna](https://github.com/lerna/lerna), so you can use all its commands as well.

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
rm yarn.lock
yarn lerna clean # will delete all node_modules
```

# Tests

Tests needed to be run from the core folder.

```bash
yarn test

yarn test packages/pf3-component-mapper
```

# Commits

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

# Changes to documentation

If your changes influence API or add new features, you should describe these new options in the `demo` repository. Thanks!

# Generating a mapper template

To generate a mapper template, run:

```bash
yarn generate-template
```

This command starts a CLI, that provides an interface for generating mappers. A mapper folder will be created and it will be populated with all neccesary files.

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/development-setup" />
</Grid>
</Grid>
