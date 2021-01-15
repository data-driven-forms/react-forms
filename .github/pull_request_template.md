Fixes #(issue) *(if applicable)*

**Description**

Please include a summary of the change.

**Schema** *(if applicable)*

```jsx
```

**Checklist:** *(please see [documentation page](https://data-driven-forms.org/development-setup) for more information)*

- [ ] `Yarn build` passes
- [ ] `Yarn lint` passes
- [ ] `Yarn test` passes
- [ ] Test coverage for new code *(if applicable)*
- [ ] Documentation update *(if applicable)*
- [ ] Correct commit message
   - format `fix|feat({scope}): {description}`
   - i.e. `fix(pf3): wizard correctly handles next button`
   - fix will release a new \_.\_.X version
   - feat will release a new \_.X.\_ version (use when you introduce new features)
     - we want to avoid any breaking changes, please contact us, if there is no way how to avoid them
   - scope: package
   - if you update the documentation or tests, do not use this format
     - i.e. `Fix button on documenation example page`
