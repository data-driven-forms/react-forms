import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Length validator

Data Driven Forms provides several built length validators:

## MIN_LENGTH

Checks minimal length of the text.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.MIN_LENGTH,
    threshold: 5,
}
```

## MAX_LENGTH

Checks maximum length of the text.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.MAX_LENGTH,
    threshold: 5,
}
```

## EXACT_LENGTH

Checks exact length of the text.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.EXACT_LENGTH,
    threshold: 5
}
```

## Options

### threshold

*number*

Threshold of the validator.

## Example

<CodeExample mode="preview" source="components/validators/length-validators" />

</DocPage>
