import Schema from './schema';
import ComponentMapper from './component-mapper';
import SchemaValidatorMapper from './schema-validator-mapper';

export default function(
  schema: Schema,
  componentMapper: ComponentMapper,
  validatorTypes: string[],
  actionTypes: string[],
  schemaValidatorMapper: SchemaValidatorMapper
): void;
