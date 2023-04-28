import { componentTypes as components } from '@data-driven-forms/react-form-renderer';

const output = {
  title: 'Testing dual list',
  description: 'Description of testing dual list',
  fields: [
    {
      component: components.DUAL_LIST_SELECT,
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

export default output;
