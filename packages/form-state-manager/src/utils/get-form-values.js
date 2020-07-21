import set from 'lodash/set';
import get from 'lodash/get';

const getFormValues = (state) =>
  state.registeredFields.reduce((acc, name) => {
    console.log(state.fieldListeners?.[name]?.getFieldState());
    return set(acc, name, state.fieldListeners?.[name]?.getFieldState().value || get(state.values, name));
  }, {});

export default getFormValues;
