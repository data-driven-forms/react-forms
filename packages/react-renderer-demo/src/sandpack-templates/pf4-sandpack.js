export const html = `
<html>
  <head>
    <style>
      body {
        margin: 0;
        font-family: 'RedHatDisplay', 'Overpass', overpass, helvetica, arial, sans-serif;
      }
      #root {
        padding: 0;
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
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';

import '@patternfly/react-core/dist/styles/base.css';

import schema from './schema'

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}} className="pf-v6-c-page">
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
import Pf4FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';

import '@patternfly/react-core/dist/styles/base.css';

import schema from './schema'

const FormTemplate = (props) => <Pf4FormTemplate {...props} showFormControls={false} />

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}} className="pf-v6-c-page">
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
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/pf4-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  '@patternfly/react-core': '^6.0.0',
  '@patternfly/react-icons': '^6.0.0',
  '@patternfly/react-styles': '^6.0.0',
  'prop-types': 'latest',
  '@babel/runtime': '^7.12.1',
  tslib: '^2.0.0',
};
