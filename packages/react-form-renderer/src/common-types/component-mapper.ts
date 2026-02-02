import React from 'react';
import { AnyObject } from './any-object';

export interface ExtendedMapperComponent extends AnyObject {
  component: React.ComponentType | React.FunctionComponent | React.ElementType;
}

interface ComponentMapper {
  [key: string]: React.ComponentType | React.FunctionComponent | React.ElementType | ExtendedMapperComponent;
}

// Pure generic type that extracts component props from any ComponentMapper
export type ComponentPropsMap<T extends ComponentMapper> = {
  [K in keyof T]: T[K] extends React.ComponentType<infer P>
    ? P
    : T[K] extends ExtendedMapperComponent
    ? T[K]['component'] extends React.ComponentType<infer P>
      ? P
      : never
    : never;
};

export default ComponentMapper;
