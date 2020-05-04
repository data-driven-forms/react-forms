import { useEffect, useContext, useRef, useReducer } from 'react';
import { useField } from 'react-final-form';
import enhancedOnChange from '../form-renderer/enhanced-on-change';
import RendererContext from './renderer-context';
import convertInitialValue from '../form-renderer/convert-initial-value';
import assignSpecialType from '../form-renderer/assign-special-type';
import componentTypes from './component-types';
import { prepareArrayValidator, getValidate } from '../form-renderer/validator-helpers';
import composeValidators from './compose-validators';
import isEqual from 'lodash/isEqual';

const calculateInitialValue = (props) => {
  if (Object.prototype.hasOwnProperty.call(props, 'initialValue') && Object.prototype.hasOwnProperty.call(props, 'dataType')) {
    return convertInitialValue(props.initialValue, props.dataType);
  }
};

const calculateArrayValidator = (props, validate, component, validatorMapper) => {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY === component) {
    return prepareArrayValidator(getValidate(validate, props.dataType, validatorMapper));
  }
};

const calculateValidate = (props, validate, component, validatorMapper) => {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY !== component) {
    return composeValidators(getValidate(validate, props.dataType, validatorMapper));
  }
};

const init = ({ props, validate, component, validatorMapper }) => ({
  initialValue: calculateInitialValue(props),
  arrayValidator: calculateArrayValidator(props, validate, component, validatorMapper),
  validate: calculateValidate(props, validate, component, validatorMapper),
  type: assignSpecialType(component)
});

const reducer = (state, { type, specialType, validate, arrayValidator, initialValue }) => {
  switch (type) {
    case 'setType':
      return {
        ...state,
        type: specialType
      };
    case 'setValidators':
      return {
        ...state,
        validate,
        arrayValidator
      };
    case 'setInitialValue':
      return {
        ...state,
        initialValue
      };
    default:
      return state;
  }
};

const useFieldApi = ({ name, initializeOnMount, component, render, validate, ...props }) => {
  const { actionMapper, validatorMapper, formOptions } = useContext(RendererContext);

  const [{ type, initialValue, validate: stateValidate, arrayValidator }, dispatch] = useReducer(
    reducer,
    { props, validate, component, validatorMapper },
    init
  );

  const mounted = useRef(false);

  const enhancedProps = {
    type,
    ...props,
    ...(initialValue ? { initialValue } : {}),
    ...(stateValidate ? { validate: stateValidate } : {})
  };

  const fieldProps = useField(name, enhancedProps);

  /** Reinitilize type */
  useEffect(() => {
    if (mounted.current) {
      const specialType = assignSpecialType(component);
      if (specialType !== type) {
        dispatch({ type: 'setType', specialType });
      }
    }
  }, [component]);

  /** Reinitilize array validator/validate */
  useEffect(() => {
    if (mounted.current) {
      dispatch({
        type: 'setValidators',
        validate: calculateValidate(props, validate, component, validatorMapper),
        arrayValidator: calculateArrayValidator(props, validate, component, validatorMapper)
      });
    }
  }, [validate, component, props.dataType]);

  /** Re-convert initialValue when changed */
  useEffect(() => {
    if (mounted.current) {
      const newInitialValue = calculateInitialValue(props);
      if (!isEqual(initialValue, newInitialValue)) {
        dispatch({
          type: 'setInitialValue',
          initialValue: newInitialValue
        });
      }
    }
  }, [props.initialValue, props.dataType]);

  useEffect(() => {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      const value = Object.prototype.hasOwnProperty.call(enhancedProps, 'initialValue')
        ? enhancedProps.initialValue
        : formOptions.getFieldState(name).initial;
      fieldProps.input.onChange(value);
    }
  }, [initializeOnMount, enhancedProps.initialValue, fieldProps.meta.initial, props.dataType]);

  /**
   * Prepare deleted value of field
   */
  const fieldClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') ? props.clearedValue : formOptions.clearedValue;

  useEffect(
    () => {
      mounted.current = true;
      if (fieldProps.input.type === 'file') {
        formOptions.registerInputFile(fieldProps.input.name);
      }

      return () => {
        mounted.current = false;
        /**
         * Delete the value from form state when field is inmounted
         */
        if ((formOptions.clearOnUnmount || props.clearOnUnmount) && props.clearOnUnmount !== false) {
          fieldProps.input.onChange(fieldClearedValue);
        }

        if (fieldProps.input.type === 'file') {
          formOptions.unRegisterInputFile(fieldProps.input.name);
        }
      };
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

  const { initialValue: _initialValue, clearOnUnmount, dataType, clearedValue, isEqual: _isEqual, ...cleanProps } = props;

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
      value:
        fieldProps.input.type === 'file' && typeof fieldProps.input.value === 'object' ? fieldProps.input.value.inputValue : fieldProps.input.value,
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
