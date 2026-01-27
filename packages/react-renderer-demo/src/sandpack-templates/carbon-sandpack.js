// This css is needed as curently the Carbon mapper is rendering the datepicker input outside of the box
export const css = `.cds--date-picker.cds--date-picker--single * {
  max-width: 100%;
}
.cds--date-picker.cds--date-picker--single{
  max-width: 100%;
}  
`;

export const code = `import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/carbon-component-mapper/form-template';
import componentMapper from '@data-driven-forms/carbon-component-mapper/component-mapper';

import '@carbon/styles/css/styles.css';
import './styles.css';

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
import CarbonFormTemplate from '@data-driven-forms/carbon-component-mapper/form-template';
import componentMapper from '@data-driven-forms/carbon-component-mapper/component-mapper';

import '@carbon/styles/css/styles.css';

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

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

export const dependencies = {
  react: '18.0.0',
  'react-dom': '18.0.0',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/carbon-component-mapper': 'latest',
  '@data-driven-forms/common': 'latest',
  '@carbon/react': '^1.95.0',
  '@carbon/styles': '^1.95.0',
  '@carbon/icons-react': '^11.26.0',
  '@floating-ui/dom': '^1.5.3',
  'prop-types': '^15.8.1',
  '@babel/runtime': '^7.12.1',
  clsx: '^2.0.0',
  'react-final-form': '^6.5.9',
  'final-form': '^4.20.10',
  'final-form-arrays': '^3.1.0',
};
