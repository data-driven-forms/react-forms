export const html = `
<html>
  <head>
    <!-- Style dependencies -->
    <link href="https://unpkg.com/normalize.css@^8.0.1" rel="stylesheet" />
    <!-- Blueprint stylesheets -->
    <link href="https://unpkg.com/@blueprintjs/icons@^4.2.1/lib/css/blueprint-icons.css" rel="stylesheet" />
    <link href="https://unpkg.com/@blueprintjs/core@^4.2.1/lib/css/blueprint.css" rel="stylesheet" />
    <link href="https://unpkg.com/@blueprintjs/datetime@^4.1.4/lib/css/blueprint-datetime.css" rel="stylesheet" />
    <style>
      body {
        margin: 0;
      }
      .bp4-slider {
        width: 100%;
      }
      .bp4-slider-axis {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/blueprint-component-mapper/form-template';
import componentMapper from '@data-driven-forms/blueprint-component-mapper/component-mapper';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import schema from './schema'

// Hide slider axis labels to prevent number ghosting
const style = document.createElement('style');
style.textContent = '.bp4-slider-axis { display: none; }';
document.head.appendChild(style);

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
import BlueprintFormTemplate from '@data-driven-forms/blueprint-component-mapper/form-template';
import componentMapper from '@data-driven-forms/blueprint-component-mapper/component-mapper';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import schema from './schema'

// Hide slider axis labels to prevent number ghosting
const style = document.createElement('style');
style.textContent = '.bp4-slider-axis { display: none; }';
document.head.appendChild(style);

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

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const dependencies = {
  react: '^18.0.0',
  'react-dom': '^18.0.0',
  '@babel/runtime': '^7.12.1',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/blueprint-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  '@blueprintjs/core': '^4.2.1',
  '@blueprintjs/datetime': '^4.1.4',
  '@blueprintjs/select': '^4.1.4',
  '@blueprintjs/icons': '^4.2.1',
  'normalize.css': '^8.0.1',
  'react-final-form': '^6.5.9',
  'final-form': '^4.20.10',
  'final-form-arrays': '^3.1.0',
  'prop-types': '^15.8.1',
  'react-transition-group': '^4.4.5',
  classnames: '^2.3.2',
};
