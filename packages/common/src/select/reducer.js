export const init = ({ propsOptions, optionsTransformer }) => ({
  isLoading: false,
  options: optionsTransformer ? optionsTransformer(propsOptions) : propsOptions,
  promises: {},
  isInitialLoaded: false,
});

const reducer = (state, { type, payload, options = [], optionsTransformer }) => {
  switch (type) {
    case 'updateOptions':
      return {
        ...state,
        options: optionsTransformer ? optionsTransformer(payload) : payload,
        isLoading: false,
        promises: {},
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
      };
    case 'initialLoaded':
      return {
        ...state,
        isInitialLoaded: true,
      };
    case 'setPromises':
      return {
        ...state,
        promises: {
          ...state.promises,
          ...payload,
        },
        options: optionsTransformer
          ? optionsTransformer([...state.options, ...options.filter(({ value }) => !state.options.find((option) => option.value === value))])
          : [...state.options, ...options.filter(({ value }) => !state.options.find((option) => option.value === value))],
      };
    default:
      return state;
  }
};

export default reducer;
