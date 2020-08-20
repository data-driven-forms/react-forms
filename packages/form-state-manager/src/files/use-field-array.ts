import useField from './use-field';
import { UseFieldArrayMethods, UseFieldArray } from '../types/use-field-array';
import { FieldArrayApi } from '../types/use-field-array-api';
import useFieldArrayApi from './use-field-array-api';
import { useRef, useContext } from 'react';
import FormManagerContext from './form-manager-context';

const createFieldArrayMethods = (fieldArrayApi: FieldArrayApi, name: string): UseFieldArrayMethods => {
  const obj = Object.entries(fieldArrayApi).reduce(
    (acc, [methodName, apiMethod]) => ({
      ...acc,
      [methodName]: (...args: unknown[]) => apiMethod(name, ...args)
    }),
    {}
  );
  return obj as UseFieldArrayMethods;
};

const useFieldArray: UseFieldArray = (props) => {
  const { change, getFieldValue } = useContext(FormManagerContext);
  const fieldArrayApi = useFieldArrayApi(change, getFieldValue);
  const {
    input: { value },
    meta,
    ...rest
  } = useField(props);

  const { name, initialValue, ...passProps } = props;
  const { current: fieldArrayMethods } = useRef<UseFieldArrayMethods>(createFieldArrayMethods(fieldArrayApi, name));
  const internalValue = Array.isArray(value) ? value : [];

  const fields = {
    length: internalValue.length,
    name,
    value,
    ...fieldArrayMethods,
    ...rest
  };
  return {
    fields,
    meta: { ...meta, length: internalValue.length },
    ...passProps
  };
};

export default useFieldArray;
