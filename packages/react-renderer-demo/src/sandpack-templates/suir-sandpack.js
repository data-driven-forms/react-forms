export const html = `
<html>
  <head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/suir-component-mapper/form-template';
import componentMapper from '@data-driven-forms/suir-component-mapper/component-mapper';

import schema from './schema'

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}}>
        <FormRenderer
          schema={schema}
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          onSubmit={console.log}
        />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const wizardCode = `import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import SuirFormTemplate from '@data-driven-forms/suir-component-mapper/form-template';
import componentMapper from '@data-driven-forms/suir-component-mapper/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <SuirFormTemplate {...props} showFormControls={false} />

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}}>
        <FormRenderer
          schema={schema}
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          onSubmit={console.log}
        />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const dependencies = {
  react: 'latest',
  'react-dom': 'latest',
  '@babel/runtime': '^7.13.10',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/suir-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  'semantic-ui-react': 'latest',
  'prop-types': 'latest',
  'react-final-form': '^6.5.9',
  'final-form': '^4.20.10',
  'final-form-arrays': '^3.1.0',
};
