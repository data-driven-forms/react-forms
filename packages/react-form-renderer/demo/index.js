/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '../src';
import layoutMapper from './layout-mapper';
import formFieldsMapper from './form-fields-mapper';
import sandboxSchema from './sandbox'

const submitTest = (...args) => new Promise(resolve => {
    setTimeout(() => {
        console.log('args: ', args)
        resolve('true')
    }, 1500)
})

const FormButtons = props => {
    return (
        <div>
            <button disabled={props.submitting || props.pristine} type="submit">Submit</button>
            <button onClick={props.reset}>reset</button>
        </div>
    )
}

const App = () => (
    <div style={{ padding: 20 }}>
        <FormRenderer
            initialValues={{
                text_box_1: 'hue',
                text_box_3: 'initial'
            }}
            keepDirtyOnReinitialize
            clearedValue={'bla'}
            layoutMapper={layoutMapper}
            formFieldsMapper={formFieldsMapper}
            onSubmit={() => console.log(554)}
            onCancel={console.log}
            canReset
            onReset={() => console.log('i am resseting')}
            schema={sandboxSchema}
            buttonOrder={['cancel', 'reset', 'submit']}
            buttonClassName="Foo"
            renderFormButtons={FormButtons}
        />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
