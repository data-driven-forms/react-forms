import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

const AntForm = ({ label, children, layout, component, invalid, isRequired, help }) => {
  return (
    <Form.Item validateStatus={!invalid ? '' : 'error'} help={help} label={label} name={label}>
      <div>{children}</div>
    </Form.Item>
  );
};

AntForm.propTypes = {
  label: PropTypes.string,
  layout: PropTypes.string,
  children: PropTypes.object,
  help: PropTypes.string,
  isRequired: PropTypes.bool,
  component: PropTypes.string,
  invalid: PropTypes.oneOfType(PropTypes.string, PropTypes.bool)
};

export default AntForm;
