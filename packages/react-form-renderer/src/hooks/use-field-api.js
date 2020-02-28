import { useEffect } from 'react';
import { useField } from 'react-final-form';
import useFormApi from './use-form-api';
import enhancedOnChange from '../form-renderer/enhanced-on-change';

const useFieldApi = ({ name, initializeOnMount, component, render, ...props }) => {
  const formOptions = useFormApi();
  const fieldProps = useField(name, props);

  useEffect(() => {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      const initialValue = props.initialValue || fieldProps.meta.initial;
      fieldProps.input.onChange(initialValue);
    }

    return () => {
      /**
       * Delete the value from form state when field is inmounted
       */
      if ((formOptions.clearOnUnmount || props.clearOnUnmount) && props.clearOnUnmount !== false) {
        fieldProps.input.onChange(undefined);
      }
    };
  }, [initializeOnMount, props.initialValue, fieldProps.meta.initial, props.clearOnUnmount, fieldProps.input, formOptions.clearOnUnmount]);

  /**
   * Prepare deleted value of field
   */
  const fieldClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') ? props.clearedValue : formOptions.clearedValue;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...props,
    formOptions,
    ...fieldProps,
    input: {
      ...fieldProps.input,
      onChange: (...args) => {
        enhancedOnChange(
          {
            ...fieldProps.meta,
            dataType: props.dataType,
            onChange: fieldProps.input.onChange,
            clearedValue: fieldClearedValue
          },
          ...args
        );
      }
    }
  };
};

export default useFieldApi;
