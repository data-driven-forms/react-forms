import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Number value validator

Data Driven Forms provides several built number validators:

## MIN_NUMBER_VALUE

Checks if the number is smaller than a value.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.MIN_NUMBER_VALUE,
    threshold: 5
}
```

## MAX_NUMBER_VALUE

Checks if the number is greater than a value.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.MAX_NUMBER_VALUE,
    threshold: 5
}
```

## Options

### value

*number*

Value to compate.

### includeThreshold

*boolean* default: `true`

If true, the threshold value will be considered valid.

## Example

<CodeExample mode="preview" source="components/validators/number-validator" />

</DocPage>
