export const pf4Html = `
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-base.css"/>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-addons.css"/>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const pf4Code = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/dist/cjs/component-mapper';

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

export const pf4WizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import Pf4FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/pf4-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <Pf4FormTemplate {...props} showFormControls={false} />

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

export const pf4Dependencies = {
  react: '^16.12.0',
  'react-dom': '^16.12.0',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/pf4-component-mapper': 'latest',
  '@patternfly/react-core': 'latest',
  '@patternfly/react-icons': 'latest',
  'prop-types': 'latest'
};
