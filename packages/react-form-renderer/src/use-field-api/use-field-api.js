import { useEffect, useContext, useRef, useReducer, useState } from 'react';
import { useField } from 'react-final-form';
import enhancedOnChange from './enhanced-on-change';
import RendererContext from '../renderer-context';
import convertInitialValue from './convert-initial-value';
import assignSpecialType from './assign-special-type';
import componentTypes from '../component-types';
import { prepareArrayValidator, getValidate } from './validator-helpers';
import composeValidators from './compose-validators';
import isEqual from 'lodash/isEqual';

const calculateInitialValue = (props) => {
  if (Object.prototype.hasOwnProperty.call(props, 'initialValue') && props.dataType) {
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

const useFieldApi = ({ name, resolveProps, skipRegistration = false, ...props }) => {
  const { validatorMapper, formOptions } = useContext(RendererContext);
  const [warning, setWarning] = useState();

  const resolvedProps = resolveProps ? resolveProps(props, createFieldProps(name, formOptions), formOptions) || {} : {};

  const combinedProps = { ...props, ...resolvedProps };
  const { initializeOnMount, component, render, validate, useWarnings, clearOnUnmount, dataType, FieldProps, ...rest } = combinedProps;

  const [{ type, initialValue, validate: stateValidate, arrayValidator }, dispatch] = useReducer(
    reducer,
    { props: combinedProps, validate, component, validatorMapper, setWarning, useWarnings },
    init
  );

  const mounted = useRef(false);

  const enhancedProps = {
    dataType,
    type: combinedProps.type,
    ...(Object.prototype.hasOwnProperty.call(combinedProps, 'initialValue') ? { initialValue: combinedProps.initialValue } : {}),
    ...(Object.prototype.hasOwnProperty.call(combinedProps, 'value') ? { value: combinedProps.value } : {}),
    ...FieldProps,
    ...(type ? { type } : {}),
    ...(initialValue ? { initialValue } : {}),
    ...(stateValidate ? { validate: stateValidate } : {})
  };

  const field = useField(name, enhancedProps);

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
        validate: calculateValidate(enhancedProps, validate, component, validatorMapper, setWarning, useWarnings),
        arrayValidator: calculateArrayValidator(enhancedProps, validate, component, validatorMapper)
      });
    }
    /**
     * We have to stringify the validate array in order to preven infinite looping when validate was passed directly to useFieldApi
     * const x = useFieldApu({name: 'foo', validate: [{type: 'bar'}]}) will trigger infinite looping witouth the serialize.
     * Using stringify is acceptable here since the array is usually very small.
     * If we notice performance hit, we can implement custom hook with a deep equal functionality.
     */
  }, [validate ? JSON.stringify(validate) : false, component, dataType]);

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
  }, [enhancedProps.initialValue, dataType]);

  useEffect(() => {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      const value = Object.prototype.hasOwnProperty.call(enhancedProps, 'initialValue')
        ? enhancedProps.initialValue
        : formOptions.getFieldState(name).initial;
      field.input.onChange(value);
    }
  }, [initializeOnMount, enhancedProps.initialValue, field.meta.initial, dataType]);

  /**
   * Prepare deleted value of field
   */
  const fieldClearedValue = Object.prototype.hasOwnProperty.call(rest, 'clearedValue') ? rest.clearedValue : formOptions.clearedValue;

  useEffect(
    () => {
      if (!skipRegistration) {
        formOptions.internalRegisterField(name);
      }

      mounted.current = true;
      if (field.input.type === 'file') {
        formOptions.registerInputFile(field.input.name);
      }

      return () => {
        mounted.current = false;
        /**
         * Delete the value from form state when field is inmounted
         */
        if ((formOptions.clearOnUnmount || clearOnUnmount) && clearOnUnmount !== false) {
          field.input.onChange(fieldClearedValue);
        }

        if (field.input.type === 'file') {
          formOptions.unRegisterInputFile(field.input.name);
        }

        if (!skipRegistration) {
          formOptions.internalUnRegisterField(name);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { initialValue: _initialValue, clearedValue, ...cleanProps } = rest;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...cleanProps,
    ...field,
    ...(arrayValidator && { arrayValidator }),
    ...(useWarnings && {
      meta: {
        ...field.meta,
        warning
      }
    }),
    input: {
      ...field.input,
      value: field.input.type === 'file' && typeof field.input.value === 'object' ? field.input.value.inputValue : field.input.value,
      onChange: (...args) => {
        enhancedOnChange(
          {
            ...field.meta,
            dataType,
            onChange: field.input.onChange,
            clearedValue: fieldClearedValue
          },
          ...args
        );
      }
    }
  };
};

export default useFieldApi;
