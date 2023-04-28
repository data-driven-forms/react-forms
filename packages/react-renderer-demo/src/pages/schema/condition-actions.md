import DocPage from '@docs/doc-page';

<DocPage>

# Conditional actions

There are currently two types of conditionals actions: [visible](/schema/condition-visible) and [set](/schema/condition-set). These actions can be called from `then` or `else` statements in root conditions. (Conditions has to be the root of the condition tree, or they have to be included in a [sequence](/schema/condition-sequence) array.)

```jsx
condition: { when: 'x', is: 'y', then: { ... }, else: { ... } }
```

</DocPage>
