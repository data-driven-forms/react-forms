import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

const AntForm = ({ label, children, layout, component, invalid, isRequired, help }) => {
  return (
    <Form layout={layout} component={component}>
      <Form.Item
        validateStatus={!invalid ? '' : 'error'}
        rules={[
          {
            required: isRequired,
            message: 'Required'
          }
        ]}
        help={help}
        label={label}
        name={label}
      >
        {children}
      </Form.Item>
    </Form>
  );
};

AntForm.propTypes = {
  label: PropTypes.string,
  layout: PropTypes.string,
  children: PropTypes.object,
  help: PropTypes.string,
  isRequired: PropTypes.bool,
  component: PropTypes.string,
  invalid: PropTypes.string
};

export default AntForm;
