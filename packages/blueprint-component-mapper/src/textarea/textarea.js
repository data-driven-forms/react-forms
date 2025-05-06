import React from 'react';
import { TextArea } from '@blueprintjs/core';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';

const Textarea = ({ input, ...props }) => <TextArea id={input.name} {...propsCatcher(props)} {...input} />;

const WrapperTextarea = (props) => <FormGroupWrapper {...props} Component={Textarea} />;

export default WrapperTextarea;
