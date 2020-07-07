import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# notMatch

`notMatch` - reverse `is`/`pattern` condition

```jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
  notMatch: true,
}

// Foo = 'bar' => false
// Foo = 'baar!' => true
```

```jsx
condition: {
  when: 'Foo',
  is: 'bar',
  notMatch: true,
}

// Foo = 'bar' => false
```

<CodeExample source="components/conditions/not-match" mode="preview" />

</DocPage>
