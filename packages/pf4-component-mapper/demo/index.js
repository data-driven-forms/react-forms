/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import miqSchema from './demo-schemas/miq-schema';
import { uiArraySchema, arraySchema, array1Schema, schema, uiSchema, conditionalSchema, arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, FormTemplate } from '../src';
import { Title, Button, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import { wizardSchema, wizardSchemaWithFunction, wizardSchemaSimple, wizardSchemaSubsteps, wizardSchemaMoreSubsteps } from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import dualSchema from './demo-schemas/dual-list-schema';
import demoSchema from '@data-driven-forms/common/src/demoschema';
import selectSchema from './demo-schemas/select-schema';

const Summary = props => <div>Custom summary component.</div>;

const fieldArrayState = { schema: arraySchemaDDF, additionalOptions: {
    initialValues: {
        number: [1,2,3,4],
        minMax: [null, null, null, null]
    }
}};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {schema: selectSchema, additionalOptions: {}} 
    }

    render() {
        return (<div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            <Title headingLevel="h2" size="4xl">Pf4 component mapper</Title>
            <Toolbar style={{ marginBottom: 20, marginTop: 20 }}>
                <ToolbarGroup>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => ({schema: selectSchema, additionalOptions: {}}))}>select schema</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => ({ schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }))}>Wizard</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => fieldArrayState)}>arraySchema</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => ({ schema: sandboxSchema, additionalOptions: {}}))}>Sandbox</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => ({ schema: demoSchema, additionalOptions: {}}))}>Super schema</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button onClick={() => this.setState(state => ({ schema: dualSchema, additionalOptions: {} }))}>Dual List</Button>
                    </ToolbarItem>
                </ToolbarGroup>
            </Toolbar>
            <FormRenderer
                onSubmit={console.log}
                initialValues={{
                    'async-drop-down': 'async-option-2'
                }}
                componentMapper={{
                    ...componentMapper,
                    'dual-list-select': {
                        component: componentMapper['dual-list-select'],
                        renderStatus: ({selected, options}) => `selected ${selected} from ${options}`
                    },
                    summary: Summary
                }}
                FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                onCancel={console.log}
                schema={this.state.schema}
                uiSchema={this.state.ui}
                {...this.state.additionalOptions}
            />
            {this.state.additionalOptions.wizard && <>
                <div>Nextstep function</div>
                <FormRenderer
                    onSubmit={console.log}
                    componentMapper={{
                        ...componentMapper,
                        summary: Summary
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
                        summary: Summary
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
                        summary: Summary
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
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    schema={wizardSchemaSimple}
                    FormTemplate={(props) => <FormTemplate {...props} showFormControls={this.state.additionalOptions.showFormControls} />}
                    {...this.state.additionalOptions}
                    />
            </>}
        </div>
    </div>)
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
