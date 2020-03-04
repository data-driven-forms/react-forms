/* eslint-disable */
import React, { useState, memo } from "react";
import ReactDOM from "react-dom";
import FormRenderer from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';
import sandboxSchema from './sandbox'

const intl = (name) => `translated ${name}`

const actionMapper = {
    loadData: (data) => () => new Promise((resolve) => setTimeout(() => resolve({ custom: 'ererewr', ...data }), 1700)),
    loadLabel: intl
}


const ChildForm = memo(({setValues}) => (
    <FormRenderer
        key="HELP"
        initialValues={{
            text_box_1: 'hue',
            text_box_3: 'initial'
        }}
        clearedValue={'bla'}
        componentMapper={componentMapper}
        onSubmit={(values) => console.log(values)}
        onCancel={console.log}
        canReset
        onReset={() => console.log('i am resseting')}
        schema={sandboxSchema}
        onStateUpdate={state => setValues(state.values)}
        FormTemplate={FormTemplate}
        actionMapper={actionMapper}
    />
))

const App = () => {
    const [values, setValues] = useState({})
    return (
    <div style={{ padding: 20 }}>
        <ChildForm setValues={setValues} />
        <div>
            {JSON.stringify(values, null, 2)}
        </div>
    </div>
)}

ReactDOM.render(<App />, document.getElementById('root'));
