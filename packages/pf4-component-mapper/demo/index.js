import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import { arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import { Title, Button, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import {
  wizardSchema,
  wizardSchemaWithFunction,
  wizardSchemaSimple,
  wizardSchemaSubsteps,
  wizardSchemaMoreSubsteps,
} from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import dualSchema from './demo-schemas/dual-list-schema';
import demoSchema from '../../../shared/demoschema';
import selectSchema from './demo-schemas/select-schema';

const Summary = (props) => <div>Custom summary component.</div>;

const fieldArrayState = {
  schema: arraySchemaDDF,
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
    this.state = { schema: wizardSchema, additionalOptions: {} };
  }

  render() {
    return (
      <div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <Title headingLevel="h2" size="4xl">
            Pf4 component mapper
          </Title>
          <Toolbar style={{ marginBottom: 20, marginTop: 20 }}>
            <ToolbarGroup>
              <ToolbarItem>
                <Button onClick={() => this.setState((state) => ({ schema: selectSchema, additionalOptions: {} }))}>select schema</Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  onClick={() => this.setState((state) => ({ schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }))}
                >
                  Wizard
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button onClick={() => this.setState((state) => fieldArrayState)}>arraySchema</Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button onClick={() => this.setState((state) => ({ schema: sandboxSchema, additionalOptions: {} }))}>Sandbox</Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button onClick={() => this.setState((state) => ({ schema: demoSchema, additionalOptions: {} }))}>Super schema</Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button onClick={() => this.setState((state) => ({ schema: dualSchema, additionalOptions: {} }))}>Dual List</Button>
              </ToolbarItem>
            </ToolbarGroup>
          </Toolbar>
          <FormRenderer
            onSubmit={console.log}
            initialValues={{
              'simple-select': 'Kay',
              'simple-async-select': 'Jenifer',
              'simple-searchable-async-select': 'Jenifer',
              'simple-portal-select': 'Jenifer',
            }}
            componentMapper={{
              ...componentMapper,
              summary: Summary,
            }}
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
            onCancel={console.log}
            schema={this.state.schema}
            uiSchema={this.state.ui}
            {...this.state.additionalOptions}
          />
          {this.state.additionalOptions.wizard && (
            <>
              <div>Nextstep function</div>
              <FormRenderer
                onSubmit={console.log}
                componentMapper={{
                  ...componentMapper,
                  summary: Summary,
                }}
                onCancel={() => console.log('Cancel action')}
                FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                schema={wizardSchemaWithFunction}
                {...this.state.additionalOptions}
              />
              <div>Substeps</div>
              <FormRenderer
                onSubmit={console.log}
                componentMapper={{
                  ...componentMapper,
                  summary: Summary,
                }}
                onCancel={() => console.log('Cancel action')}
                schema={wizardSchemaSubsteps}
                FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                {...this.state.additionalOptions}
              />
              <div>More substep</div>
              <FormRenderer
                onSubmit={console.log}
                componentMapper={{
                  ...componentMapper,
                  summary: Summary,
                }}
                onCancel={() => console.log('Cancel action')}
                schema={wizardSchemaMoreSubsteps}
                FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                {...this.state.additionalOptions}
              />
              <div>Simple wizard</div>
              <FormRenderer
                onSubmit={console.log}
                componentMapper={{
                  ...componentMapper,
                  summary: Summary,
                }}
                onCancel={() => console.log('Cancel action')}
                schema={wizardSchemaSimple}
                FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                {...this.state.additionalOptions}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
