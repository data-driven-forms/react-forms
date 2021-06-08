import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Custom validator message

You can overwrite the messages [globally](/schema/overwriting-default-message) or specifically in each validator object via setting `message` attribute.

```jsx
{
    ...,
    validate: [{type: 'required', message: 'This field is required'}]
}
```

## Example

<CodeExample mode="preview" source="components/validators/custom-message" />

</DocPage>