import React from 'react';
import ReactMarkdown from '../md-helper';

const text = `
  React form renderer is using [react-final-form](https://github.com/final-form/react-final-form) for form state management.
  Most of its features are not directly available for consistency and performance reasons. If you want to create any custom
  components, you can access these features via **FieldProvider**.


  FieldProvider is a wrapper component around standard
  [react-final-form Field component](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops)
  which adds additional methods that will help you to control your form state.

  ## Accessing FieldProvider

  To use Fieldprovider, you first need to register a component to your component mapper.
  You can read more about that in [Component mapping](/renderer/component-mapping).

  Each component will receive FieldProvider as a prop. Be aware that pre-defined component types are
  automatically wrapped in FieldProvider. This is done to make it easier to create component mappers for
  standard form components. List of standard components is avaiable [here](/renderer/form-schemas).

  ## Using FieldProvider

  1. Register component

  \`\`\`jsx
  import NewComponent from './new-component'

  const formFieldsMapper = {
    'new-component': NewComponent
  }
  \`\`\`

  2. Implementation

  Next example shows simple input field with label and error message.

  \`\`\`jsx
  import React from 'react';

  const NewComponent = ({ FieldProvider, formOptions, name ...rest }) => (
    <div>
      <FieldProvider {...rest} name={name}>
        {({ input, meta, ...props }) => {
          return (
            <div>
              <label>{props.label}</label>
              <input {...input} />
              {meta.error && <label>{meta.error}</label>}
            </div>
          )
        }}
      </FieldProvider>
    </div>
  )

  export default NewComponent
  \`\`\`

  ## What are input and meta?
  
  ### Input

  Input is an object which contains methods that change form state. It contains these attributes:
  
  \`\`\`json
  {
    value: any, // any value of given form field. Its data type is based on field data type
    name: string,// unique name of form field. Value will be accessible under this key in form state
    onBlur: (event) => void, // function that should be triggered on field blur event
    onChange: (value) => void, // function that changes value of field in formState. Should be called whenever you want to change value of field
    onFocus: (event) => void, // function that should be triggered on field focus event
  }
  \`\`\`

  Every user interaction that updates field value in form state should also call \`input.onChange\` with correct value.

  ### Meta

  Meta is a object which contains meta information about field with given name. There is a lot of information about every field.
  [Full list is here](https://github.com/final-form/react-final-form#metaactive-boolean). These are commonly used meta informations
  \`\`\`json
  {
    error: any, // whatever your validation function returns
    pristine: bool, // true if the current value is === to the initial value, false if the values are !==.
    dirty: bool, // opposite of pristine
    touched: bool, //true if this field has ever gained and lost focus. false otherwise. Useful for knowing when to display error messages.
    valid: bool //true if this field has no validation or submission errors. false otherwise.
  }
  \`\`\`

  ## FormOptions

  In addition to FieldProvider, every component will also receive prop \`formOptions\`.
  This property contains a number of useful methods and attributes that will give you additional level of control
  and informations about the formState.

  \`\`\`json
  {
    blur: (name) => void, // calls onBlur event on field with given name
    change: (name, value) => void, // calls onChange event on field with given name
    focus: (name) => void, // calls onFocus event on field with given name
    getFieldState: (name) => object, // returns a state of given field, state contains input and meta information of field
    getRegisteredFields: () => string[], // returns an array of field names that are rendered in DOM
    getState: () => object, // returns an object with whole form state. More info https://github.com/final-form/final-form#formstate
    pristine: bool, // true if the all field values is === to the initial values, false if the values are !==.
    renderForm: (defaultSchema) => void, // function that is used by form renderer to render form fields defined by defaultSchema; can be used for schema nesting
    valid: bool //true if all fields have no validation or submission errors. false otherwise.
  }
  \`\`\`
`;

export default <ReactMarkdown source={ text } />;
