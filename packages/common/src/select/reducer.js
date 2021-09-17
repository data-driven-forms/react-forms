const reducer = (state, { type, payload, options = [] }) => {
  switch (type) {
    case 'updateOptions':
      return {
        ...state,
        options: payload,
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
        options: payload,
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
        options: [...state.options, ...options.filter(({ value }) => !state.options.find((option) => option.value === value))],
      };
    default:
      return state;
  }
};

export default reducer;
