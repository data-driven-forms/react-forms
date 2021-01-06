export const html = `
<html>
  <head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { render } from 'react-dom';
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

render(<App />, document.getElementById('root'));`;

export const wizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
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

render(<App />, document.getElementById('root'));`;

export const dependencies = {
  react: '^16.12.0',
  'react-dom': '^16.12.0',
  '@babel/runtime': '7.12.1',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/suir-component-mapper': 'latest',
  'semantic-ui-react': 'latest',
  'prop-types': 'latest'
};
