export const REGISTER_FIELD = 'REGISTER_FIELD';
export const UNREGISTER_FIELD = 'UNREGISTER_FIELD';

const registerField = (state, { name, getFieldState }) => ({
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

const checkLastSubscrition = (fieldListeners, name) => fieldListeners?.[name]?.count === 1;

const unregisterField = (state, { name, persistOnUnmount, value }) => {
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

  newState.registeredFields = newState.registeredFields.filter((fieldName) => fieldName !== name);
  delete newState.fieldListeners[name];

  return newState;
};

const mutators = {
  [REGISTER_FIELD]: registerField,
  [UNREGISTER_FIELD]: unregisterField
};

const stateManagerReducer = (state, { type, ...action }) => {
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
