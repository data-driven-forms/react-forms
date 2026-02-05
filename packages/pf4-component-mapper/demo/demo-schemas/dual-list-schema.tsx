import React from 'react';
import { componentTypes as components } from '@data-driven-forms/react-form-renderer';
import { DualListSortButton } from '../../src';

const output = {
  title: 'Testing dual list',
  description: 'Description of testing dual list',
  fields: [
    {
      component: components.DUAL_LIST_SELECT,
      name: 'dual-list-select',
      label: 'choose favorite animal',
      isSortable: true,
      availableOptionsActions: [<DualListSortButton position="left" key="sort" />],
      chosenOptionsActions: [<DualListSortButton position="right" key="sort" />],
      options: [
        {
          value: 'cats',
          label: 'cats',
        },
        {
          value: 'cats_1',
          label: 'cats_1',
        },
        {
          value: 'cats_2',
          label: 'cats_2',
        },
        {
          value: 'zebras',
          label: 'zebras',
        },
        {
          value: 'pigeons',
          label: 'pigeons',
        },
      ],
    },
  ],
};

export default output;
