import CodeExample from '@docs/code-example';
import DocPage from '@docs/doc-page';

<DocPage>

# Data Types

 You can specify a type of a component by providing `dataType`, which will automatically validates the component value.
Because almost everything in HTML inputs is outputed as a string, adding the `dataType` props will also cast the value to given type.

## Available dataTypes

 ```jsx
['integer', 'float', 'number', 'boolean', 'string']
```
<CodeExample source="components/data-types-example" mode="preview" />

</DocPage>
