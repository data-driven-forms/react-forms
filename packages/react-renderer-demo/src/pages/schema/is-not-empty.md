import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# isNotEmpty

`isNotEmpty` - tests if the value is not empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

```jsx
condition: {
  when: 'Foo',
  isNotEmpty: true,
}

// Foo = 'Bar' => true
// Foo = '' => false
// Foo = [] => false
// Foo = ['aa', 'bb'] => true
// Foo = {} => false
// Foo = { a: 10 } => true
// Foo = 10 => true
// Foo = true => false
// Foo = true => true
```

<CodeExample source="components/conditions/is-not-empty" mode="preview" />

</DocPage>
