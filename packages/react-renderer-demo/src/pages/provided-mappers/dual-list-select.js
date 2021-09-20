import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list-select',
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

const treeSchmea = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list-select',
      isTree: true,
      options: [
        {
          label: 'Animals',
          hasBadge: true,
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              value: 'lions',
              label: 'Lions',
            },
            {
              value: 'dogs',
              label: 'Dogs',
            },
            {
              label: 'Birds',
              children: [
                {
                  label: 'Pigeons',
                  value: 'pigens',
                },
              ],
            },
          ],
        },
        {
          label: 'Cars',
          children: [
            {
              value: 'suv',
              label: 'SUVs',
            },
            {
              value: 'hatchbacks',
              label: 'Hatchbacks',
            },
            {
              value: 'sedans',
              label: 'Sedans',
            },
            {
              label: 'Military',
              children: [
                {
                  label: 'Jeeps',
                  value: 'jeep',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const variants = [...baseFieldProps];

const basicVariant = { schema, label: 'Basic', value: 'basic' };
const treeVariant = { schema: treeSchmea, label: 'Tree', value: 'tree' };

const schemaVariants = {
  pf4: [basicVariant, treeVariant],
};

const DualListSelect = () => <ComponentText schema={schema} variants={variants} linkText="Dual list select" schemaVariants={schemaVariants} />;

export default DualListSelect;
