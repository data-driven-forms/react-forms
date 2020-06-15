import FormGroupProps from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

export interface SelectOption {
  label: ReactNode;
  value?: any;
}

interface BaseSelectProps  {
  options?: SelectOption[];
  selectVariant?: 'default' | 'createable';
  isSearchable?: boolean;
  showMoreLabel?: ReactNode;
  showLessLabel?: ReactNode;
  simpleValue?: boolean;
  isMulti?: boolean;
  loadOptions?: (inputValue?: string) => Promise<SelectOption[] | undefined>;
  loadingMessage?: ReactNode;
  updatingMessage?: ReactNode;
  noOptionsMessage?: ReactNode;
  menuIsPortal?: boolean;
  placeholder?: ReactNode;
}

export interface InternalSelectProps extends BaseSelectProps {
  value?: any;
  onChange?: (option?: any) => void;
  invalid?: boolean;
  pluckSingleValue?: boolean;
}

export const InternalSelect: React.ComponentType<InternalSelectProps>;

export type SelectProps = BaseSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
