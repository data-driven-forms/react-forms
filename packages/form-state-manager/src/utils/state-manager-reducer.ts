import AnyObject from "../files/any-object";
import { Action } from "../files/form-manager-context";

export const REGISTER_FIELD = 'REGISTER_FIELD';
export const UNREGISTER_FIELD = 'UNREGISTER_FIELD';

interface FieldState {
  name: string;
  getFieldState: () => AnyObject;
  value: any;
  persistOnUnmount: boolean;
}

const registerField = (state: AnyObject, { name, getFieldState }: FieldState) => ({
  ...state,
  registeredFields: [...state.registeredFields, name],
  fieldListeners: {
    ...state.fieldListeners,
    [name]: {
      /**
       * There can be multiple listeners checking the same field
       * We need to check if we can destroy all listeners before we remove all of them
       */
      count: state.fieldListeners?.[name]?.count + 1 || 1,
      getFieldState
    }
  }
});

const checkLastSubscrition = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

const unregisterField = (state: AnyObject, { name, persistOnUnmount, value }: FieldState) => {
  const isLast = checkLastSubscrition(state.fieldListeners, name);
  if (!isLast) {
    return {
      ...state,
      fieldListeners: {
        ...state.fieldListeners,
        [name]: {
          ...state.fieldListeners[name],
          count: state.fieldListeners[name].count - 1
        }
      }
    };
  }

  const newState = { ...state };
  if (persistOnUnmount) {
    newState.values = { ...newState.values, [name]: value };
  }

  newState.registeredFields = newState.registeredFields.filter((fieldName: string) => fieldName !== name);
  // tslint:disable-next-line: no-dynamic-delete
  delete newState.fieldListeners[name];

  return newState;
};

const mutators: AnyObject = {
  [REGISTER_FIELD]: registerField,
  [UNREGISTER_FIELD]: unregisterField
};

const stateManagerReducer = (state: AnyObject, { type, ...action }: Action) => {
  if (!mutators[type]) {
    return state;
  }

  console.log({ type, action });

  return mutators[type](state, action);
};

export const initialState = {
  values: {},
  registeredFields: [],
  fieldListeners: {}
};

export default stateManagerReducer;
