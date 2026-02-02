import { ReactNode } from 'react';
import LegacyField, { Field } from './field';
import ComponentMapper from './component-mapper';

// Helper type to create a union of all possible Field types for a ComponentMapper
type FieldUnion<T extends ComponentMapper> = {
  [K in keyof T]: Field<T, K>;
}[keyof T];

// Generic schema type that infers all component props from ComponentMapper
export interface Schema<T extends ComponentMapper = ComponentMapper> {
  title?: ReactNode;
  description?: ReactNode;
  fields: FieldUnion<T>[];
}

// Backward-compatible legacy schema type
export interface LegacySchema {
  title?: ReactNode;
  description?: ReactNode;
  fields: LegacyField[];
}

// Export the generic Schema as default for new TypeScript usage
export default Schema;

// Export LegacySchema for explicit legacy usage
export { LegacySchema as LegacySchemaType };
