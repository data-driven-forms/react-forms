/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { Grid, Row } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '../src'
import { schema, uiSchema, conditionalSchema, arraySchema, uiArraySchema } from './demo-schemas/widget-schema';
import miqSchema from './demo-schemas/miq-schema';
import wizardSchema from './demo-schemas/wizard-schema';
import sandbox from './demo-schemas/sandbox';
import Switch from "../src/form-fields/switch-field";

const loadOptions = () => new Promise((res) => {
  setTimeout(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(data => data.json())
      .then(({ message: { bulldog } }) => bulldog.map(dog => ({ label: dog, value: dog })))
      .then(data => res(data))
  }, 250)
}) 

const selectSchema = {
  fields: [{
    component: 'select-field',
    name: 'async-single',
    label: 'Async single',
    multi: true,
    loadOptions
  },{
    component: 'select-field',
    name: 'async-single-search',
    label: 'Async single search',
    isSearchable: true,
    loadOptions
  }, {
    component: 'select-field',
    name: 'async-multi-search',
    label: 'Async multi search',
    isSearchable: true,
    multi: true,
    loadOptions
  }, {
    component: 'select-field',
    name: 'select-single',
    label: 'Select single',
    isDisabled: true,
    options: [{
      label: 'foo',
      value: 123
    }, {
      label: 'bar',
      value: 231
    }]
  }, {
    component: 'select-field',
    name: 'select-search',
    label: 'Select search',
    isRequired: true,
    validateOnMount: true,
    isDisabled: true,
    isClearable: true,
    multi: true,
    isSearchable: true,
    placeholder: 'Placeholder',
    validate: [{
      type: 'required-validator'
    }],
    options: [{
      label: 'foo',
      value: 123
    }, {
      label: 'bar',
      value: 231
    }, {
      label: 'Super long option label, Super long option label, Super long option label, Super long option label, Super long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option label',
      value: 'x'
    }]
  }, {
    component: 'select-field',
    name: 'select',
    label: 'Select',
    isRequired: true,
    validateOnMount: true,
    isClearable: true,
    multi: false,
    isSearchable: true,
    placeholder: 'Placeholder',
    validate: [{
      type: 'required-validator'
    }],
    options: [{
      label: 'foo',
      value: 123
    }, {
      label: 'bar',
      value: 231
    }, {
      label: 'Super long option label, Super long option label, Super long option label, Super long option label, Super long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option label',
      value: 'x'
    }]
  }]
}

class App extends React.Component {
  render() {
    return (
    <div>
      <h1>Pf3 component mapper</h1>
      <Grid>
        <Row>
          <FormRenderer
            initialValues={{}}
            onSubmit={console.log}
            formFieldsMapper={formFieldsMapper}
            layoutMapper={layoutMapper}
            schema={sandbox}
            onCancel={() => console.log('cancel')}
          />
        </Row>
      </Grid>
    </div>
  )}
}

ReactDOM.render(<App />, document.getElementById('root'));
