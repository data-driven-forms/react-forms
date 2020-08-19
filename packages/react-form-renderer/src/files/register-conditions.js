import React, {useEffect} from 'react';
import {useFormApi} from '../';
import {Field} from 'react-final-form';

import {conditionsMapper} from './conditions-mapper';
import {parseCondition} from '../form-renderer/condition';
import {collectLegacyConditions} from './legacy-conditions';

const RegisterConditions = ({schema}) => {
  const {getState, registerField, dispatchUIState} = useFormApi();

  useEffect(() => {
    const legacyConditions = collectLegacyConditions({fields: schema.fields});
    const mergedConditions = {...legacyConditions, ...schema.conditions};
    const indexedConditions = conditionsMapper({conditions: mergedConditions});

    //We need an array of conditions, including the fieldName
    const unsubscribeFields = Object.entries(indexedConditions)
      .map(([fieldName, fieldValue]) => {
        return {
          fieldName,
          ...fieldValue,
        };
      })
      .map(field => {
        console.log('creating field-listener for condition parsing: ' + field.fieldName);

        return registerField(
          field.fieldName,
          fieldState => {
            if (!fieldState || !fieldState.data || !fieldState.data.conditions) return;

            console.log('Parsing conditions for field ' + field.fieldName);

            const values = getState().values;
            fieldState.data.conditions.map(condition => {
              const conditionResult = parseCondition(condition, values);
              const {
                uiState: {add, remove},
              } = conditionResult;

              //remove needs to happen before add. Otherwise an added "then" will be overwritten by a removed "else"
              if (remove) {
                dispatchUIState({
                  type: 'removeUIState',
                  source: condition.key,
                  uiState: remove,
                });
              }
              if (add) {
                dispatchUIState({
                  type: 'addUIState',
                  source: condition.key,
                  uiState: add,
                });
              }
            });
          },
          {value: true, data: true},
          {
            data: {
              conditions: indexedConditions[field.fieldName]
                ? indexedConditions[field.fieldName]
                : null,
            },
          }
        );
      });

    return () => unsubscribeFields.map(unsubscribeField => unsubscribeField());
  }, [schema]);

  return null;
};

export default RegisterConditions;
