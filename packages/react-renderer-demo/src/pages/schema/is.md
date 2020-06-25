import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Is

`is` - test if the value is equal

```jsx
condition: {
  when: 'Foo',
  is: 'Bar',
}

// Foo == 'Bar' => true
// Foo == 'Not a Bar' => false
```

<CodeExample source="components/conditions/is" mode="preview" />

</DocPage>
