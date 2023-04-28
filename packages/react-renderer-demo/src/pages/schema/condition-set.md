import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example'

<DocPage>

# Set

Setter allows to change form values according to selected values in different fields.

## Set object

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



## Set function

To enable dynamic set action you can define set as a function. 

```TS
type set = (formState: FormState, getFieldState: ((fieldName: string) => FieldState)): void 
```

<CodeExample source="components/conditions/set-function" mode="preview" />


</DocPage>
