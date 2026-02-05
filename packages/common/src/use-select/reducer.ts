import { AnyObject } from '@data-driven-forms/react-form-renderer';
import { SelectOption, OptionValue, FlatSelectOption } from '../types/shared-types';

export interface SelectState<T = OptionValue> {
  isLoading: boolean;
  options: (SelectOption<T> | FlatSelectOption<T>)[];
  promises: AnyObject;
  isInitialLoaded: boolean;
  originalOptions?: (SelectOption<T> | FlatSelectOption<T>)[];
}

interface InitProps<T = OptionValue> {
  propsOptions: SelectOption<T>[];
  optionsTransformer?: (options: AnyObject[]) => FlatSelectOption<T>[];
}

type ReducerAction<T = OptionValue> =
  | { type: 'updateOptions'; payload: SelectOption<T>[]; optionsTransformer?: (options: AnyObject[]) => FlatSelectOption<T>[] }
  | { type: 'startLoading' }
  | { type: 'setOptions'; payload: SelectOption<T>[]; optionsTransformer?: (options: AnyObject[]) => FlatSelectOption<T>[] }
  | { type: 'initialLoaded' }
  | {
      type: 'setPromises';
      payload: AnyObject;
      options?: SelectOption<T>[];
      optionsTransformer?: (options: AnyObject[]) => FlatSelectOption<T>[];
      compareValues?: (value1: T, value2: T) => boolean;
    };

export const init = <T extends OptionValue = OptionValue>({ propsOptions, optionsTransformer }: InitProps<T>): SelectState<T> => ({
  isLoading: false,
  options: optionsTransformer ? optionsTransformer(propsOptions) : propsOptions,
  promises: {},
  isInitialLoaded: false,
  ...(optionsTransformer && { originalOptions: propsOptions }),
});

const reducer = <T extends OptionValue = OptionValue>(state: SelectState<T>, action: ReducerAction<T>): SelectState<T> => {
  switch (action.type) {
    case 'updateOptions':
      return {
        ...state,
        options: action.optionsTransformer ? action.optionsTransformer(action.payload) : action.payload,
        isLoading: false,
        promises: {},
        ...(action.optionsTransformer && { originalOptions: action.payload }),
      };
    case 'startLoading':
      return {
        ...state,
        isLoading: true,
      };
    case 'setOptions':
      return {
        ...state,
        options: action.optionsTransformer ? action.optionsTransformer(action.payload) : action.payload,
        ...(action.optionsTransformer && { originalOptions: action.payload }),
      };
    case 'initialLoaded':
      return {
        ...state,
        isInitialLoaded: true,
      };
    case 'setPromises':
      const { options = [], optionsTransformer, compareValues } = action;
      return {
        ...state,
        promises: {
          ...state.promises,
          ...action.payload,
        },
        options: optionsTransformer
          ? optionsTransformer([
              ...state.options,
              ...options.filter(({ value }) => !state.options.find((option) => compareValues!(option.value, value))),
            ])
          : [...state.options, ...options.filter(({ value }) => !state.options.find((option) => compareValues!(option.value, value)))],
        ...(optionsTransformer && {
          originalOptions: [...state.options, ...options.filter(({ value }) => !state.options.find((option) => compareValues!(option.value, value)))],
        }),
      };
    default:
      return state;
  }
};

export default reducer;
