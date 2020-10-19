import { useEffect, useContext, useRef, useReducer, useState } from 'react';
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

const calculateValidate = (props, validate, component, validatorMapper, setWarning, useWarnings) => {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY !== component) {
    const validateFn = composeValidators(getValidate(validate, props.dataType, validatorMapper));

    if (useWarnings) {
      return async (...args) => {
        setWarning(undefined);

        const result = await validateFn(...args);

        if (result?.type === 'warning') {
          setWarning(result.error);

          return;
        }

        return result;
      };
    }

    return validateFn;
  }
};

const init = ({ props, validate, component, validatorMapper, setWarning, useWarnings }) => ({
  initialValue: calculateInitialValue(props),
  arrayValidator: calculateArrayValidator(props, validate, component, validatorMapper),
  validate: calculateValidate(props, validate, component, validatorMapper, setWarning, useWarnings),
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

const createFieldProps = (name, formOptions) => {
  const { value, blur, change, focus, ...meta } = formOptions.getFieldState(name) || {};

  return {
    meta,
    input: { name, value }
  };
};

const useFieldApi = ({ name, initializeOnMount, component, render, validate, resolveProps, useWarnings, ...props }) => {
  const { validatorMapper, formOptions } = useContext(RendererContext);
  const [warning, setWarning] = useState();

  const { validate: resolvePropsValidate, ...resolvedProps } = resolveProps
    ? resolveProps(props, createFieldProps(name, formOptions), formOptions) || {}
    : {};

  const finalValidate = resolvePropsValidate || validate;

  const [{ type, initialValue, validate: stateValidate, arrayValidator }, dispatch] = useReducer(
    reducer,
    { props: { ...props, ...resolvedProps }, validate: finalValidate, component, validatorMapper, setWarning, useWarnings },
    init
  );

  const mounted = useRef(false);

  const enhancedProps = {
    type,
    ...props,
    ...resolvedProps,
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
        validate: calculateValidate(enhancedProps, finalValidate, component, validatorMapper, setWarning, useWarnings),
        arrayValidator: calculateArrayValidator(enhancedProps, finalValidate, component, validatorMapper)
      });
    }
    /**
     * We have to stringify the validate array in order to preven infinite looping when validate was passed directly to useFieldApi
     * const x = useFieldApu({name: 'foo', validate: [{type: 'bar'}]}) will trigger infinite looping witouth the serialize.
     * Using stringify is acceptable here since the array is usually very small.
     * If we notice performance hit, we can implement custom hook with a deep equal functionality.
     */
  }, [finalValidate ? JSON.stringify(finalValidate) : false, component, enhancedProps.dataType]);

  /** Re-convert initialValue when changed */
  useEffect(() => {
    if (mounted.current) {
      const newInitialValue = calculateInitialValue(enhancedProps);
      if (!isEqual(initialValue, newInitialValue)) {
        dispatch({
          type: 'setInitialValue',
          initialValue: newInitialValue
        });
      }
    }
  }, [enhancedProps.initialValue, enhancedProps.dataType]);

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

  const {
    initialValue: _initialValue,
    clearOnUnmount,
    dataType,
    clearedValue,
    isEqual: _isEqual,
    validate: _validate,
    type: _type,
    ...cleanProps
  } = enhancedProps;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...cleanProps,
    ...fieldProps,
    ...(arrayValidator && { arrayValidator }),
    ...(useWarnings && {
      meta: {
        ...fieldProps.meta,
        warning
      }
    }),
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
