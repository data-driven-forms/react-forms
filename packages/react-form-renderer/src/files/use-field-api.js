import { useEffect, useContext } from 'react';
import { useField } from 'react-final-form';
import useFormApi from './use-form-api';
import enhancedOnChange from '../form-renderer/enhanced-on-change';
import RendererContext from './renderer-context';

const useFieldApi = ({ name, initializeOnMount, component, render, validate, dataType, ...props }) => {
  const { actionMapper } = useContext(RendererContext);
  const formOptions = useFormApi();
  const fieldProps = useField(name, { validate, ...props });

  useEffect(() => {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      const initialValue = Object.prototype.hasOwnProperty.call(props, 'initialValue') ? props.initialValue : formOptions.getFieldState(name).initial;
      fieldProps.input.onChange(initialValue);
    }
  }, [initializeOnMount, props.initialValue, fieldProps.meta.initial, fieldProps.input]);

  /**
   * Prepare deleted value of field
   */
  const fieldClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') ? props.clearedValue : formOptions.clearedValue;

  useEffect(
    () => () => {
      /**
       * Delete the value from form state when field is inmounted
       */
      if ((formOptions.clearOnUnmount || props.clearOnUnmount) && props.clearOnUnmount !== false) {
        fieldProps.input.onChange(fieldClearedValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Map actions to props
   */
  let overrideProps = {};
  if (props.actions) {
    Object.keys(props.actions).forEach((prop) => {
      const [action, ...args] = props.actions[prop];
      overrideProps[prop] = actionMapper[action](...args);
    });
  }

  const { initialValue, ...cleanProps } = props;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...cleanProps,
    ...overrideProps,
    ...fieldProps,
    input: {
      ...fieldProps.input,
      onChange: (...args) => {
        enhancedOnChange(
          {
            ...fieldProps.meta,
            dataType,
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
