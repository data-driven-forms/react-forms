import { required, length, pattern, numericality } from '../validators/validator-functions';

import url from '../validators/url-validator';
import validatorTypes from '../validator-types';
import { ValidatorFunction } from '../validators/validators';

export interface ValidatorMapper {
  [key: string]: ValidatorFunction | ((options?: any) => ValidatorFunction);
}

interface ThresholdOptions {
  threshold: number;
  [key: string]: any;
}

interface NumberValueOptions {
  value: number;
  includeThreshold?: boolean;
  [key: string]: any;
}

interface UrlOptions {
  message?: string;
  [key: string]: any;
}

const validatorMapper: ValidatorMapper = {
  [validatorTypes.REQUIRED]: required,
  [validatorTypes.MIN_LENGTH]: ({ threshold, ...rest }: ThresholdOptions) => length({ minimum: threshold, ...rest }),
  [validatorTypes.MAX_LENGTH]: ({ threshold, ...rest }: ThresholdOptions) => length({ maximum: threshold, ...rest }),
  [validatorTypes.EXACT_LENGTH]: ({ threshold, ...rest }: ThresholdOptions) => length({ is: threshold, ...rest }),
  [validatorTypes.MIN_ITEMS]: ({ threshold, ...rest }: ThresholdOptions) => length({ minimum: threshold, message: `Must have at least ${threshold} items.`, ...rest }),
  [validatorTypes.PATTERN]: pattern,
  [validatorTypes.MAX_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }: NumberValueOptions) =>
    numericality({ [includeThreshold ? '<=' : '<']: value, ...rest }),
  [validatorTypes.MIN_NUMBER_VALUE]: ({ value, includeThreshold = true, ...rest }: NumberValueOptions) =>
    numericality({ [includeThreshold ? '>=' : '>']: value, ...rest }),
  [validatorTypes.URL]: ({ message, ...options }: UrlOptions) => pattern({ pattern: url(options), message: message || 'String is not URL.' }),
};

export default validatorMapper;