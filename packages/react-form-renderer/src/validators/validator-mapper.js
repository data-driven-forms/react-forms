import { required, length, pattern, numericality } from './';

import url from './url-validator';
import validatorTypes from '../components/validator-types';

export default (validatorType) =>
  ({
    [validatorTypes.REQUIRED]: required,
    [validatorTypes.MIN_LENGTH]: ({ threshold, ...rest }) => length({ minimum: threshold, ...rest }),
    [validatorTypes.MAX_LENGTH]: ({ threshold, ...rest }) => length({ maximum: threshold, ...rest }),
    [validatorTypes.EXACT_LENGTH]: ({ threshold, ...rest }) => length({ is: threshold, ...rest }),
    [validatorTypes.MIN_ITEMS_VALIDATOR]: ({ threshold, ...rest }) =>
      length({ minimum: threshold, message: `Must have at least ${threshold} items.`, ...rest }),
    [validatorTypes.PATTERN_VALIDATOR]: pattern,
    [validatorTypes.MAX_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
      numericality({ [includeThreshold ? '<=' : '<']: value, ...rest }),
    [validatorTypes.MIN_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }) =>
      numericality({ [includeThreshold ? '>=' : '>']: value, ...rest }),
    [validatorTypes.URL]: ({ message, ...options }) => pattern({ pattern: url(options), message: message || 'String is not URL.' })
  }[validatorType]);
