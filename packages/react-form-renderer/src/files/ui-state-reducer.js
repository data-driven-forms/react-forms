const uiStateReducer = (state, action) => {
  switch (action.type) {
    case 'conditionResult': {
      const {
        source,
        uiState: {add, remove},
      } = action;

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

      const removeItem = state => {
        if (!remove) return;

        Object.entries(remove).forEach(([key, item]) => {
          //If the field/section doesn't exist, we don't need to do anymore
          if (!state[key]) return;

          validAttributes.forEach(type => {
            //Don't process uiTypes if they don't exist in the dispatched message
            if (item[type] === undefined) return;

            const inversedType = inversedTypes[type];
            type = inversedType || type;

            if (remove[key][type]) {
              const index = state[key][type].findIndex(item => item.source === source);
              if (index !== -1) state[key][type].splice(index, 1);

              //If this was the last item of this type, remove the type
              if (state[key][type].length === 0) delete state[key][type];
            }
          });

          //If no more uiStateType keys exists for this field, remove the field
          if (Object.keys(state[key]).length === 0) delete state[key];
        });
      };

      const addItem = state => {
        if (!add) return;

        Object.entries(add).forEach(([key, item]) => {
          //Create the item object for this item if it doesn't exist
          if (!state[key]) state[key] = {};

          validAttributes.forEach(type => {
            //Don't add uiTypes if they don't exist in the dispatched message
            if (item[type] === undefined) return;

            //Handle inversed types (disabled/enabled, visible/hidden)
            const inversedType = inversedTypes[type];
            const value = inversedType ? !item[type] : item[type];
            type = inversedType || type;

            if (!state[key][type]) {
              //If this type doesn't exists for this item, we create a new array with only this source. No need to search fot the source
              state[key][type] = [{source, value}];
            } else {
              const index = state[key][type].findIndex(item => item.source === source);
              if (index !== -1) {
                //If this type for this item from this source existed, update the state (could change if condition went from "then" to "else")
                state[key][type][index].value = value;
              } else {
                //Otherwise, add the state from this source at the begining of the array (i.e. this will supress result from other sources)
                state[key][type].unshift({source, value});
              }
            }
          });

          //Set-instructions are ephemeral and goes into a separate list which is emptied when processed
          if (item.set) {
            state.setFieldValues = {...state.fileldValues, [key]: item.set};
          }
        });
      };

      let mutatedState = state;
      if (remove) {
        removeItem(mutatedState);
      }
      //If uiStates should be added, go through all add fields and all possible types for these fields
      if (add) {
        addItem(mutatedState);
      }
      console.log(mutatedState);
      return {...mutatedState};
    }
    case 'fieldValuesUpdated': {
      return {...state, setFieldValues: {}};
    }
  }
};

export default uiStateReducer;
