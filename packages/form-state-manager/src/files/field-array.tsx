import React from 'react';
import useFieldArray from './use-field-array';
import FieldArrayProps from '../types/field-array';

const FieldArray = ({ children, ...props }: FieldArrayProps): React.ReactNode => {
  const fieldArrayProps = useFieldArray(props);
  return children(fieldArrayProps);
};

export default FieldArray;
