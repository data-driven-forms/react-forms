export const html = `
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <style>
      body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
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
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import schema from './schema'

const theme = createTheme();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const wizardCode = `import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import MuiFormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import schema from './schema'

const theme = createTheme();

const FormTemplate = (props) => <MuiFormTemplate {...props} showFormControls={false} />

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{margin: 24}}>
          <FormRenderer
            schema={schema}
            FormTemplate={FormTemplate}
            componentMapper={componentMapper}
            onSubmit={console.log}
          />
        </div>
      </ThemeProvider>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const dependencies = {
  react: 'latest',
  'react-dom': 'latest',
  '@babel/runtime': '^7.12.1',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/mui-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  '@mui/icons-material': '^5.10.3',
  '@mui/x-date-pickers': '^6.13.0',
  '@mui/material': '^5.18.0',
  'prop-types': 'latest',
  'react-final-form': '^6.5.9',
  'final-form': '^4.20.10',
  'final-form-arrays': '^3.1.0',
  'date-fns': '^2.16.1',
};
