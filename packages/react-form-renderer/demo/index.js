/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '../src';
import layoutMapper from './layout-mapper';
import formFieldsMapper from './form-fields-mapper';
import miqSchema from '../src/demo-schemas/miq-schemas/input';
import sandboxSchema from './sandbox'
import { conditionalSchema, widgetSchema, uiWidgetSchema, arraySchema, uiArraySchema } from '../src/demo-schemas/mozilla-schemas';

const submitTest = (...args) => new Promise(resolve => {
    setTimeout(() => {
        console.log('args: ', args)
        resolve('true')
    }, 1500)
})

const FormButtons = props => {
    return (
        <div>
            <button disabled={props.submitting} type="button" onClick={props.form.submit}>Submit</button>
        </div>
    )
}

const App = () => (
    <div style={{ padding: 20 }}>
        <FormRenderer
            layoutMapper={layoutMapper}
            formFieldsMapper={formFieldsMapper}
            onSubmit={submitTest}
            onCancel={console.log}
            canReset
            onReset={() => console.log('i am resseting')}
            schemaType="default"
            schema={sandboxSchema}
            uiSchema={uiArraySchema}
            buttonOrder={['cancel', 'reset', 'submit']}
            buttonClassName="Foo"
            onStateUpdate={console.log}
            renderFormButtons={FormButtons}
        />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
