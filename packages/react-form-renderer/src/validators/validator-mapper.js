import { required, length, pattern, numericality } from './';

import url from './url-validator';
import validatorTypes from '../components/validator-types';

const thresholdWarn = func => {
  console.warn(`Attribute "treshold" is deprecated due to a typo in Length validators and will be removed in next major release.
  Please use "threshold" instead.`);
  return func();
};

export default validatorType => ({
  [validatorTypes.REQUIRED]: required,
  [validatorTypes.MIN_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => {
    let value = threshold;
    if (treshold) {
      value = treshold;
    }

    return length({ minimum: value, ...rest });
  }),
  [validatorTypes.MAX_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => {
    let value = threshold;
    if (treshold) {
      value = treshold;
    }

    return length({ maximum: value, ...rest });
  }),
  [validatorTypes.EXACT_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => length({ is: threshold || treshold, ...rest })),
  [validatorTypes.MIN_ITEMS_VALIDATOR]: ({ treshold, threshold, ...rest }) =>
    thresholdWarn(() => length({ minimum: threshold || treshold, message: `Must have at least ${threshold || treshold} items.`, ...rest })),
  [validatorTypes.PATTERN_VALIDATOR]: pattern,
  [validatorTypes.MAX_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
    numericality({ [includeThreshold ? '<=' : '<']: value, ...rest }),
  [validatorTypes.MIN_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
    numericality({ [includeThreshold ? '>=' : '>']: value, ...rest }),
  [validatorTypes.URL]: ({ message, ...options }) =>  pattern({ pattern: url(options), message: message || 'String is not URL.' }),
})[validatorType];
