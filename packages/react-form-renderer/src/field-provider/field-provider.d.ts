import { ComponentType, ReactNode } from 'react';

export interface FieldProviderProps<T> {
  Component?: ComponentType<any>;
  render?: (props: T) => ReactNode;
  skipRegistration?: boolean;
}

declare const FieldProvider: React.ComponentType<FieldProviderProps<object>>;

export default FieldProvider;
