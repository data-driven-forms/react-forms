import DocPage from '@docs/doc-page';

<DocPage>

# Set

Setter allows to change form values according to selected values in different fields.

```jsx
// Single value
condition: { when: 'x', is: 'y', then: { set: { [field]: value } } }

// Multiple values
condition: {
  when: 'x',
  is: 'y',
  then: { set: { [field1]: value1, [field2]: value2 } }
}
```

Set is a object consists of field names as keys and values as values. You can change any form field value from any conditional action.

When the field containing a condition has some defined initial value, the setter is not triggered until the setter is retriggered with a different value.

</DocPage>
