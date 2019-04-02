import React from 'react';
import ReactMarkdown from '../md-helper';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';

const getTypes = (firstLine, apostrohpe = false) =>
  Object
  .entries(layoutComponents)
  .reduce((acc, curr) => `${acc}\n  [layoutComponents.${curr[0]}]: ${apostrohpe ? `'${curr[1]}'` : curr[1]},`, firstLine);

const text =  `
As it was already mentioned, you can define your own components for rendering. In fact, you have to define them because the Form Renderer does not know anything about them. This way, the renderer is universal and can be used with any component library or your custom components. It is also very easy to swap the look of the form without any changes to the format!

We also understand that writing form components from the scratch might not be very user friendly. ManageIQ and Insights are using [patternfly style patterns](http://patternfly-react.surge.sh/), so you can get inspired with [Patternfly 3](https://github.com/data-driven-forms/pf3-component-mapper) and [Patternfly 4](https://github.com/data-driven-forms/pf4-component-mapper) mappers.

Form renderer requires two different mappers. Layout mapper and Form  FieldsMapper.

### Layout mapper
Component inside this mapper influence the layout of the form. Now compared to the Form Fields mapper, we have to be very strict because we cannot define our own elements. Layout mapper must contain these types components:

\`\`\`jsx
import { layoutComponents } from '@data-driven-forms/react-form-renderer';

${ getTypes('const layoutComponents = {', true) }
}
\`\`\`

LayoutMapper is just good old javascript object with keys from layoutComponents, and the values are just React components:

#### FormWrapper

Form wrapper is your form wrapper component. Typically it will be your react version of \`<form>\` tag:

\`\`\`JSX
import FormRenderer, { layoutComponents } from '@data-driven-forms/react-form-renderer';

const FormWrapper = ({ children }) => <form>{children}</form>

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
}

const MyForm = () => (
  <FormRenderer
    layoutMapper={layoutMapper}
  />
)
\`\`\`

#### Button
Button component will be used for your submit, reset and cancel buttons.

\`\`\`JSX
import layoutComponents } from '@data-driven-forms/react-form-renderer';

const Button = ({ label, bsStyle, ...props }) => (
  <button
    {...props}
    style={{ backgroud: bsStyle === primary ? 'blue' : 'initial' }}
  >
    {label}
  </button>
)
const layoutMapper = {
  [layoutComponents.BUTTON]: FormWrapper,
}
\`\`\`

#### Col
Col represents wrapper arround one Form Field (hence the name Col). It does not have to mirror bootstrap Col, which is just the name we have decided to go with. If you for instance don't need any Col (or other wrapping) component, and you are handling this inside the actual Field component, you can use \`<React.Fragment>\` component. This way you will not create any element in your DOM. On the other hand, it might be usefull to implement it as a container for your components. Because we can't possibly create layout that suit 100% of our use cases, we can use this wrapper to pass additional styles to field components.

\`\`\`JSX
import './form/styles.scss';

const Col = ({ children }) => (
  <div className="form-row">{children}</div>
)
\`\`\`

#### FormGroup

Very similar to Col component.

\`\`\`JSX
import './form/styles.scss';

const FormGroup = ({ children }) => (
  <div className="form-group">{children}</div>
)
\`\`\`

#### ButtonGroup
Wrapper for your form buttons

\`\`\`JSX
import './form/styles.scss';

const ButtonGroup = ({ children }) => (
  <div className="button-group">{children}</div>
)
\`\`\`

#### Icon, Array Field Wrapper, Help Block
TO DO when array field docs are done

#### Putting it all together

\`\`\`JSX
import FormRenderer, { layoutComponents } from '@data-driven-forms/react-form-renderer';

${ getTypes('const layoutMapper = {') }
}

const MyForm = () => (
  <FormRenderer
    ...
    layoutMapper={layoutMapper}
    ...
  />
)
\`\`\`

### Form Fields mapper

Unlike the layout components, the form fields are completely customizable, and the implementation is restricted to only one rule. In order to correctly change the form state, you have to use provided \`input\` and \`meta\` props to your input fields. These objects provide functions like \`onChange\`, \`onBlur\`, error messages, valid state and more. Again you should probably read more about that in the [React Final Form docs](https://github.com/final-form/react-final-form#field--reactcomponenttypefieldprops).

Some of the component types are wrapped in the Field component [by default](#assign-field-provider) and if you need to use different component type, you can pass it as a prop.

In an example below you can see an implementation of a simple input component using both predefined component type and a custom one.

\`\`\`JSX
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

// if no id is provided field will use name and assign it to ID
const DefaultInput = ({ input, meta, label, name, ...rest }) => {
  const id = rest.id || name;
  return (
    <div className={\`form-group \${meta.error ? 'error' : ''}\`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} {...rest} {...input} />
      {meta.error && <span className="error-text">{meta.error}</span>}
    </div>
  )
}

const CustomInput = ({ FieldProvider, ...rest }) => (
  <FieldProvider
    {...rest}
    component={DefaultInput}
  />
)

const formFieldsMapper = {
  [componentTypes.TEXT_FIELD]: DefaultInput,
  'custom-input': CustomInput,
}

const schema = {
  fields:[{
    component: componentTypes.TEXT_FIELD.
    name: 'first-name',
    label: 'First Name',
    type: 'text',
    validate: [{
      type: validatorTypes.REQUIRED,
    }]
  }, {
    component: 'custom-input'.
    name: 'last-name',
    label: 'Last Name',
    type: 'text',
    validate: [{
      type: validatorTypes.REQUIRED,
    }]
  }]
}

\`\`\`

#### What about nesting?
There might be a need to create something like a SubForm in your Forms. We made it possible, and there are two ways to do it.

1. Use pre defined \`componentTypes.SUB_FORM\` component type:
\`\`\`JSX
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'first-name',
    ...
  }, {
    component: componentTypes.SUB_FORM,
    title: 'Address',
    description: 'Please provide us with your shipping address.',
    name: 'address',
    fields: [{
      component: componentTypes.TEXT_FIELD,
      name: 'city',
      label: 'City',
      validate: [...],
      ...
    }]
  }]
}
\`\`\`

2. Custom component
Again, the \`SUB_FORM\` component type might not be the correct solution for your use case. You can always create your own. Let's use the same schema as in example above, but only with one change:
\`\`\`javascript
component: componentTypes.SUB_FORM, -> component: 'custom-sub-form'
\`\`\`

If you use custom type, in addition to all the attributes in the field specification, you will also receive \`formOptions\` props. Form options contains some global form properties, and most importantly, there is a \`renderForm\` function. It does exactly what it says. It is the main loop that renders the form. It accepts two arguments, \`fields\` and \`formOptions\`:

\`\`\`JSX
const CustomSubForm = ({ formOptions, fields, ...rest }) => (
  <SubFormWrapper>
    {formOptions.renderForm(fields, {
      ...formOptions,
      someExtendingAttribute: 'foo'
    })}
  </SubFormWrapper>
)
\`\`\`

FormOptions are passed to every field (default and custom). If you extend it, the child of the sub form will receive your modified formOptions. You can even change te rendering function if you wish.
`;

export default <ReactMarkdown source={ text } />;
