import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';

export default function(
  schema: Schema,
  componentMapper: ComponentMapper,
  validatorTypes: string[],
  actionTypes: string[],
  schemaValidatorMapper: SchemaValidatorMapper
): void;
