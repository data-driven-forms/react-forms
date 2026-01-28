export type DataType = 'integer'|'float'|'number'|'boolean'|'string';

interface IdataTypes {
  INTEGER: 'integer';
  FLOAT: 'float';
  NUMBER: 'number';
  BOOLEAN: 'boolean';
  STRING: 'string';
}

const dataTypes: IdataTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string',
} as const;

export default dataTypes;
