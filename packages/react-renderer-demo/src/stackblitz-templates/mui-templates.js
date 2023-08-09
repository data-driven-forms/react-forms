export const html = `
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const code = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import schema from './schema'

class App extends Component {
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{margin: 24}}>
          <FormRenderer
            schema={schema}
            FormTemplate={FormTemplate}
            componentMapper={componentMapper}
            onSubmit={console.log}
          />
        </div>
        </LocalizationProvider>
    );
  }
}

render(<App />, document.getElementById('root'));`;

export const wizardCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import MuiFormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';

import schema from './schema'

const FormTemplate = (props) => <MuiFormTemplate {...props} showFormControls={false} />

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
  '@babel/runtime': '^7.12.1',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/mui-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  '@mui/icons-material': 'latest',
  '@mui/x-date-pickers': '^5.0.20',
  '@mui/material': 'latest',
  'prop-types': 'latest',
};
