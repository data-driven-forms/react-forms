import React from 'react';
import ReactMarkdown from '../md-helper';

const text =  `React form renderer is a component designed for ManageIQ and Insights projects that takes json form definitions and renders them into react components. It uses [React final form](https://github.com/final-form/react-final-form) for the form state management. It is highly recommended to check their documentations first to fully understand how the [data-driven-forms](https://github.com/data-driven-forms) libraries work.

Code example:

\`\`\`JSX
import FormRender from '@data-driven-forms/react-form-renderer';

const DataDrivenForm = () => (
  <FormRender
    formFieldsMapper={formFieldsMapper}
    layoutMapper={layoutMapper}
    schema={schema}
    onSubmit={...}
    onCancel={...}
    onReset={...}
    canReset
  />
);
\`\`\`
`;

export default <ReactMarkdown source={ text } />;
