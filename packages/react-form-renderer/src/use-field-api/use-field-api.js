import { useEffect, useContext, useRef, useReducer } from 'react';
import { useField } from '@data-driven-forms/form-state-manager';
import RendererContext from '../renderer-context';
import assignSpecialType from './assign-special-type';
import componentTypes from '../component-types';
import { prepareArrayValidator, getValidate } from './validator-helpers';
import composeValidators from '../compose-validators';

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

const useFieldApi = ({ name, resolveProps, skipRegistration = false, ...props }) => {
  const { validatorMapper, formOptions } = useContext(RendererContext);

  const resolvedProps = resolveProps ? resolveProps(props, createFieldProps(name, formOptions), formOptions) || {} : {};

  const combinedProps = { ...props, ...resolvedProps };
  const { component, render, validate, FieldProps, dataType, ...rest } = combinedProps;

  const [{ type, validate: stateValidate, arrayValidator }, dispatch] = useReducer(
    reducer,
    { props: combinedProps, validate, component, validatorMapper },
    init
  );

  const mounted = useRef(false);

  const enhancedProps = {
    name,
    dataType,
    ...rest,
    ...FieldProps,
    ...(type ? { type } : {}),
    ...(stateValidate ? { validate: stateValidate } : {})
  };

  const field = useField(enhancedProps);

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
        validate: calculateValidate(enhancedProps, validate, component, validatorMapper),
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

  useEffect(() => {
    mounted.current = true;

    if (!skipRegistration) {
      formOptions.internalRegisterField(name);
    }

    return () => {
      mounted.current = false;

      if (!skipRegistration) {
        formOptions.internalUnRegisterField(name);
      }
    };
  }, []);

  const finalProps = { ...rest, ...field };

  const {
    initialValue: _initialValue,
    clearedValue,
    clearOnUnmount,
    initializeOnMount,
    dataType: _dataType,
    isEqual: _isEqual,
    ...cleanProps
  } = finalProps;

  /**
   * construct component props necessary that would live in field provider
   */
  return {
    ...cleanProps,
    ...(arrayValidator && { arrayValidator })
  };
};

export default useFieldApi;
