import { AnyObject } from '@data-driven-forms/react-form-renderer';
import { option } from '../select';

interface UseSelectProps {
    loadOptions?: (inputValue?: string) => Promise<option[]>;
    optionsTransformer?: (options: AnyObject[]) => option[];
    options?: option[];
    noValueUpdates?: boolean;
    onChange?: (value?: any) => void;
    value?: any;
    loadOptionsChangeCounter?: number;
    isSearchable?: boolean;
    pluckSingleValue?: boolean;
    isMulti?: boolean;
    simpleValue?: boolean;
    compareValues?: (value1: any, value2: any) => any;
}

interface SelectState {
    isLoading: boolean;
    options: option[];
    promises: AnyObject;
    isInitialLoaded: boolean;
    originalOptions?: option[];
}

declare function useSelect(props: UseSelectProps): {
    value: any;
    onChange: (option: option) => void;
    onInputChange: (inputValue: string) => void;
    isFetching: boolean;
    state: SelectState;
}

export default useSelect;
