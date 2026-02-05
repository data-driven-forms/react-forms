import { useEffect, useContext, useRef, useReducer, useState, ReactNode } from 'react';
import { useField, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import enhancedOnChange from './enhanced-on-change';
import RendererContext from '../renderer-context';
import convertInitialValue from './convert-initial-value';
import assignSpecialType from './assign-special-type';
import componentTypes from '../component-types';
import { prepareArrayValidator, getValidate, ValidatorDefinition, MainValidatorMapper } from './validator-helpers';
import composeValidators from '../compose-validators';
import { ValidatorFunction } from '../validators/validators';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import { AnyObject } from '../common-types';
import { DataType } from '../data-types/data-types';

export interface ValidatorType extends Object {
  type: string;
  message?: ReactNode;
}

export interface UseFieldApiConfig extends AnyObject {
  name: string;
  validate?: (ValidatorDefinition | ValidatorFunction)[];
  skipRegistration?: boolean;
  useWarnings?: boolean;
  resolveProps?: (props: any, fieldProps: any, formOptions: any) => any;
  initializeOnMount?: boolean;
  component?: string;
  render?: any;
  clearOnUnmount?: boolean;
  dataType?: DataType;
  FieldProps?: any;
  clearedValue?: any;
  initialValue?: any;
  value?: any;
  type?: string;
}

export interface UseFieldApiComponentConfig extends UseFieldConfig<any> {
  name: string;
}

export interface Meta<FieldValue> extends FieldMetaState<FieldValue> {
  warning?: any;
}

export interface UseFieldApiProps<FieldValue, T extends HTMLElement = HTMLElement> extends AnyObject {
  input: FieldInputProps<FieldValue, T>;
  meta: Meta<FieldValue>;
  arrayValidator?: ValidatorFunction;
}

// Utility type for creating properly typed custom field component props
// Combines UseFieldApiConfig with custom props to avoid & any workarounds
export type BaseFieldProps<P = {}> = UseFieldApiConfig & P;

interface FieldState {
  initialValue?: any;
  arrayValidator?: ValidatorFunction;
  validate?: ValidatorFunction;
  type?: string;
}

interface FieldAction {
  type: 'setType' | 'setValidators' | 'setInitialValue';
  specialType?: string;
  validate?: ValidatorFunction;
  arrayValidator?: ValidatorFunction;
  initialValue?: any;
}

interface InitProps {
  props: UseFieldApiConfig;
  validate?: (ValidatorDefinition | ValidatorFunction)[];
  component: string;
  validatorMapper: MainValidatorMapper;
  setWarning: (warning: any) => void;
  useWarnings?: boolean;
}

const calculateInitialValue = (props: UseFieldApiConfig): any => {
  if (Object.prototype.hasOwnProperty.call(props, 'initialValue') && props.dataType) {
    return convertInitialValue(props.initialValue, props.dataType);
  }
};

const calculateArrayValidator = (
  props: UseFieldApiConfig,
  validate?: (ValidatorDefinition | ValidatorFunction)[],
  component?: string,
  validatorMapper?: MainValidatorMapper
): ValidatorFunction | undefined => {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY === component) {
    return prepareArrayValidator(getValidate(validate, props.dataType, validatorMapper));
  }
};

const calculateValidate = (
  props: UseFieldApiConfig,
  validate?: (ValidatorDefinition | ValidatorFunction)[],
  component?: string,
  validatorMapper?: MainValidatorMapper,
  setWarning?: (warning: any) => void,
  useWarnings?: boolean
): ValidatorFunction | undefined => {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY !== component) {
    const validateFn = composeValidators(getValidate(validate, props.dataType, validatorMapper));

    if (useWarnings) {
      return async (value: any, allValues?: object, meta?: object) => {
        setWarning?.(undefined);

        const result = await validateFn(value, allValues, meta);

        if (result?.type === 'warning') {
          setWarning?.(result.error);

          return;
        }

        return result;
      };
    }

    return validateFn;
  }
};

const init = ({ props, validate, component, validatorMapper, setWarning, useWarnings }: InitProps): FieldState => ({
  initialValue: calculateInitialValue(props),
  arrayValidator: calculateArrayValidator(props, validate, component, validatorMapper),
  validate: calculateValidate(props, validate, component, validatorMapper, setWarning, useWarnings),
  type: assignSpecialType(component as any),
});

const reducer = (state: FieldState, action: FieldAction): FieldState => {
  switch (action.type) {
    case 'setType':
      return {
        ...state,
        type: action.specialType,
      };
    case 'setValidators':
      return {
        ...state,
        validate: action.validate,
        arrayValidator: action.arrayValidator,
      };
    case 'setInitialValue':
      return {
        ...state,
        initialValue: action.initialValue,
      };
    default:
      return state;
  }
};

const createFieldProps = (name: string, formOptions: any): { meta: any; input: { name: string; value: any } } => {
  const { value, blur, change, focus, ...meta } = formOptions.getFieldState(name) || {};

  return {
    meta,
    input: { name, value },
  };
};

const useFieldApi = ({ name, resolveProps, skipRegistration = false, ...props }: UseFieldApiConfig): UseFieldApiProps<any> => {
  const { validatorMapper, formOptions } = useContext(RendererContext);
  const [warning, setWarning] = useState<any>();

  // if there is field initial value, we have to check form initialValues
  // initialValues should have higher priority
  const formInitialValue = Object.prototype.hasOwnProperty.call(props, 'initialValue') ? get(formOptions.initialValues, name) : undefined;

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
    ...(stateValidate ? { validate: stateValidate } : {}),
  };

  const field = useField(name, { ...enhancedProps, ...(typeof formInitialValue !== 'undefined' && { initialValue: formInitialValue }) });

  /** Reinitilize type */
  useEffect(() => {
    if (mounted.current) {
      const specialType = assignSpecialType(component as any);
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
        arrayValidator: calculateArrayValidator(enhancedProps, validate, component, validatorMapper),
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
          initialValue: newInitialValue,
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
        : formOptions?.getFieldState(name)?.initial;
      field.input.onChange(value);
    }
  }, [initializeOnMount, enhancedProps.initialValue, field.meta.initial, dataType]);

  /**
   * Prepare deleted value of field
   */
  const fieldClearedValue = Object.prototype.hasOwnProperty.call(rest, 'clearedValue') ? rest.clearedValue : formOptions.clearedValue;

  useEffect(
    () => {
      if (!skipRegistration && formOptions.internalRegisterField) {
        formOptions.internalRegisterField(name);
      }

      mounted.current = true;
      if (field.input.type === 'file' && formOptions.registerInputFile) {
        formOptions.registerInputFile(field.input.name);
      }

      return () => {
        mounted.current = false;
        /**
         * Delete the value from form state when field is inmounted
         */
        if (clearOnUnmount && clearOnUnmount !== false) {
          field.input?.onChange?.(fieldClearedValue);
        }

        if (field?.input?.type === 'file') {
          formOptions?.unRegisterInputFile?.(field.input.name);
        }

        if (!skipRegistration) {
          formOptions?.internalUnRegisterField(name);
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
        warning,
      },
    }),
    input: {
      ...field.input,
      value: field.input.type === 'file' && typeof field.input.value === 'object' ? field.input.value.inputValue : field.input.value,
      onChange: (...args: any[]) => {
        enhancedOnChange(
          {
            ...field.meta,
            dataType,
            onChange: field.input.onChange,
            clearedValue: fieldClearedValue,
          },
          args[0],
          ...args.slice(1)
        );
      },
    },
  };
};

export default useFieldApi;
