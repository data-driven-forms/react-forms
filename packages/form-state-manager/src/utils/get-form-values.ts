import set from 'lodash/set';
import get from 'lodash/get';
import AnyObject from '../files/any-object';

const getFormValues = (state: AnyObject) =>
  state.registeredFields.reduce((acc: AnyObject, name: string) => {
    console.log(state.fieldListeners?.[name]?.getFieldState());
    return set(acc, name, state.fieldListeners?.[name]?.getFieldState().value || get(state.values, name));
  }, {});

export default getFormValues;
