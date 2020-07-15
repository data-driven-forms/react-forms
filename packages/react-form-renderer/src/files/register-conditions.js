import React, {useEffect} from 'react';
import {useFormApi} from '../';
import {Field} from 'react-final-form';

import {conditionsMapper} from './conditions-mapper';
import {parseCondition} from '../form-renderer/condition2';

const RegisterConditions = ({schema}) => {
  const {getState, registerField, dispatchCondition} = useFormApi();

  useEffect(() => {
    const indexedConditions = conditionsMapper({conditions: schema.conditions});
    console.log(indexedConditions);

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

            fieldState.data.conditions.map(condition => {
              const conditionResult = parseCondition(condition, getState().values);
              dispatchCondition({
                type: 'conditionResult',
                source: condition.key,
                uiState: conditionResult.uiState,
              });
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
