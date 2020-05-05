export const initialState = {
  lastLeftClicked: undefined,
  selectedLeftValues: [],
  lastRightClicked: undefined,
  selectedRightValues: [],
  sortLeftDesc: true,
  sortRightDesc: true,
  filterOptions: '',
  filterValue: ''
};

const reducer = (state, { type, value, values, isRight }) => {
  switch (type) {
    case 'setSelectedValue':
      return {
        ...state,
        ...(isRight ? { selectedLeftValues: values } : { selectedRightValues: values }),
        ...(isRight ? { lastLeftClicked: value } : { lastRightClicked: value })
      };
    case 'setFilterValue':
      return {
        ...state,
        filterValue: value
      };
    case 'setFilterOptions':
      return {
        ...state,
        filterOptions: value
      };
    case 'sortValue':
      return {
        ...state,
        sortRightDesc: !state.sortRightDesc
      };
    case 'sortOptions':
      return {
        ...state,
        sortLeftDesc: !state.sortLeftDesc
      };
    case 'clearRightValues':
      return {
        ...state,
        selectedRightValues: []
      };
    case 'clearLeftOptions':
      return {
        ...state,
        selectedLeftValues: []
      };
    default:
      return state;
  }
};

export default reducer;
