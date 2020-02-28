/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import miqSchema from './demo-schemas/miq-schema';
import { uiArraySchema, arraySchema, array1Schema, schema, uiSchema, conditionalSchema, arraySchemaDDF } from './demo-schemas/widget-schema';
import { componentMapper, formTemplate } from '../src';
import { Title, Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { wizardSchema, wizardSchemaWithFunction, wizardSchemaSimple, wizardSchemaSubsteps, wizardSchemaMoreSubsteps } from './demo-schemas/wizard-schema';
import superSchema from './demo-schemas/superschema';
import sandboxSchema from './demo-schemas/sandbox';

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
        this.state = { schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }
    }

    render() {
        return (<div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            <Title size="4xl">Pf4 component mapper</Title>
            <Toolbar style={{ marginBottom: 20, marginTop: 20 }}>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: wizardSchema, additionalOptions: { showFormControls: false, wizard: true } }))}>Wizard</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => fieldArrayState)}>arraySchema</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: sandboxSchema, additionalOptions: {}}))}>Sandbox</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: superSchema, additionalOptions: {}}))}>Super schema</Button>
                </ToolbarGroup>
            </Toolbar>
            <FormRenderer
                onSubmit={console.log}
                initialValues={{
                    'async-drop-down': 'async-option-2'
                }}
                formFieldsMapper={{
                    ...componentMapper,
                    summary: Summary
                }}
                formTemplate={formTemplate({showFormControls: this.state.additionalOptions.showFormControls})}
                onCancel={console.log}
                schema={this.state.schema}
                uiSchema={this.state.ui}
                {...this.state.additionalOptions}
            />
            {this.state.additionalOptions.wizard && <>
                <div>Nextstep function</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...componentMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    formTemplate={formTemplate({showFormControls: this.state.additionalOptions.showFormControls})}
                    schema={wizardSchemaWithFunction}
                    {...this.state.additionalOptions}
                    />
                <div>Substeps</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...componentMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    schema={wizardSchemaSubsteps}
                    formTemplate={formTemplate({showFormControls: this.state.additionalOptions.showFormControls})}
                    {...this.state.additionalOptions}
                    />
                <div>More substep</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...componentMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    schema={wizardSchemaMoreSubsteps}
                    formTemplate={formTemplate({showFormControls: this.state.additionalOptions.showFormControls})}
                    {...this.state.additionalOptions}
                    />
                <div>Simple wizard</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...componentMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    schema={wizardSchemaSimple}
                    formTemplate={formTemplate({showFormControls: this.state.additionalOptions.showFormControls})}
                    {...this.state.additionalOptions}
                    />
            </>}
        </div>
    </div>)
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
