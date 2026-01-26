export const html = `
<html>
  <head>
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
import FormTemplate from '@data-driven-forms/ant-component-mapper/form-template';
import componentMapper from '@data-driven-forms/ant-component-mapper/component-mapper';
import 'antd/dist/antd.css'

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
import AntFormTemplate from '@data-driven-forms/ant-component-mapper/form-template';
import componentMapper from '@data-driven-forms/ant-component-mapper/component-mapper';
import 'antd/dist/antd.css'

import schema from './schema'

const FormTemplate = (props) => <AntFormTemplate {...props} showFormControls={false} />

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
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/ant-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  antd: '^4.0.0',
  '@ant-design/icons': '^4.7.0',
  'prop-types': 'latest',
  '@babel/runtime': '^7.12.1',
  'react-final-form': '^6.5.9',
  'final-form': '^4.20.10',
  'final-form-arrays': '^3.1.0',
};
