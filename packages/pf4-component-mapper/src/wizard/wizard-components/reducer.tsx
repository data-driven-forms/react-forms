interface WizardState {
  loading: boolean;
  container?: HTMLDivElement;
  openNav: boolean;
}

interface WizardAction {
  type: 'openNav' | 'closeNav' | 'finishLoading' | 'setContainer';
}

const reducer = (state: WizardState, { type }: WizardAction): WizardState => {
  switch (type) {
    case 'openNav':
      return {
        ...state,
        openNav: true,
      };
    case 'closeNav':
      return {
        ...state,
        openNav: false,
      };
    case 'finishLoading':
      return {
        ...state,
        loading: false,
      };
    case 'setContainer':
      return { ...state, container: state.container || document.createElement('div') };
    default:
      return state;
  }
};

export default reducer;
