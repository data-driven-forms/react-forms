import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Custom validator

*(value, allValues, meta) => any | new Promise: any*

As validator you can provide your custom function. This function takes `value`, `allValues` and `meta` as arguments and returns error message when it fails, otherwise it returns undefined. Please see [final form validate prop](https://final-form.org/docs/react-final-form/types/FieldProps#validate).

Check [async documentation](/schema/async-validator) for asynchronous validation.

## Example

<CodeExample mode="preview" source="components/validators/custom-function" />

</DocPage>
