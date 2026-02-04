import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer, WizardContext } from '@data-driven-forms/react-form-renderer';
import { arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import {
  Title,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateActions,
  Progress,
  Bullseye
} from '@patternfly/react-core';
import { CogsIcon } from '@patternfly/react-icons';
import {
  wizardSchema,
  wizardSchemaWithFunction,
  wizardSchemaSimple,
  wizardSchemaSubsteps,
  wizardSchemaMoreSubsteps,
  wizardSchemaProgressAfterSubmission,
} from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import dualSchema from './demo-schemas/dual-list-schema';
import demoSchema from '../../../shared/demoschema';
import selectSchema from './demo-schemas/select-schema';
import Select from '../src/select/select/select';

const Summary = (props: any) => <div>Custom summary component.</div>;

const ProgressStepContent = () => {
  const { jumpToStep } = React.useContext(WizardContext);
  const [percentValidated, setPercentValidated] = React.useState(0);

  const tick = React.useCallback(() => {
    if (percentValidated < 100) {
      setPercentValidated(prevValue => prevValue + 20);
    }
  }, [percentValidated]);

  React.useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <Bullseye>
      <EmptyState
        headingLevel="h4"
        titleText={percentValidated === 100 ? 'Validation complete' : 'Validating credentials'}
        icon={CogsIcon}
        variant="lg"
      >
        <EmptyStateBody>
          <Progress value={percentValidated} measureLocation="outside" aria-label="Wizard validation progress" />
        </EmptyStateBody>
        <EmptyStateBody>
          Description can be used to further elaborate on the validation step, or give the user a better idea of how
          long the process will take.
        </EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button isDisabled={percentValidated !== 100} onClick={() => jumpToStep(0)}>
              Go to beginning
            </Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
    </Bullseye>
  );
};

const fieldArrayState = {
  schema: arraySchemaDDF,
  additionalOptions: {
    initialValues: {
      number: [1, 2, 3, 4],
      minMax: [null, null, null, null],
    },
  },
};

interface AppState {
  schema: any;
  additionalOptions: any;
  ui?: any;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { schema: wizardSchema, additionalOptions: {} };
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
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
              <div>Progress after submission</div>
              <FormRenderer
                onSubmit={console.log}
                componentMapper={{
                  ...componentMapper,
                  summary: Summary,
                  'progress-step-content': ProgressStepContent,
                }}
                onCancel={() => console.log('Cancel action')}
                schema={wizardSchemaProgressAfterSubmission}
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
const root = createRoot(container!);

const NEW_OPTIONS = [{ label: 'Different label', value: 2 }];
const asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);

function SelectApp() {
    const onChange = (value: any) => {
      console.log('Selected:', value);
    }
      const initialProps = {
      onChange,
      name: 'test-select',
      id: 'select',
      options: [
        {
          label: 'First option',
          value: 1,
        },
        {
          label: 'Second option',
          value: 2,
        },
      ],
    };
    const asyncLoading = () => Promise.resolve([{ label: 'labelxxx', value: '123' }]);

    const [al, setAl] = useState(() => asyncLoading);
    return (
      <Select
        {...initialProps}
        value={[{ value: '123', label: 'labelxxx' }, 'Not in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    )
}


root.render(<App />);
