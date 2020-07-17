const validAttributes = [
  'visible',
  'disabled',
  'hidden',
  'enabled',
  'icon',
  'help',
  'colorBar',
  'required',
  'max',
  'min',
];

//enabled and hidden are not used internally, but accepted as input from the conditions object
const inversedTypes = {
  enabled: 'disabled',
  hidden: 'visible',
};

const uiStateReducer = (state, action) => {
  switch (action.type) {
    case 'addUIState': {
      const {source, uiState} = action;
      const newState = {...state};

      Object.entries(uiState).forEach(([key, item]) => {
        //Create the item object for this item if it doesn't exist
        if (!newState.fields[key]) newState.fields[key] = {};

        validAttributes.forEach(type => {
          //Don't add uiTypes if they don't exist in the dispatched message
          if (item[type] === undefined) return;

          //Handle inversed types (disabled/enabled, visible/hidden)
          const inversedType = inversedTypes[type];
          const value = inversedType ? !item[type] : item[type];
          type = inversedType || type;

          if (!newState.fields[key][type]) {
            //If this type doesn't exists for this item, we create a new array with only this source. No need to search fot the source
            // newState.fields[key][type] = [{source, value}];
            newState.fields[key] = {...newState.fields[key], [type]: [{source, value}]};
          } else {
            newState.fields[key] = {...newState.fields[key]};
            const index = newState.fields[key][type].findIndex(item => item.source === source);
            if (index !== -1) {
              //If this type for this item from this source existed, update the state (value could change if condition went from "then" to "else")
              newState.fields[key][type] = [...newState.fields[key][type]];
              newState.fields[key][type][index].value = value;
            } else {
              //Otherwise, add the state from this source at the begining of the array (i.e. this will supress result from other sources)
              newState.fields[key][type] = [{source, value}, ...newState.fields[key][type]];
            }
          }
        });

        // Set-instructions are ephemeral and goes into a separate list which is emptied when processed
        if (item.set) {
          newState.setFieldValues = {...newState.setFieldValues, [key]: item.set};
        }
      });
      return {...newState};
    }

    case 'removeUIState': {
      const {source, uiState} = action;
      const newState = {...state};

      Object.entries(uiState).forEach(([key, item]) => {
        //If the field/section doesn't exist, we don't need to do anymore
        if (!newState.fields[key]) return;

        Object.entries(item).forEach(([type, value]) => {
          if (!newState.fields[key][type]) return;

          const index = newState.fields[key][type].findIndex(item => item.source === source);
          if (index !== -1) {
            newState.fields[key][type] = [...newState.fields[key][type]];
            newState.fields[key][type].splice(index, 1);
          }
          if (newState.fields[key][type].length === 0) {
            newState.fields[key] = {...newState.fields[key]};
            delete newState.fields[key][type];
          }
        });

        //If no more uiStateType keys exists for this field, remove the field
        if (Object.keys(newState.fields[key]).length === 0) {
          newState.fields = {...newState.fields[key]};
          delete newState.fields[key];
        }
      });

      return newState;
    }

    case 'fieldValuesUpdated': {
      return {...state, setFieldValues: {}};
    }

    default:
      return state;
  }
};

export default uiStateReducer;
