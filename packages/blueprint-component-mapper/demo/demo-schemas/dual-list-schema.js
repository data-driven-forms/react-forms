import { componentTypes } from '@data-driven-forms/react-form-renderer';

export default {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list-select',
      label: 'choose favorite animal',
      options: [
        {
          value: 'cats',
          label: 'cats'
        },
        {
          value: 'cats_1',
          label: 'cats_1'
        },
        {
          value: 'cats_2',
          label: 'cats_2'
        },
        {
          value: 'zebras',
          label: 'zebras'
        },
        {
          value: 'pigeons',
          label: 'pigeons'
        }
      ]
    }
  ]
};
