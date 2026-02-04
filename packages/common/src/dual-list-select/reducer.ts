import { OptionValue } from '../types/shared-types';

export interface DualListSelectState<T = OptionValue> {
  lastLeftClicked: T | undefined;
  selectedLeftValues: T[];
  lastRightClicked: T | undefined;
  selectedRightValues: T[];
  sortLeftDesc: boolean;
  sortRightDesc: boolean;
  filterOptions: string;
  filterValue: string;
}

export const initialState: DualListSelectState = {
  lastLeftClicked: undefined,
  selectedLeftValues: [],
  lastRightClicked: undefined,
  selectedRightValues: [],
  sortLeftDesc: true,
  sortRightDesc: true,
  filterOptions: '',
  filterValue: '',
};

export type DualListSelectAction<T = OptionValue> =
  | {
      type: 'setSelectedValue';
      value: T;
      values: T[];
      isRight: boolean;
    }
  | {
      type: 'setFilterValue';
      value: string;
    }
  | {
      type: 'setFilterOptions';
      value: string;
    }
  | {
      type: 'sortValue';
    }
  | {
      type: 'sortOptions';
    }
  | {
      type: 'clearRightValues';
    }
  | {
      type: 'clearLeftOptions';
    }
  | {
      type: 'clearLeftValues';
    };

const reducer = <T = OptionValue>(
  state: DualListSelectState<T>,
  action: DualListSelectAction<T>
): DualListSelectState<T> => {
  switch (action.type) {
    case 'setSelectedValue':
      return {
        ...state,
        ...(action.isRight ? { selectedLeftValues: action.values } : { selectedRightValues: action.values }),
        ...(action.isRight ? { lastLeftClicked: action.value } : { lastRightClicked: action.value }),
      };
    case 'setFilterValue':
      return {
        ...state,
        filterValue: action.value,
      };
    case 'setFilterOptions':
      return {
        ...state,
        filterOptions: action.value,
      };
    case 'sortValue':
      return {
        ...state,
        sortRightDesc: !state.sortRightDesc,
      };
    case 'sortOptions':
      return {
        ...state,
        sortLeftDesc: !state.sortLeftDesc,
      };
    case 'clearRightValues':
      return {
        ...state,
        selectedRightValues: [],
      };
    case 'clearLeftOptions':
      return {
        ...state,
        selectedLeftValues: [],
      };
    case 'clearLeftValues':
      return {
        ...state,
        selectedLeftValues: [],
      };
    default:
      return state;
  }
};

export default reducer;
