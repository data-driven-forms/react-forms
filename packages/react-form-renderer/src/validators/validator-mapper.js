import { required, length, pattern, numericality } from './';

import { validators } from '../constants';
import url from './url-validator';

const thresholdWarn = func => {
  console.warn(`Attribute "treshold" is deprecated due to a typo in Length validators and will be removed in next major release.
  Please use "threshold" instead.`);
  return func();
};

export default validatorType => ({
  [validators.REQUIRED]: required,
  [validators.MIN_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => {
    let value = threshold;
    if (treshold) {
      value = treshold;
    }

    return length({ minimum: value, ...rest });
  }),
  [validators.MAX_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => {
    let value = threshold;
    if (treshold) {
      value = treshold;
    }

    return length({ maximum: value, ...rest });
  }),
  [validators.EXACT_LENGTH]: ({ treshold, threshold, ...rest }) => thresholdWarn(() => length({ is: threshold || treshold, ...rest })),
  [validators.MIN_ITEMS_VALIDATOR]: ({ treshold, threshold, ...rest }) =>
    thresholdWarn(() => length({ minimum: threshold || treshold, message: `Must have at least ${threshold || treshold} items.`, ...rest })),
  [validators.PATTERN_VALIDATOR]: pattern,
  [validators.MAX_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
    numericality({ [includeThreshold ? '<=' : '<']: value, ...rest }),
  [validators.MIN_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
    numericality({ [includeThreshold ? '>=' : '>']: value, ...rest }),
  [validators.URL]: options =>  pattern({ pattern: url(options), message: 'String is not URL.' }),
})[validatorType];
