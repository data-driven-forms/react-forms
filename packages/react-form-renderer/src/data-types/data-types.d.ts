export type DataType = 'integer'|'float'|'number'|'boolean'|'string';

interface IdataTypes {
  INTEGER: 'integer';
  FLOAT: 'float';
  NUMBER: 'number';
  BOOLEAN: 'boolean';
  STRING: 'string';
}

declare const dataTypes: IdataTypes;

export default dataTypes;
