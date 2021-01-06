import DocPage from '@docs/doc-page';

<DocPage>

# Optimization

Data Driven Forms is built in three module formats: CJS, ESM and UMD.

## CJS

```jsx
--- { "switchable": false } ---
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import useField from '@data-driven-forms/react-form-renderer/use-field';
```

## ESM

```jsx
--- { "switchable": false } ---
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/esm/form-renderer';
import useField from '@data-driven-forms/react-form-renderer/dist/esm/use-field';
```

In both of CJS and ESM, exported files follow the kebab case. All components are exported in default exports.

## UMD

**Recommendation: UMD is just a fallback option. We strongly recommend to use CJS or ESM. These two modules allow to better optimization via treeshaking and more modern language syntax.**

```jsx
--- { "switchable": false } ---
import { FormRenderer, useField } from '@data-driven-forms/react-form-renderer';
```

Only the `FormRenderer` component is exported as a default. In all other packages, use only named exports.

---

## Mixing imports

**Do not mix** different module formats (for example `Renderer` imported from UMD and `componentMapper` from CJS), otherwise you will encounter this error:

`useField must be used inside of a <Form> component`

## Transforming imports in Babel

You can automate tranforming imports to specific module formats by using [transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) plugin in your Babel configuration. With that, you don't need to write explicit imports manually and you can still import everything from projects' roots.

Example:

```jsx
// babel.config.js

const transformDDFImportsToCJS = [
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
  'react-form-renderer-cjs'
]

...

module.exports = {
    ...,
    plugins: [
        ...,
        transformDDFImportsToCJS
    ]
}
```

Result:

```jsx
--- { "switchable": false } ---
import { useField } from '@data-driven-forms/react-form-renderer';
// ^^ this will be converted to >>
import useField from '@data-driven-forms/react-form-renderer/use-field';
```

</DocPage>
