import { ReactNode } from 'react';

/**
 * Supported option value types for form components
 */
export type OptionValue = string | number | boolean;

/**
 * Base option interface for select components
 */
export interface SelectOption<T = OptionValue> {
  label: ReactNode;
  value: T;
  disabled?: boolean;
  /** For select-all functionality in multi-select */
  selectAll?: boolean;
  /** For select-none functionality in multi-select */
  selectNone?: boolean;
  /** For divider elements in option lists */
  divider?: boolean;
  /** For grouped options */
  options?: SelectOption<T>[];
  /** For option groups */
  group?: ReactNode;
  /** Additional properties for extended functionality */
  [key: string]: unknown;
}

/**
 * Result option interface for flattened options
 */
export interface FlatSelectOption<T = OptionValue> extends Omit<SelectOption<T>, 'label' | 'value'> {
  label?: ReactNode;
  value?: T;
}

/**
 * Option value or array of values for multi-select
 */
export type SelectValue<T = OptionValue> = T | T[] | undefined;

/**
 * Option or array of options for multi-select
 */
export type SelectOptionValue<T = OptionValue> = SelectOption<T> | SelectOption<T>[] | undefined;