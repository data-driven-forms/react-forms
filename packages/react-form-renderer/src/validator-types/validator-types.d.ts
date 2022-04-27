interface IvalidatorTypes {
  REQUIRED: 'required';
  MIN_LENGTH: 'min-length';
  MAX_LENGTH: 'max-length';
  EXACT_LENGTH: 'exact-length';
  MIN_ITEMS: 'min-items';
  MIN_NUMBER_VALUE: 'min-number-value';
  MAX_NUMBER_VALUE: 'max-number-value';
  PATTERN: 'pattern';
  URL: 'url';
}

declare const validatorTypes: IvalidatorTypes;

export default validatorTypes;
