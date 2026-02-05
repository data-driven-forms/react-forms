import { Dispatch, ReactNode } from 'react';
import { ButtonVariant, FormGroupProps as PfFormGroupProps } from '@patternfly/react-core';
import { BaseFieldProps } from '@data-driven-forms/react-form-renderer/use-field-api';

// Re-export for convenience
export type { BaseFieldProps };

/**
 * Extended validation states for PatternFly components
 */
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

/**
 * Show error function return type
 */
export interface ShowErrorResult {
  validated: ValidationState;
}

/**
 * Field meta state (from final-form)
 */
export interface FieldMeta {
  error?: string;
  touched?: boolean;
  warning?: string;
  submitError?: string;
}

/**
 * Field input props (from final-form)
 */
export interface FieldInput {
  name: string;
  value?: any;
  onChange: (value: any) => void;
  onBlur: (event?: any) => void;
  onFocus: (event?: any) => void;
  checked?: boolean;
}

/**
 * Select option type
 */
export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  options?: SelectOption[];
  [key: string]: any;
}

/**
 * Props for FormGroup component
 */
export interface FormGroupComponentProps {
  /** Field label */
  label?: ReactNode;
  /** Whether field is required */
  isRequired?: boolean;
  /** Helper text displayed below the field */
  helperText?: ReactNode;
  /** Field description */
  description?: ReactNode;
  /** Hide the field label */
  hideLabel?: boolean;
  /** Field ID - falls back to input.name if not provided */
  id?: string;
  /** Validate field on mount */
  validateOnMount?: boolean;
  /** Field meta state */
  meta: FieldMeta;
  /** Child components */
  children: ReactNode;
  /** Additional FormGroup props */
  FormGroupProps?: Partial<PfFormGroupProps>;
}

// ========== Component-specific Props Interfaces ==========

/**
 * Props for TextField component
 */
export interface TextFieldProps extends BaseFieldProps {
  placeholder?: string;
  type?: string;
}

/**
 * Props for Textarea component
 */
export interface TextareaProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
  resizeOrientation?: 'horizontal' | 'vertical' | 'both';
}

/**
 * Props for Select component
 */
export interface SelectProps extends BaseFieldProps {
  /** Select options */
  options?: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Enable search functionality */
  isSearchable?: boolean;
  /** Enable multi-select */
  isMulti?: boolean;
  /** Enable clear functionality */
  isClearable?: boolean;
  /** Loading state */
  isFetching?: boolean;
  /** No results message */
  noResultsMessage?: string;
  /** No options message */
  noOptionsMessage?: string;
  /** Loading message */
  loadingMessage?: string;
  /** Updating message */
  updatingMessage?: string;
  /** Show more label for multi-select */
  showMoreLabel?: string;
  /** Show less label for multi-select */
  showLessLabel?: string;
  /** Use simple values instead of option objects */
  simpleValue?: boolean;
  /** Render menu in portal */
  menuIsPortal?: boolean;
  /** Portal target element */
  menuPortalTarget?: Element;
  /** Input change handler for search */
  onInputChange?: (value: string) => void;
  /** Original options before transformation */
  originalOptions?: SelectOption[];
}

/**
 * Props for Checkbox component
 */
export interface CheckboxProps extends BaseFieldProps {
  /** Options for multi-choice checkbox */
  options?: SelectOption[];
}

/**
 * Props for Radio component
 */
export interface RadioProps extends BaseFieldProps {
  options: SelectOption[];
}

/**
 * Props for Switch component
 */
export interface SwitchProps extends BaseFieldProps {
  /** Text for the switch when on */
  onText?: string;
  /** Text for the switch when off */
  offText?: string;
}

/**
 * Props for DatePicker component
 */
export interface DatePickerProps extends BaseFieldProps {
  placeholder?: string;
  format?: string;
  locale?: string;
}

/**
 * Props for TimePicker component
 */
export interface TimePickerProps extends BaseFieldProps {
  placeholder?: string;
  format?: string;
  is24Hour?: boolean;
}

/**
 * Props for PlainText component
 */
export interface PlainTextProps extends BaseFieldProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'blockquote';
}

/**
 * Props for Slider component
 */
export interface SliderProps extends BaseFieldProps {
  min?: number;
  max?: number;
  step?: number;
  showTicks?: boolean;
}

/**
 * Props for DualListSelect component
 */
export interface DualListSelectProps extends BaseFieldProps {
  leftTitle?: string;
  rightTitle?: string;
  options?: SelectOption[];
  getValueFromNode?: (node: any) => any;
  isSearchable?: boolean;
  isSortable?: boolean;
  isTree?: boolean;
}

/**
 * Button labels for FieldArray component
 */
export interface FieldArrayButtonLabels {
  add?: string;
  remove?: string;
  removeAll?: string;
}

/**
 * Props for FieldArray component
 */
export interface FieldArrayProps extends BaseFieldProps {
  /** Form fields to render in each array item */
  fields?: any[];
  /** Default item to add when creating new items */
  defaultItem?: any;
  /** Minimum number of items allowed */
  minItems?: number;
  /** Maximum number of items allowed */
  maxItems?: number;
  /** Message displayed when no items exist */
  noItemsMessage?: string;
  /** Custom labels for buttons */
  buttonLabels?: FieldArrayButtonLabels;
  /** Array-level validation function */
  arrayValidator?: (values: any[]) => string | undefined;
}

/**
 * Tab field definition for Tabs component
 */
export interface TabField {
  /** Tab title */
  title: string | ReactNode;
  /** Tab unique identifier */
  name: string;
  /** Fields to render in this tab */
  fields: any[];
}

/**
 * Props for Tabs component
 */
export interface TabsProps extends BaseFieldProps {
  /** Tab definitions */
  fields: TabField[];
}

/**
 * Props for SubForm component
 */
export interface SubFormProps extends BaseFieldProps {
  /** Form fields to render */
  fields: any[];
  /** Sub-form title */
  title?: string;
  /** Sub-form description */
  description?: string;
}

/**
 * Props for form template Button component
 */
export interface FormTemplateButtonProps {
  label?: string;
  bsStyle?: ButtonVariant;
  children?: ReactNode;
  disabled?: boolean;
  buttonType?: 'submit' | 'reset' | 'button' | 'cancel';
}

/**
 * Props for form template ButtonGroup component
 */
export interface FormTemplateButtonGroupProps {
  children: ReactNode;
}

/**
 * Props for form template Title component
 */
export interface FormTemplateTitleProps {
  children: ReactNode;
}

/**
 * Props for form template Description component
 */
export interface FormTemplateDescriptionProps {
  children: ReactNode;
}

/**
 * Props for form template FormError component
 */
export interface FormTemplateFormErrorProps {
  formError?: string | { title: string; description?: string; [key: string]: any };
  alertProps?: any;
}

/**
 * Navigation schema item for wizard
 */
export interface WizardNavSchemaItem {
  name: string | number;
  index: number;
  title?: ReactNode | string;
  substepOf?: string;
  substepOfTitle?: string;
  primary?: boolean;
}

/**
 * Props for WizardToggle component
 */
export interface WizardToggleProps {
  activeStepIndex: number;
  currentStep: {
    name: string;
    title?: string;
  };
  navSchema: WizardNavSchemaItem[];
  isOpen: boolean;
  dispatch: Dispatch<{ type: 'openNav' | 'closeNav' | 'finishLoading' | 'setContainer' }>;
}

export function isPFNavSchema(navSchema: any): navSchema is WizardNavSchemaItem[] {
  return (
    Array.isArray(navSchema) &&
    navSchema.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        (typeof item.name === 'string' || typeof item.name === 'number') &&
        typeof item.index === 'number'
    )
  );
}
