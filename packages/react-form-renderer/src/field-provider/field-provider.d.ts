import { ComponentType, ReactNode } from 'react';

export interface FieldProviderProps<T> {
  Component?: ComponentType<any>;
  render?: (props: T) => ReactNode;
}

declare const FieldProvider: React.ComponentType<FieldProviderProps<object>>;

export default FieldProvider;
