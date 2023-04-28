import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Sequence

This special type of condition allows to trigger a sequence of multiple independent conditions. This is useful in combination with [conditional actions](/schema/condition-actions). Setters are executed independently. Visibility is set to true, if any of the conditions sets it to true. Sequence has to be currently the root condition, that means the sequence cannot be nested within other types of conditions such as `and`, `or` and `not`.

```jsx
{
  fields: [{
    name: 'Sequence condition',
    component: 'text-field',
    condition: {
      sequence: [
        { when: ['a'], is: 'x', then: { set: { field: 'value' } } },
        { when: ['b'], is: 'x', then: { set: { field: 'different value' } } }
      ]
    }
  }]
}
```

<CodeExample source="components/conditions/sequence" mode="preview" />

</DocPage>
