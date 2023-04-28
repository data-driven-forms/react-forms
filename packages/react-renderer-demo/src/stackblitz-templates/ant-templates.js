export const html = `
<html>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { render } from 'react-dom';
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

render(<App />, document.getElementById('root'));`;

export const wizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
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

render(<App />, document.getElementById('root'));`;

export const dependencies = {
  react: 'latest',
  'react-dom': 'latest',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/ant-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  antd: 'latest',
  '@ant-design/icons': 'latest',
  'prop-types': 'latest',
  '@babel/runtime': '^7.12.1',
};
