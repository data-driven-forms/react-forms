import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Standalone validation

*@data-driven-forms/react-form-renderer/validation*

*(schema: Schema, options: Options) => object: Errors*

Data Driven Forms provides an async function that validates values based on a provided schema. This feature can be useful to implement validation on backend endpoints with using the same schema as in frontend applications.

## Schema

*object*

The same [schema](/schema/introduction) as for the form renderer. Validation supports all features except array validators that are being used by field arrays. This functionallity will be implemented in the future.

## Options

*object*

```ts
{
  values: AnyObject;
  componentMapper?: ComponentMapper;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
  omitWarnings?: boolean;
}
```

### Values

*object*

Form values as sent from the renderer.

---

### componentMapper

*object*

If not provided, all components are valid. [Read more](/components/renderer#componentmapper).

---

### validatorMapper

[Read more](/mappers/validator-mapper).

---

### actionMapper

[Read more](/mappers/action-mapper).

---

### schemaValidatorMapper

[Read more](/mappers/schema-validator-mapper).

---

### omitWarnings

*boolean*

If this attribute set to true, warnings will be ignored and won't appear in the errors object.

---

## Errors

*object*

A flat structure of errors.

```jsx
{
  field: 'This field is required',
  'field-with-warning': { type: 'warning', error: 'This is warning' },
  'nested.field': 'Some error message'
}
```

## Schemas changed according to meta

If your form is changing according to form state or field states, be aware that this function will miss all meta information.

## Examples

<CodeExample source="components/utilities/standalone-validation" mode="preview" />

</DocPage>
