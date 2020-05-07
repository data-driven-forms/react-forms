export const pf3Html = `
<html>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/patternfly/3.59.5/css/patternfly.min.css" integrity="sha256-rLJV3jlFRU38RbS+z4Ee+xgtP71nt4Tg+d1OTGmnJkw=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/patternfly/3.59.5/css/rcue-additions.min.css" integrity="sha256-EEeyytLpURfKdhoE1oXWs0mo3YjRso+hZIWdDyjUQQI=" crossorigin="anonymous" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const pf3Code = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import FormTemplate from '@data-driven-forms/pf3-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/pf3-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

import 'patternfly-react/dist/css/patternfly-react.css'

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

export const pf3WizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import Pf3FormTemplate from '@data-driven-forms/pf3-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/pf3-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <Pf3FormTemplate {...props} showFormControls={false} />

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

export const pf3Dependencies = {
  react: '^16.12.0',
  'react-dom': '^16.12.0',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/pf3-component-mapper': 'latest',
  'patternfly-react': '2.39.7',
  'prop-types': 'latest'
};
