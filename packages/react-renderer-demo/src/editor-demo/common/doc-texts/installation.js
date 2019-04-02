import React from 'react';
import ReactMarkdown from '../md-helper';

const text =  `\`\`\`console
npm install --save @data-driven-forms/react-form-renderer
\`\`\`
or
\`\`\`console
yarn add @data-driven-forms/react-form-renderer
\`\`\`
`;

export default <ReactMarkdown source={ text } />;
