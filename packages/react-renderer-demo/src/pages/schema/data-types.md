import CodeExample from '@docs/code-example';
import DocPage from '@docs/doc-page';

<DocPage>

# dataType

*string*

You can specify the type of a component by providing `dataType`, which will automatically validates the component value.

Because almost everything in HTML inputs is outputed as a string, adding the `dataType` props will also cast the value to the given type.

<br/>

## Example

```jsx
{
    component: 'text-field',
    name: 'age',
    label: 'How old are you?',
    dataType: 'number'
}
```

<br/>

## Available dataTypes

 ```jsx
['integer', 'float', 'number', 'boolean', 'string']
```
<CodeExample source="components/data-types-example" mode="preview" />

</DocPage>
