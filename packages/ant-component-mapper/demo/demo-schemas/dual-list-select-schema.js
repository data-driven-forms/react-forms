import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

const options = [
  {
    label: 'Cat',
    value: 'cat'
  },
  {
    label: 'Dog',
    value: 'dog'
  },
  {
    label: 'Duck',
    value: 'duck'
  },
  {
    label: 'Lion',
    value: 'lion'
  },
  {
    label: 'Monster',
    value: 'monster'
  }
];

const schema = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'default-transfer',
      options
    }
  ]
};

export default schema;
