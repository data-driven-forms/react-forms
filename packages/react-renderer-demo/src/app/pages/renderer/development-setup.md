import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

### Development setup

Data Driven Forms is a monorepo which uses [Lerna](https://github.com/lerna/lerna), so you can use all its commands as well.

#### Install

```console
yarn install
```

#### Build

```console
yarn build
```

All packages are linked together by default, so if you run a `yarn build` in a package, all other packages are updated to the latest version of that package.

Don't forget to build all packages, which are linked together!

#### Run a package

Each package has a small playground `package/demo`, where you can test your changes.

```console
cd packages/pf3-component-mapper
yarn start
```

#### How to clean?

```console
rm yarn.lock
yarn lerna clean # will delete all node_modules
```

### Tests

Tests needed to be run from the core folder.

```console
yarn test

yarn test packages/pf3-component-mapper
```

### Commits

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

### Changes to documentation

If your changes influence API or add new features, you should describe these new options in the `demo` repository. Thanks!

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/development-setup" />
</Grid>
</Grid>
