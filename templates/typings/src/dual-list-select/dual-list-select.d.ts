import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig, AnyObject } from '@data-driven-forms/react-form-renderer';
import { ReactNode } from 'react';

export interface DualListSelectValue extends AnyObject {
  value: any;
  label: ReactNode;
}

interface InternalDualListSelectProps {
  options: DualListSelectValue[];
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
