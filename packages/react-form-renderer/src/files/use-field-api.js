import { useEffect, useContext, useRef, useReducer } from 'react';
import { useField } from '@data-driven-forms/form-state-manager';
import RendererContext from './renderer-context';
import assignSpecialType from '../form-renderer/assign-special-type';
import componentTypes from './component-types';
import { prepareArrayValidator, getValidate } from '../form-renderer/validator-helpers';
import composeValidators from './compose-validators';

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

const createFieldProps = (name, formOptions) => {
  const { value, blur, change, focus, ...meta } = formOptions.getFieldState(name) || {};

  return {
    meta,
    input: { name, value }
  };
};

const useFieldApi = ({ name, initializeOnMount, component, render, validate, resolveProps, ...props }) => {
  const { validatorMapper, formOptions } = useContext(RendererContext);

  const { validate: resolvePropsValidate, ...resolvedProps } = resolveProps
    ? resolveProps(props, createFieldProps(name, formOptions), formOptions) || {}
    : {};

  const finalValidate = resolvePropsValidate || validate;

  const [{ type, validate: stateValidate, arrayValidator }, dispatch] = useReducer(
    reducer,
    { props: { ...props, ...resolvedProps }, validate: finalValidate, component, validatorMapper },
    init
  );

  const mounted = useRef(false);

  const enhancedProps = {
    type,
    name,
    ...props,
    ...resolvedProps,
    ...(stateValidate ? { validate: stateValidate } : {})
  };

  const fieldProps = useField(enhancedProps);

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
        validate: calculateValidate(enhancedProps, finalValidate, component, validatorMapper),
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

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

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
    ...(arrayValidator && { arrayValidator })
  };
};

export default useFieldApi;
