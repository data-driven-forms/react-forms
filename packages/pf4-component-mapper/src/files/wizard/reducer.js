const reducer = (state, { type }) => {
  switch (type) {
    case 'openNav':
      return {
        ...state,
        openNav: true
      };
    case 'closeNav':
      return {
        ...state,
        openNav: false
      };
    case 'finishLoading':
      return {
        ...state,
        loading: false
      };
    case 'setContainer':
      return { ...state, container: state.container || document.createElement('div') };
    default:
      return state;
  }
};

export default reducer;
