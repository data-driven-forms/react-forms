import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Pattern validator

Data Driven Forms provides a pattern validator that uses regular expression to check the value.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.PATTERN,
    pattern: /\d+/
}
```

## Options

### pattern

*string | regEx*

To set a pattern you can use a string variant or a regEx.

i.e.

- string: `\d+`
- regEx: `/\d+/`

### flags

*string*

Sets flags used in the regular expression.

i.e.

- `i` - case-insensitive

## Example

<CodeExample mode="preview" source="components/validators/pattern-validator" />

</DocPage>
