import mozillaParser from './parsers/mozilla-parser/mozilla-schema-parser';
import miqParser from './parsers/miq-parser/miq-parser';

export { default } from './form-renderer/';
export { components as componentTypes, layoutComponents, validators as validatorTypes, dataTypes } from './constants';
export { composeValidators } from './form-renderer/helpers';
export { default as Validators } from './validators/validators';
export { default as defaultSchemaValidator } from './parsers/default-schema-validator';

export const schemaParsers = {
  mozillaParser,
  miqParser,
};
