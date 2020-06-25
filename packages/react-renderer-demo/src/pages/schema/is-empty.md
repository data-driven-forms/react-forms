import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# IsEmpty

`isEmpty` - tests if the value is empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

```jsx
condition: {
  when: 'Foo',
  isEmpty: true,
}

// Foo = 'Bar' => false
// Foo = '' => true
// Foo = [] => true
// Foo = ['aa', 'bb'] => false
// Foo = {} => true
// Foo = { a: 10 } => false
// Foo = 10 => false
// Foo = false => true
// Foo = true => false
```

<CodeExample source="components/conditions/is-empty" mode="preview" />

</DocPage>
