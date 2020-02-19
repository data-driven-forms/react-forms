import mozillaParser from './parsers/mozilla-parser/mozilla-schema-parser';
import miqParser from './parsers/miq-parser/miq-parser';

export { default } from './components/form-renderer';
export { default as dataTypes } from './components/data-types';
export { default as componentTypes } from './components/component-types';
export { default as validatorTypes } from './components/validator-types';
export { default as composeValidators } from './components/compose-validators';
export { default as Validators } from './validators/validators';
export { default as defaultSchemaValidator } from './parsers/default-schema-validator';

export const schemaParsers = {
  mozillaParser,
  miqParser,
};
