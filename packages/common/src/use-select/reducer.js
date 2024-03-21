export const init = ({ propsOptions, optionsTransformer }) => ({
  isLoading: false,
  options: optionsTransformer ? optionsTransformer(propsOptions) : propsOptions,
  promises: {},
  isInitialLoaded: false,
  ...(optionsTransformer && { originalOptions: propsOptions }),
});

const reducer = (state, { type, payload, options = [], optionsTransformer }) => {
  switch (type) {
    case 'updateOptions':
      return {
        ...state,
        options: optionsTransformer ? optionsTransformer(payload) : payload,
        isLoading: false,
        promises: {},
        ...(optionsTransformer && { originalOptions: payload }),
      };
    case 'startLoading':
      return {
        ...state,
        isLoading: true,
      };
    case 'setOptions':
      return {
        ...state,
        options: optionsTransformer ? optionsTransformer(payload) : payload,
        ...(optionsTransformer && { originalOptions: payload }),
      };
    case 'initialLoaded':
      return {
        ...state,
        isInitialLoaded: true,
      };
    case 'setPromises': {
      const compareValues = payload.compareValues;
      delete payload.compareValues;

      return {
        ...state,
        promises: {
          ...state.promises,
          ...payload,
        },
        options: optionsTransformer
          ? optionsTransformer([
              ...state.options,
              ...options.filter(({ value }) => !state.options.find((option) => compareValues(option.value, value))),
            ])
          : [...state.options, ...options.filter(({ value }) => !state.options.find((option) => compareValues(option.value, value)))],
        ...(optionsTransformer && {
          originalOptions: [...state.options, ...options.filter(({ value }) => !state.options.find((option) => compareValues(option.value, value)))],
        }),
      };
    }

    default:
      return state;
  }
};

export default reducer;
