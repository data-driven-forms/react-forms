import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Custom validator

As validator you can provide your custom function:

<CodeExample mode="preview" source="components/validators/custom-function" />

Please see [final form validate prop](https://final-form.org/docs/react-final-form/types/FieldProps#validate). This function takes `value`, `allValues` and `meta` as arguments and returns error message when it fails, otherwise it returns undefined.

</DocPage>
