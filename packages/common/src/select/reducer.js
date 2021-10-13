export const flatOptions = (options) => options.flatMap((option) => (option.options ? [{ group: option.label }, ...option.options] : [option]));

const reducer = (state, { type, payload, options = [] }) => {
  switch (type) {
    case 'updateOptions':
      return {
        ...state,
        options: state.useFlatOptions ? flatOptions(payload) : payload,
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
        options: state.useFlatOptions ? flatOptions(payload) : payload,
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
        options: state.useFlatOptions
          ? flatOptions([...state.options, ...options.filter(({ value }) => !state.options.find((option) => option.value === value))])
          : [...state.options, ...options.filter(({ value }) => !state.options.find((option) => option.value === value))],
      };
    default:
      return state;
  }
};

export default reducer;
