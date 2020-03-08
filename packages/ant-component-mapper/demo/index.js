/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
//import FormRenderer from '@data-driven-forms/react-form-renderer';
import { Button, Input, Form, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { RedditOutlined } from '@ant-design/icons';
import './style.css';
// import { componentMapper, FormTemplate } from '../src'

// import demoSchema from '@data-driven-forms/common/src/demoschema';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const Demo = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const App = () => (
  <div className="div">
    Hello world
    <Button type="primary">Button</Button>
    <RedditOutlined className="icon" />
    <Demo />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
