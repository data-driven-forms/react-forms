import stateManagerReducer, { initialState, REGISTER_FIELD, UNREGISTER_FIELD } from '../../utils/state-manager-reducer';

describe('stateManagerReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should register field with no additional configuration', () => {
    const getFieldState = jest.fn();
    const expectedState = {
      ...state,
      registeredFields: ['new-field'],
      fieldListeners: {
        ...state.fieldListeners,
        'new-field': {
          count: 1,
          getFieldState
        }
      }
    };
    const newState = stateManagerReducer(state, { type: REGISTER_FIELD, name: 'new-field', getFieldState });
    expect(newState).toEqual(expectedState);
  });

  it('should unregister field with only one listener', () => {
    const getFieldState = jest.fn();
    const unregisterState = {
      ...state,
      registeredFields: ['unregister-field'],
      fieldListeners: {
        ...state.fieldListeners,
        'unregister-field': {
          count: 1,
          getFieldState
        }
      }
    };
    const expectedState = { ...state };
    const newState = stateManagerReducer(unregisterState, { type: UNREGISTER_FIELD, name: 'unregister-field', value: 'unregister-value' });
    expect(newState).toEqual(expectedState);
  });

  it('should unregister field with only one listener and persist its value', () => {
    const getFieldState = jest.fn();
    const unregisterState = {
      ...state,
      registeredFields: ['unregister-field'],
      fieldListeners: {
        ...state.fieldListeners,
        'unregister-field': {
          count: 1,
          getFieldState
        }
      }
    };
    const expectedState = { ...state, values: { 'unregister-field': 'unregister-value' } };
    const newState = stateManagerReducer(unregisterState, {
      type: UNREGISTER_FIELD,
      name: 'unregister-field',
      value: 'unregister-value',
      persistOnUnmount: true
    });
    expect(newState).toEqual(expectedState);
  });

  it('should only reduce count when unregister field has multiple subscribers', () => {
    const getFieldState = jest.fn();
    const unregisterState = {
      ...state,
      registeredFields: ['unregister-field'],
      fieldListeners: {
        ...state.fieldListeners,
        'unregister-field': {
          count: 2,
          getFieldState
        }
      }
    };
    const expectedState = {
      ...unregisterState,
      fieldListeners: {
        'unregister-field': {
          count: 1,
          getFieldState
        }
      }
    };
    const newState = stateManagerReducer(unregisterState, { type: UNREGISTER_FIELD, name: 'unregister-field', value: 'unregister-value' });
    expect(newState).toEqual(expectedState);
  });

  it('should return the same if non existing action type is dispatched', () => {
    const expectedState = { ...state };
    const newState = stateManagerReducer(state, { type: 'nonsense' });
    expect(newState).toEqual(expectedState);
  });
});
