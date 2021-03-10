import React from 'react';
import { AnyObject } from '@data-driven-forms/react-form-renderer';

export function buildLabel(label: React.ReactNode, isRequired: boolean): React.ReactNode | undefined;

export type PreparePropsConfig<T = AnyObject> = T & {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  label: React.ReactNode;
  description: React.ReactNode;
}

type PreparePropsMappedOutput<T> = T & {
  disabled?: boolean;
  labelText?: React.ReactNode;
  readOnly?: boolean;
  description?: React.ReactNode;
}

declare function prepareProps<T = AnyObject>({ isDisabled, isReadOnly, isRequired, label, description, ...props }: PreparePropsConfig<T>): PreparePropsMappedOutput<T>

export default prepareProps;
