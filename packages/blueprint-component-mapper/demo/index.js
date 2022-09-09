/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import { arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import { Button } from '@blueprintjs/core';
import {
  wizardSchema,
  wizardSchemaWithFunction,
  wizardSchemaSimple,
  wizardSchemaSubsteps,
  wizardSchemaMoreSubsteps,
} from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import demoSchema from '../../../shared/demoschema';
import dualListSchema from './demo-schemas/dual-list-schema';

const Summary = (props) => <div>Custom summary component.</div>;

const fieldArrayState = {
  schema: dualListSchema,
  additionalOptions: {
    initialValues: {
      number: [1, 2, 3, 4],
      minMax: [null, null, null, null],
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = fieldArrayState;
  }

  render() {
    return (
      <div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <h1>Blueprint component mapper</h1>
          <Button onClick={() => this.setState((state) => ({ schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }))}>
            Wizard
          </Button>

          <Button onClick={() => this.setState((state) => fieldArrayState)}>arraySchema</Button>
          <Button onClick={() => this.setState((state) => ({ schema: sandboxSchema, additionalOptions: {} }))}>Sandbox</Button>
          <Button onClick={() => this.setState((state) => ({ schema: demoSchema, additionalOptions: {} }))}>Super schema</Button>
          <Button onClick={() => this.setState((state) => ({ schema: dualListSchema, additionalOptions: {} }))}>Dual list</Button>
          <FormRenderer
            onSubmit={console.log}
            componentMapper={{
              ...componentMapper,
              summary: Summary,
            }}
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
            onCancel={console.log}
            schema={this.state.schema}
            {...this.state.additionalOptions}
          />
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
