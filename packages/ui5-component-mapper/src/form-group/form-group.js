import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '@ui5/webcomponents-react';

const FormGroup = ({ children, label }) => <FormItem label={label}>{children}</FormItem>;

FormGroup.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
};

export default FormGroup;
