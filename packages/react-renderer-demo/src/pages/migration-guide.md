import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Migration guide to version 2

The release of version 2 brings many new features, that as we hope you will find useful and you will like them.
Also, we took this release as an opportunity to fix mistakes we did during the initial development and to remove some obsolete stuff, that is no longer useful.
Major themes are using of React hooks, so update your React before you will continue, and giving more freedom to you how to customize the form.
There are also major enhancements bringing more features to schemas not stored in JavaScript, as the action mapper and validator mapper.
Thank you for your understanding.

## Details

### General rules

-   All JSON schemas should remain almost the same

### PF4/PF3/MUI Mapper

-   formFieldsMapper was renamed to componentMapper
-   Components can be imported separately to create only a subset of full component mapper

### Removed 'treshold' option

-   Due to a typo, it was possible to use key treshold as an option in some validators, this option is now disabled. Use only threshold.

### Form Template

-   layoutMapper removed - instead of it use FormTemplate
-   All props related to form buttons are now removed, use them in your FormTemplate
    -   showFormControls
    -   buttonOrder
    -   disableSubmit
    -   buttonClassName
    -   renderFormButtons
    -   submitLabel
    -   cancelLabel
    -   resetLabel
    -   canReset
-   => All these props are now managed by mapper's form templates!

-   FormTemplate receives these props:
    -   formFields : form fields
    -   schema : provides access to schema.title, schema.description and everything else
-   Default templates (it is a function!):

```jsx
import { FormTemplate } from '@data-driven-forms/pf4-component-mapper'

<FormRenderer {...} FormTemplate={props => <FormTemplate {...props} showFormControls={false} />
```

-   Options - see removed props above

### layoutComponents removed

-   layoutComponents constants have been removed. Please do not use them.

### formOptions props removed

-   formOptions as a prop was removed, instead of it use useFormApi hook or you can get formOptions from the rendererContext

```jsx

import { useFormApi } from  '@data-driven-forms/react-form-renderer';

const  Component  = (props) => {
    const  formOptions  =  useFormApi();
    ...
}
```


### formSpy is exported

-   formSpyProvider is no longer provided as a prop.
-   Use direct import instead of it:

```jsx
import { FormSpy } from  '@data-driven-forms/react-form-renderer';
```

### fieldArray is exported

-   fieldArrayProvider is no longer provided as a prop.
-   Use direct import instead of it:

```jsx
import { FieldArray } from  '@data-driven-forms/react-form-renderer';
```

### onStateUpdate removed, replaced by debug

-   onStateUpdate prop is removed from the renderer, instead of it use debug (please see <https://final-form.org/docs/react-final-form/types/FormProps#debug>)

```jsx
<FormRenderer {...} debug={console.log} />
```

-   In custom component, simulate this prop with using of formSpy

```jsx
    import { FormSpy } from  '@data-driven-forms/react-form-renderer';

{onStateUpdate &&  <FormSpy  onChange={onStateUpdate} />}
```

### FieldProvider changed

-   FieldProvider is no longer wrapping basic components and you cannot access it through props, instead of it use hook:

```jsx
import { useFieldApi } from  '@data-driven-forms/react-form-renderer';

...

const { input, isDisabled, label, helperText, description, meta } =  useFieldApi(props);
```

-   This hook accepts all props and returns them with input and meta included.
-   Don't forget to pass a type, for special types as 'checkbox'


### formFieldsMapper renamed to componentMapper

-   There is no formFieldsMapper anymore, please use componentMapper

```jsx
import { componentMapper } from '@data-driven-forms/pf4-component-mapper'

<FormRenderer {...} componentMapper={componentMapper} />
```

### Component types

-   Removed the "-field" affix from the constants values
-   "select-field" -> "select"
-   removed duplicate constants SELECT_COMPONENT etc.

### Async validators changed
-   Failed async validator must now throw an error. Error must be a string! Thrown string will be shown as a validation message in form.
-   Succesfully resolved promise with message is ignored.

### PF4/PF3/MUI Wizard doesn't use 'stepKey' anymore

-   stepKey prop is replaced by name

### PF4 Wizard predictSteps removed

-   predictSteps prop is now removed, wizard always predicts steps

### multi removed for selects

-   use isMulti instead

### "validator" removed

-   word "validator" is removed from all validator strings, constants
-   i.e.: pattern-validator > pattern

</DocPage>