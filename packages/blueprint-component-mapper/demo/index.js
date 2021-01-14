/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import miqSchema from './demo-schemas/miq-schema';
import { uiArraySchema, arraySchema, array1Schema, schema, uiSchema, conditionalSchema, arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import { Button } from '@blueprintjs/core';
import {
  wizardSchema,
  wizardSchemaWithFunction,
  wizardSchemaSimple,
  wizardSchemaSubsteps,
  wizardSchemaMoreSubsteps
} from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import demoSchema from '@data-driven-forms/common/demoschema';
import dualListSchema from './demo-schemas/dual-list-schema';

const Summary = (props) => <div>Custom summary component.</div>;

const fieldArrayState = {
  schema: dualListSchema,
  additionalOptions: {
    initialValues: {
      number: [1, 2, 3, 4],
      minMax: [null, null, null, null]
    }
  }
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
              summary: Summary
            }}
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
            onCancel={console.log}
            schema={this.state.schema}
            uiSchema={this.state.ui}
            {...this.state.additionalOptions}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
