import React from 'react';
import ReactMarkdown from '../md-helper';

const text =  `
**Description**

When using dynamic forms where more fields share the same name, the value is preserved when a user switch the field. You can disable this behavior by setting 
\`clearOnUnmount\` option in the renderer component or in the schema of the field. The option in the schema has always higher priority. (When 
\`clearOnUnmount\` is set in the renderer and the field is set to \`false\`, the field value will not be cleared.)

**Examples**

Renderer

\`\`\`jsx
<FormRenderer
  layoutMapper={ layoutMapper }
  formFieldsMapper={ formFieldsMapper }
  schema={ schema }
  onSubmit={ submit }
  clearOnUnmount
/>
\`\`\`

Schema

\`\`\`jsx
{
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  key: 1,
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will be cleared after unmounting! Be aware!',
  key: 2,
  clearOnUnmount: true,
  condition: {
    when: 'something',
    is: 'something else',
  },
}, {
  component: componentTypes.TEXT_FIELD,
  name: 'shared_field',
  label: 'Value of this field will not be cleared after unmounting! Be aware!',
  key: 3,
  clearOnUnmount: false, // default value
  condition: {
    when: 'something',
    is: 'something else and something',
  },
},
\`\`\`


`;

export default <ReactMarkdown source={ text } />;
