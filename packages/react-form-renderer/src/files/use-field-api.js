import { useEffect, useContext } from 'react';
import { useField } from 'react-final-form';
import useFormApi from './use-form-api';
import enhancedOnChange from '../form-renderer/enhanced-on-change';
import RendererContext from './renderer-context';
import convertInitialValue from '../form-renderer/convert-initial-value';
import assignSpecialType from '../form-renderer/assign-special-type';
import componentTypes from './component-types';
import { prepareArrayValidator, getValidate } from '../form-renderer/validator-helpers';
import composeValidators from './compose-validators';

const useFieldApi = ({ name, initializeOnMount, component, render, validate, type, ...props }) => {
  const { actionMapper, validatorMapper } = useContext(RendererContext);

  const formOptions = useFormApi();

  /** Assign type (checkbox, radio ) */
  let enhancedProps = {
    type: type || assignSpecialType(component)
  };

  /** Convert initialValue to correct dataType */
  if (Object.prototype.hasOwnProperty.call(props, 'initialValue') && Object.prototype.hasOwnProperty.call(props, 'dataType')) {
    enhancedProps = {
      ...enhancedProps,
      initialValue: convertInitialValue(props.initialValue, props.dataType)
    };
  }

  /** Add validate/array validator when needed */
  let arrayValidator;
  if (validate || props.dataType) {
    if (componentTypes.FIELD_ARRAY === component) {
      arrayValidator = prepareArrayValidator(getValidate(validate, props.dataType, validatorMapper));
    } else {
      enhancedProps = {
        ...enhancedProps,
        validate: composeValidators(getValidate(validate, props.dataType, validatorMapper))
      };
    }
  }

  enhancedProps = {
    ...props,
    ...enhancedProps
  };

  const fieldProps = useField(name, enhancedProps);

  useEffect(() => {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      const initialValue = Object.prototype.hasOwnProperty.call(enhancedProps, 'initialValue')
        ? enhancedProps.initialValue
        : formOptions.getFieldState(name).initial;
      fieldProps.input.onChange(initialValue);
    }
  }, [initializeOnMount, enhancedProps.initialValue, fieldProps.meta.initial]);

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

  const { initialValue, clearOnUnmount, dataType, ...cleanProps } = props;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...cleanProps,
    ...overrideProps,
    ...fieldProps,
    ...(arrayValidator ? { arrayValidator } : {}),
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
