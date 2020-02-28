export const components = {
  BUTTON: 'button',
  TEXT_FIELD: 'text-field',
  TEXTAREA_FIELD: 'textarea-field',
  FIELD_ARRAY: 'field-array',
  SELECT_COMPONENT: 'select-field',
  CHECKBOX: 'checkbox',
  SUB_FORM: 'sub-form',
  RADIO: 'radio',
  TABS: 'tabs',
  TAB_ITEM: 'tab-item',
  DATE_PICKER: 'date-picker',
  TIME_PICKER: 'time-picker',
  WIZARD: 'wizard',
  SWITCH: 'switch-field',
  TEXTAREA: 'textarea-field',
  SELECT: 'select-field',
  PLAIN_TEXT: 'plain-text',
  INPUT_ADDON_GROUP: 'input-addon-group',
  INPUT_ADDON_BUTTON_GROUP: 'input-addon-button-group',
};
  /** Validator functions placeholder */
export const validators = {
  REQUIRED: 'required-validator',
  /**
     * min length of the input value
     */
  MIN_LENGTH: 'min-length-validator',
  /**
     * max length of the input value
     */
  MAX_LENGTH: 'max-length-validator',
  /**
   * exact length of input value
   */
  EXACT_LENGTH: 'exact-length-validator',
  /**
     * minimum count of fileds in some dynamic list of fields
     */
  MIN_ITEMS_VALIDATOR: 'min-items-validator',
  /**
     * Minimum value of number input
     */
  MIN_NUMBER_VALUE: 'min-number-value',
  /**
     * Maximum value of number inpuy
     */
  MAX_NUMBER_VALUE: 'max-number-value',
  /**
     * Regexp pattern validator
     */
  PATTERN_VALIDATOR: 'pattern-validator',
  /**
   * URL validator
   */
  URL: 'url-validator',
};

export const layoutComponents = {
  FORM_WRAPPER: 'FormWrapper',
  BUTTON: 'Button',
  BUTTON_GROUP: 'ButtonGroup',
  TITLE: 'Title',
  DESCRIPTION: 'Description',
};

/**
 * @enum {String}
 */
export const dataTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string',
};
