import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Condition nesting

Of course it is possible to nest conditions:

```jsx
condition = {
  and: [
    { and: [{ when: 'x', pattern: /true/ }, { when: 'z', is: 'true' }]},
    { or: [{ when: 'y', pattern: /true/ }, { when: 'a', is: 'true' }]},
  ],
};
```

<CodeExample source="components/condition" mode="preview" />

</DocPage>
