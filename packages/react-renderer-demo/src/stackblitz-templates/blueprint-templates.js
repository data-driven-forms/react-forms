export const html = `
<html>
  <head>
    <!-- Style dependencies -->
    <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
    <!-- Blueprint stylesheets -->
    <link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />
    <link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />
    <link href="https://unpkg.com/@blueprintjs/datetime@^3.10.0/lib/css/blueprint-datetime.css" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/blueprint-component-mapper/form-template';
import componentMapper from '@data-driven-forms/blueprint-component-mapper/component-mapper';

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
import BlueprintFormTemplate from '@data-driven-forms/blueprint-component-mapper/form-template';
import componentMapper from '@data-driven-forms/blueprint-component-mapper/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <BlueprintFormTemplate {...props} showFormControls={false} />

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
  '@data-driven-forms/blueprint-component-mapper': 'latest',
  '@blueprintjs/core': 'latest',
  '@blueprintjs/datetime': 'latest',
  '@blueprintjs/select': 'latest',
  'prop-types': 'latest'
};
