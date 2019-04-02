import React, { createContext } from 'react';
import { components } from '../constants';
import FieldArray from './array-form-component';

const ComponentType = createContext('');

export default ComponentType;

export const configureContext = ({
  layoutMapper,
  formFieldsMapper,
  formOptions,
}) => ({
  layoutMapper,
  formFieldsMapper: {
    [components.FIELD_ARRAY]: props => <FieldArray { ...props } fieldKey={ props.key } />,
    [components.FIXED_LIST]: props => <FieldArray { ...props } fieldKey={ props.key } />,
    ...formFieldsMapper,
  },
  formOptions,
});
