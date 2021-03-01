import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import { wizardSchema } from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import demoSchema from '@data-driven-forms/common/demoschema';

const fieldArrayState = {
  schema: arraySchemaDDF,
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
          <h1>cool_library-1 component mapper</h1>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <button
              onClick={() => this.setState((state) => ({ schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }))}
            >
              Wizard
            </button>
            <button onClick={() => this.setState((state) => fieldArrayState)}>arraySchema</button>
            <button onClick={() => this.setState((state) => ({ schema: sandboxSchema, additionalOptions: {} }))}>Sandbox</button>
            <button onClick={() => this.setState((state) => ({ schema: demoSchema, additionalOptions: {} }))}>Super schema</button>
          </div>
          <FormRenderer
            onSubmit={console.log}
            initialValues={{
              'async-drop-down': 'async-option-2'
            }}
            componentMapper={componentMapper}
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
