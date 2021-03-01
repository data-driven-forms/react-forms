export const html = `
<html>
  <head>
    <!-- Carbon stylesheets -->
    <link rel="stylesheet" href="https://unpkg.com/carbon-components/css/carbon-components.min.css">
    </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/carbon-component-mapper/form-template';
import componentMapper from '@data-driven-forms/carbon-component-mapper/component-mapper';

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
import CarbonFormTemplate from '@data-driven-forms/carbon-component-mapper/form-template';
import componentMapper from '@data-driven-forms/carbon-component-mapper/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <CarbonFormTemplate {...props} showFormControls={false} />

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
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/carbon-component-mapper': 'latest',
  '@carbon/icons-react': 'latest',
  'carbon-components': 'latest',
  'carbon-components-react': 'latest',
  'carbon-icons': 'latest',
  'prop-types': 'latest'
};
