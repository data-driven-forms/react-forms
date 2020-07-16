import React, {useEffect} from 'react';
import lodashIsEmpty from 'lodash/isEmpty';

import {useFormApi} from '../';

const SetFieldValues = () => {
  const {batch, change, uiState, dispatchUIState} = useFormApi();
  useEffect(() => {
    if (lodashIsEmpty(uiState.setFieldValues)) return;

    setTimeout(() => {
      batch(() => {
        Object.entries(uiState.setFieldValues).forEach(([name, value]) => {
          console.log('Setting new value for field ' + name);
          change(name, value);
        });
        dispatchUIState({type: 'fieldValuesUpdated'});
      });
    });
  }, [uiState.setFieldValues]);

  return null;
};

export default SetFieldValues;
