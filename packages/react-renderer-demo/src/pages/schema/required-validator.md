import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Required validator

Required validator checks if the value is not empty/falsy.

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';


{
    type: validatorTypes.REQUIRED,
}
```

## Example

<CodeExample source="components/validators/required-validator" mode="preview" />

</DocPage>
