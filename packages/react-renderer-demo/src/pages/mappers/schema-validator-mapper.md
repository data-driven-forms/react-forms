import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Schema validation

Data Driven Forms contains default schema validator, that controls basic schema attributes: `name`, `component`, conditions, validators, etc. If you want to control your own validators, components or actions, use [schemaValidatorMapper](/components/renderer#optionalprops) prop.

It's a simple object containing three keys: `components`, `actions`, `validators`. Each of these is an another object with names as keys and functions as returns. Components' validators receive the whole field object, actions'/validators' validators receive two arguments: action/validator as the first one and the name of the field as the second one.

For returning an error please use `DefaultSchemaError` imported from the renderer's package. If the schema is correct, do nothing.

## Schema

```jsx
import { FormRenderer, DefaultSchemaError } from '@data-driven-forms/react-form-renderer';

const schemaValidatorMapper = {
    components: {
        // schema validators for components
        [component]: (field) => {
            if(someError(field)) {
                throw new DefaultSchemaError(`Error message in field ${field.name}`);
            }
        }
    },
    actions: {
        // schema validators for actions
        [actionName]: (action, fieldName) => {
            if(someError(action)) {
                throw new DefaultSchemaError(`Error message in field ${fieldName}`);
            }
        }
    },
    validators: {
        // schema validators for validators
        [validatorType]: (validator, fieldName) => {
            if(someError(validator)) {
                throw new DefaultSchemaError(`Error message in field ${fieldName}`);
            }
        }
    }
}

...

<FormRenderer
    {...props}
    schemaValidatorMapper={schemaValidatorMapper}
/>
```

## Example

This is example is supposed to fail

<CodeExample source="components/schema-validator" mode="preview" />

</DocPage>
