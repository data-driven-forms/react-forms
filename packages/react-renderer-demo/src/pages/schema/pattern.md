import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Pattern

`pattern` - tests if the value matches the pattern

```jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
}

// Foo = 'bar' => true
// Foo = 'baar!' => false
```

It also accepts string value, then you have to use additional property flags if you need to specify RegExp flags:

```jsx
condition: {
  when: 'Foo',
  pattern: 'bar',
  flags: 'i'
}

// Foo = 'bar' => true
// Foo = 'bAr!' => true
```

<CodeExample source="components/conditions/pattern" mode="preview" />

</DocPage>
