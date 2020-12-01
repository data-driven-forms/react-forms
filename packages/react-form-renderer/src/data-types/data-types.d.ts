export type DataType = 'integer'|'float'|'number'|'boolean'|'string';

interface dataTypes {
  INTEGER: 'integer';
  FLOAT: 'float';
  NUMBER: 'number';
  BOOLEAN: 'boolean';
  STRING: 'string';
}

declare const dataTypes: dataTypes;

export default dataTypes;
