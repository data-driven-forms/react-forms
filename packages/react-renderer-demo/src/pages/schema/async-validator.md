import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Async validator

You can use a Async function as a validator. But it **must be first in the validate array**. Other async validators will be ignored. This rule was created to prevent long asynchronous validation sequences.

You can either use custom function, or custom validator from validator mapper.

<CodeExample mode="preview" source="components/validators/async-validator" />


Validator inputs and results are being cached so you will get immediate feedback for recurring values before the validation is actually finished.

If you do not want to trigger the async validator after every stroke, you can use a debounce promise [library](https://github.com/slorber/awesome-debounce-promise)
(or any other implementation of debouncing.)

</DocPage>
