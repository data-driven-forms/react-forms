import React from 'react';
import PropTypes from 'prop-types';

import FormGroupWrapper from '../form-group/form-group';

import { InputGroup } from '@blueprintjs/core';
import propsCatcher from '../props-catcher/props-catcher';

const TextField = ({ input, ...props }) => <InputGroup id={input.name} {...propsCatcher(props)} {...input} />;

TextField.propTypes = {
  input: PropTypes.object
};

const WrapperTextField = (props) => <FormGroupWrapper {...props} Component={TextField} />;

export default WrapperTextField;
