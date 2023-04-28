import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Is

## Simple value

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

## Custom Function

*(value: any, config: condition object) => boolean*

`is` also allows to use a custom function. This function receives the value of the `when` field as the first attribute and the condition config as the second argument.

```jsx
condition: {
  when: 'Foo',
  is: (value, config) => calculateAge(value, config) > 18
}
```

<CodeExample source="components/conditions/is-function" mode="preview" />

</DocPage>
