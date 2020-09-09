import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as CarbonFormGroup } from 'carbon-components-react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const FormGroupInternal = ({ meta, Component, FormGroupProps, input, ...rest }) => {
  return <CarbonFormGroup></CarbonFormGroup>;
};

const FormGroup = (props) => {
  const rest = useFieldApi(props);

  return <FormGroupInternal {...rest} />;
};

export default FormGroup;
