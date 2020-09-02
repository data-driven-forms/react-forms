import AnyObject from './any-object';

export type DataType = 'integer' | 'float' | 'number' | 'boolean' | 'string';
export type BasicTypes = number | boolean | string;
export type DataTypeTypes = BasicTypes | AnyObject | Array<BasicTypes>;

interface dataTypes {
  INTEGER: 'integer';
  FLOAT: 'float';
  NUMBER: 'number';
  BOOLEAN: 'boolean';
  STRING: 'string';
}

declare const dataTypes: dataTypes;

export default dataTypes;
