import DocPage from '@docs/doc-page';

<DocPage>

# Optimization

Data Driven Forms is built in two module formats: CJS and ESM.

By using a standard import path, **the module based on your environment will be used**. Browser environments are using ESM modules, environments based on NodeJS (testing) are using CJS.

## Import only specific file

Exported files follow the kebab case. All components are exported in default exports.

```jsx
import useField from '@data-driven-forms/react-form-renderer/use-field';
```
## ESM

In case you need to import ESM module manually, you can do this by using `esm` in a path. However, we do not recommend it.

```jsx
import FormRenderer from '@data-driven-forms/react-form-renderer/esm/form-renderer';
import useField from '@data-driven-forms/react-form-renderer/esm/use-field';
```

## UMD

UMD module format is no longer supported.

---

## Mixing imports

**Do not mix** different module formats (for example `Renderer` imported from ESM and `componentMapper` from CJS), otherwise you will encounter this error:

`useField must be used inside of a <Form> component`

## Transforming imports in Babel

You can automate tranforming imports by using [transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) plugin in your Babel configuration. With that, you don't need to write explicit imports manually and you can still import everything from projects' roots.

Example:

```jsx
// babel.config.js

const transformDDFImports = [
  'transform-imports',
  {
    '@data-driven-forms/react-form-renderer': {
      transform: (importName) =>
        `@data-driven-forms/react-form-renderer/${importName
              .split(/(?=[A-Z])/)
              .join('-')
              .toLowerCase()}.js`,
    }
  },
  'react-form-renderer'
]

...

module.exports = {
    ...,
    plugins: [
        ...,
        transformDDFImports
    ]
}
```

Result:

```diff
--- { "switchable": false } ---
-import { useField } from '@data-driven-forms/react-form-renderer';
+import useField from '@data-driven-forms/react-form-renderer/use-field';
```

</DocPage>
