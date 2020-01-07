/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import miqSchema from './demo-schemas/miq-schema';
import { uiArraySchema, arraySchema, array1Schema, schema, uiSchema, conditionalSchema, arraySchemaDDF } from './demo-schemas/widget-schema';
import { formFieldsMapper, layoutMapper } from '../src';
import { Title, Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { wizardSchema, wizardSchemaWithFunction, wizardSchemaSimple, wizardSchemaSubsteps, wizardSchemaMoreSubsteps } from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';

import selectSchema from "@data-driven-forms/common/src/form-schemas/select.schema";

const Summary = props => <div>Custom summary component.</div>;

const fieldArrayState = { schema: arraySchemaDDF, schemaString: 'default', ui: uiArraySchema, additionalOptions: {
    initialValues: {
        number: [1,2,3,4],
        minMax: [null, null, null, null]
    }
}};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = fieldArrayState
    }

    render() {
        return (<div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            <FormRenderer
                onSubmit={console.log}
                formFieldsMapper={formFieldsMapper}
                onCancel={console.log}
                layoutMapper={layoutMapper}
                schema={selectSchema}
            />
          
        </div>
    </div>)
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
