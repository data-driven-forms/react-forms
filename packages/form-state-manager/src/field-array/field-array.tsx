import React from 'react';
import AnyObject from '../any-object';
import useFieldArray from '../use-field-array';
import { UseFieldArrayConfig } from '../use-field-array';

export interface FieldArrayProps extends UseFieldArrayConfig {
  children: (props: AnyObject) => React.ReactNode;
}

const FieldArray = ({ children, ...props }: FieldArrayProps): React.ReactNode => {
  const fieldArrayProps = useFieldArray(props);
  return children(fieldArrayProps);
};

export default FieldArray;
