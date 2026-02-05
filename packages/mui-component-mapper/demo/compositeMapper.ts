import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, Switch } from '../src';

export const compositeMapper = {
  ...componentMapper,
  [componentTypes.SWITCH]: {
    component: Switch,
    FormControlLabelProps: {
      labelPlacement: 'end',
    },
  },
} as const;
