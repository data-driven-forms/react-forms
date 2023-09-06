import { AnyObject } from "@data-driven-forms/react-form-renderer";

export type option = {
  [key: string]: any;
  label?: React.ReactNode;
  value?: any;
};

export interface SelectProps {
  options?: option[];
  onChange?: (value?: any) => void;
  classNamePrefix?: string;
  invalid?: boolean;
  simpleValue?: boolean;
  isMulti?: boolean;
  pluckSingleValue?: boolean;
  value?: any;
  placeholder?: string;
  loadOptionsChangeCounter?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  loadOptions?: (inputValue?: string) => Promise<option[]>;
  loadingMessage?: React.ReactNode;
  loadingProps?: AnyObject;
  selectVariant?: string;
  updatingMessage?: React.ReactNode;
  noOptionsMessage?: React.ReactNode;
  isSearchable?: boolean;
  SelectComponent?: React.ComponentType;
  noValueUpdates?: boolean;
  optionsTransformer?: (options: AnyObject[]) => option[];
  compareValues?: (valueA: any, valueB: any) => boolean;
}

declare const Select: React.ComponentType<SelectProps>;

export default Select;
