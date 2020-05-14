import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from '@blueprintjs/core';

import FormGroupWrapper from './form-group';
import propsCatcher from '../common/props-catcher';

const Textarea = ({ input, ...props }) => <TextArea id={input.name} {...propsCatcher(props)} {...input} />;

Textarea.propTypes = {
  input: PropTypes.object
};

const WrapperTextarea = (props) => <FormGroupWrapper {...props} Component={Textarea} />;

export default WrapperTextarea;
