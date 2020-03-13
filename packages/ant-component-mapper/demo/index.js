/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import 'antd/dist/antd.css';
import './style.css';
import { /*  componentMapper, */ FormTemplate } from '../src';

//import { RedditOutlined } from '@ant-design/icons';
//import { Button, Input, Form, Checkbox } from 'antd';
// import demoSchema from '@data-driven-forms/common/src/demoschema';

const currentSchema = {
  title: 'someTitle',
  description: 'someDescription',
  fields: []
};
const App = () => ( 
  <FormRenderer 
    componentMapper={{}} 
    FormTemplate={props => <FormTemplate {...props} />} 
    onSubmit={console.log} 
    schema={currentSchema} 
  />
)

ReactDOM.render(<App />, document.getElementById('root'));
