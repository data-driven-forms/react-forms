import React, { useCallback, useContext, useEffect, useMemo, useReducer, ReactNode } from 'react';
import { FormState, FormApi } from 'final-form';
import isEqual from 'lodash/isEqual';

import useFormApi from '../use-form-api';
import parseCondition from '../parse-condition';
import RendererContext from '../renderer-context/renderer-context';
import Field from '../common-types/field';

export interface ActionResolution {
  visible?: boolean;
  set?: object | ((formState: FormState<Record<string, any>>, getFieldState: FormApi['getFieldState']) => object);
}

export type InnerWhenFunction = (currentField: string) => string;
export type WhenFunction = (currentField: string) => string | string[] | InnerWhenFunction[];

export interface ConditionProp {
  when?: string | string[] | WhenFunction | InnerWhenFunction[];
  is?: any;
  isNotEmpty?: boolean;
  isEmpty?: boolean;
  pattern?: string | RegExp;
  flags?: string;
  notMatch?: any;
  greaterThan?: number;
  greaterThanOrEqualTo?: number;
  lessThan?: number;
  lessThanOrEqualTo?: number;
  then?: ActionResolution;
  else?: ActionResolution;
  or?: ConditionProp | ConditionProp[];
  and?: ConditionProp | ConditionProp[];
  not?: ConditionProp | ConditionProp[];
}

export interface ConditionDefinition extends ConditionProp {
  mappedAttributes?: {
    is?: string[];
    when?: string[];
    set?: string[];
  };
  or?: ConditionProp | ConditionProp[];
  and?: ConditionProp | ConditionProp[];
  not?: ConditionProp | ConditionProp[];
  sequence?: ConditionProp[];
}

interface ConditionState {
  sets: object[];
  initial: boolean;
}

interface ConditionAction {
  type: 'formResetted' | 'rememberSets';
  sets?: object[];
}

export interface ConditionProps {
  // eslint-disable-next-line react/no-unused-prop-types
  values?: object;
  children: ReactNode;
  condition?: ConditionDefinition | ConditionDefinition[];
  field: Field;
}

const setterValueCheck = (setterValue: any): setterValue is object => {
  if (setterValue === null || Array.isArray(setterValue)) {
    console.error('Received invalid setterValue. Expected object, received: ', setterValue);
    return false;
  }

  return typeof setterValue === 'object';
};

export const reducer = (state: ConditionState, { type, sets }: ConditionAction): ConditionState => {
  switch (type) {
    case 'formResetted':
      return {
        ...state,
        initial: true,
      };
    case 'rememberSets':
      return {
        ...state,
        initial: false,
        sets: sets || [],
      };
    default:
      return state;
  }
};

const Condition: React.FC<ConditionProps> = ({ condition, children, field }) => {
  const formOptions = useFormApi();
  const formState = formOptions.getState();
  const { conditionMapper } = useContext(RendererContext);
  const [state, dispatch] = useReducer(reducer, {
    sets: [],
    initial: true,
  });

  // It is required to get the context state values from in order to get the latest state.
  // Using the trigger values can cause issues with the radio field as each input is registered separately to state and does not yield the actual field value.
  const conditionResult = useMemo(
    () => (condition ? parseCondition(condition, formState.values, field, conditionMapper) : { visible: true, result: true }),
    [formState.values, condition, field, conditionMapper]
  );

  const hasSetProperty = (result: any): result is { set: object } => 'set' in result;
  const hasSetsProperty = (result: any): result is { sets: object[] } => 'sets' in result;

  const setters = hasSetProperty(conditionResult) ? [conditionResult.set] : hasSetsProperty(conditionResult) ? conditionResult.sets : [];

  useEffect(() => {
    if (!formState.dirty) {
      dispatch({ type: 'formResetted' });
    }
  }, [formState.dirty]);

  const setValue = useCallback(
    (setter: object) => {
      Object.entries(setter).forEach(([name, value]) => {
        formOptions.change(name, value);
      });
    },
    [formOptions]
  );

  useEffect(() => {
    if (setters && setters.length > 0 && (state.initial || !isEqual(setters, state.sets))) {
      setters.forEach((setter, index) => {
        if (setter && (state.initial || !isEqual(setter, state.sets[index]))) {
          setTimeout(() => {
            /**
             * We have to get the meta in the timeout to wait for state initialization
             */
            const meta = formOptions.getFieldState(field.name);
            const isFormModified = Object.values(formOptions.getState().modified || {}).some(Boolean);
            /**
             * Apply setter only
             *    - field has no initial value
             *    - form is modified
             *    - when meta is false = field was unmounted before timeout, we finish the condition
             */
            if (!meta || isFormModified || typeof meta.initial === 'undefined') {
              formOptions.batch(() => {
                if (typeof setter !== 'function') {
                  setValue(setter);
                } else {
                  const setterValue = setter(formOptions.getState(), formOptions.getFieldState);

                  if (setterValueCheck(setterValue)) {
                    setValue(setterValue);
                  } else {
                    console.error('Received invalid setterValue. Expected object, received: ', setterValue);
                  }
                }
              });
            }
          }, 0);
        }
      });
      dispatch({ type: 'rememberSets', sets: setters });
    }
  }, [setters, state.initial, state.sets, setValue, formOptions, field.name]);

  return conditionResult.visible ? children : null;
};

export default Condition;
