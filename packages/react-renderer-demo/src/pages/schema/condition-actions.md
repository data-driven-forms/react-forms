import DocPage from '@docs/doc-page';

<DocPage>

# Conditional actions

There are currently two types of conditionals actions: `visible` and `set`. These actions can be called from `then` or `else` statements in root conditions. (Conditions has to be the root of the condition tree, or they have to be included in a [sequence](/renderer/condition#sequence) array.)

```jsx
condition: { when: 'x', is: 'y', then: { ... }, else: { ... } }
```

</DocPage>
