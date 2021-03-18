import DocPage from '@docs/doc-page';

<DocPage>

# Migration guide to version 3

This new version does not bring any new features, but is aimed to improve developer experience by integrating a new build process to reduce bundle sizes and to introduce automatic ESM/CJS module resolution.

---

## Removal of PatternFly 3 Mapper

PatternFly 3 mapper is now removed. You can still use the mapper from version 2, but we can't guarantee any future bug fixes or new features. However, we are able to assist you with your PRs and we can still release them as you need.

**We strongly recommend to migrate to some other mapper** (mainly to PF4), as PF3 package is no longer maintained well and it will have issues with the latest version of React.

Migration should be simple - most of the components share the same API so replacing imports should work fine in most cases.

```diff
--- { "switchable": false } ---
-import { componentMapper, FormTemplate } from '@data-driven-forms/pf3-component-mapper';
+import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';
```

---

## New build process

### Automatic module resolution

You don't have to specify the correct module, your environment will do it automatically, if corectly configured. See [optimization page](/optimization)  for more details.

### No UMD packages

UMD format is no longer supported. The import paths for UMD packages now lead to CJS modules in testing environments and ESM modules in browser environments.

### Changed import paths

Due to the new build process, you have to change your imports path, if you use relative imports of specific components or if you consume the specific module system package. There are no longer module system and the dist folder specified.

```diff
--- { "switchable": false } ---
-import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';;
+import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
```

You can use [babel-transform-plugin](/optimization#transformingimportsinbabel) to do this change for you.

### FormRenderer is longer a default export

FormRenderer component is no longer a default export of the `react-form-renderer` package.

```diff
--- { "switchable": false } ---
-import FormRenderer from '@data-driven-forms/react-form-renderer';
+import { FormRenderer } from '@data-driven-forms/react-form-renderer';

// or

+import { FormRenderer } from '@data-driven-forms/react-form-renderer/form-renderer';
```

<br />

### Using of JSS

All the mappers except Ant Design and PatternFly 4 were migrated to use JSS (CSS in JS), so you don't have to use any css-loader. (However, you still need to setup the loader in case you are using ant-component-mapper of pf4-component-mapper. If you are using PF4, you are probably using the loader right now, as you need it also for the core package.)

## FieldProps introduction

A new [FieldProps](/schema/introduction#fieldprops) props is introduced. This object serves to pass values to Final Form [useField configuration](https://final-form.org/docs/react-final-form/types/FieldProps). Do not use for natively supported props (`initialValue`, `validate`, ...).

```diff
{
    name: 'component-with-complex-isEqual',
    component: 'dual-list-selector',
-   isEqual: (a, b) => isEqual(a, b),
+   FieldProps: {
+     isEqual: (a, b) => isEqual(a, b),
+   }
}
```

</DocPage>