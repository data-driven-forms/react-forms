/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import miqSchema from './demo-schemas/miq-schema';
import { uiArraySchema, arraySchema, schema, uiSchema, conditionalSchema } from './demo-schemas/widget-schema';
import { formFieldsMapper, layoutMapper } from '../src';
import { Title, Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { wizardSchema, wizardSchemaSimple, wizardSchemaSubsteps, wizardSchemaMoreSubsteps } from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';

const Summary = props => <div>Custom summary component.</div>;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { schema: wizardSchema, schemaString: 'default', additionalOptions: { showFormControls: false, wizard: true, }};
    }

    render() {
        return (<div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            <Title size="4xl">Pf4 component mapper</Title>
            <Toolbar style={{ marginBottom: 20, marginTop: 20 }}>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: wizardSchema, schemaString: 'default', additionalOptions: { showFormControls: false, wizard: true } }))}>Wizard</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: arraySchema, schemaString: 'mozilla', ui: uiArraySchema, additionalOptions: {}}))}>arraySchema</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: schema, schemaString: 'mozilla', ui: uiSchema, additionalOptions: {}}))}>schema</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: miqSchema, schemaString: 'miq', additionalOptions: {}}))}>miq</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: conditionalSchema, schemaString: 'mozilla', ui: uiSchema, additionalOptions: {}}))}>conditional</Button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Button onClick={() => this.setState(state => ({ schema: sandboxSchema, schemaString: 'default', additionalOptions: {}}))}>Sandbox</Button>
                </ToolbarGroup>
            </Toolbar>
            <FormRenderer
                onSubmit={console.log}
                schemaType={this.state.schemaString}
                formFieldsMapper={{
                    ...formFieldsMapper,
                    summary: Summary
                }}
                onCancel={() => console.log('Cancel action')}
                layoutMapper={layoutMapper}
                schema={this.state.schema}
                uiSchema={this.state.ui}
                {...this.state.additionalOptions}
            />
            {this.state.additionalOptions.wizard && <>
                <div>Substeps</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...formFieldsMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    layoutMapper={layoutMapper}
                    schema={wizardSchemaSubsteps}
                    {...this.state.additionalOptions}
                    />
                <div>More substep</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...formFieldsMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    layoutMapper={layoutMapper}
                    schema={wizardSchemaMoreSubsteps}
                    {...this.state.additionalOptions}
                    />
                <div>Simple wizard</div>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={{
                        ...formFieldsMapper,
                        summary: Summary
                    }}
                    onCancel={() => console.log('Cancel action')}
                    layoutMapper={layoutMapper}
                    schema={wizardSchemaSimple}
                    {...this.state.additionalOptions}
                    />
            </>}
        </div>
    </div>)
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
