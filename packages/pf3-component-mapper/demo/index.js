/* eslint-disable */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { Grid, Row, Button } from 'patternfly-react';
import { componentMapper, FormTemplate } from '../src'
import { schema, uiSchema, conditionalSchema, arraySchema, uiArraySchema } from './demo-schemas/widget-schema';
import miqSchema from './demo-schemas/miq-schema';
import wizardSchema from './demo-schemas/wizard-schema';
import sandbox from './demo-schemas/sandbox';
import Switch from "../src/form-fields/switch-field";

import demoSchema from '@data-driven-forms/common/demoschema';

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
    component: 'select',
    name: 'falsey-values',
    label: 'Falsey values',
    options: [{
      label: 'Zero',
      value: 0
    }, {
      label: 'Minus one',
      value: -1
    }, {
      label: 'Empty',
      value: 'empty'
    }, {
      label: 'Null',
      value: null
    }]
  }, {
    component: 'select',
    name: 'async-single',
    label: 'Async single',
    isMulti: true,
    loadOptions
  },{
    component: 'select',
    name: 'async-single-search',
    label: 'Async single search',
    isSearchable: true,
    loadOptions
  }, {
    component: 'select',
    name: 'async-multi-search',
    label: 'Async multi search',
    isSearchable: true,
    isMulti: true,
    loadOptions
  }, {
    component: 'select',
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
    component: 'select',
    name: 'select-search',
    label: 'Select search',
    isRequired: true,
    validateOnMount: true,
    isDisabled: true,
    isClearable: true,
    isMulti: true,
    isSearchable: true,
    placeholder: 'Placeholder',
    validate: [{
      type: 'required'
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
    component: 'select',
    name: 'select',
    label: 'Select',
    isRequired: true,
    validateOnMount: true,
    isClearable: true,
    isMulti: false,
    isSearchable: true,
    placeholder: 'Placeholder',
    validate: [{
      type: 'required'
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

const App = () => {
  const [schema, setSchema] = useState(wizardSchema)

  return (
    <div>
    <h1>Pf3 component mapper</h1>
    <Grid>
      <Row>
        <Button onClick={() => setSchema(sandbox)}>Default schema</Button>
        <Button onClick={() => setSchema(demoSchema)}>Super schema</Button>
        <Button onClick={() => setSchema(wizardSchema)}>Wizard schema</Button>
      </Row>
      <Row>
        <FormRenderer
          initialValues={{}}
          onSubmit={console.log}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} />}
          schema={schema}
          onCancel={() => console.log('cancel')}
        />
      </Row>
    </Grid>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
