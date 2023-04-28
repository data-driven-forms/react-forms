import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';
import updateFieldSchema from '../../helpers/update-field-schema';

const loadOptions = `<FUNCTION () =>
      new Promise((res) =>
        setTimeout(
          () =>
            res([
              { value: 'first-option', label: 'First async option' },
              { value: 'second-option', label: 'Second async option' }
            ]),
          2500
        )
      ) FUNCTION>`.replace(/\n/g, '<NEWLINE>');

const schema = {
  fields: [
    {
      component: componentTypes.SELECT,
      label: 'Select',
      name: 'select',
      simpleValue: true,
      options: [
        { label: 'Dogs', value: '1' },
        { label: 'Cats', value: '2' },
        { label: 'Hamsters', value: '3' },
      ],
    },
  ],
};

const basicVariant = { schema, label: 'Basic', value: 'basic' };
const multiVariant = { schema: updateFieldSchema(schema, { isMulti: true }), label: 'Multi', value: 'multi' };
const loadOptionsVariant = { schema: updateFieldSchema(schema, { options: [], loadOptions }), label: 'Load options', value: 'load-options' };

const groupsAndDividersSchema = {
  fields: [
    {
      component: componentTypes.SELECT,
      name: 'select-with-categories',
      label: 'With categories',
      options: [
        {
          label: 'Category 1',
          options: [
            { label: 'value 1', value: '111' },
            { label: 'value 2', value: '222' },
          ],
        },
        { divider: true },
        { label: 'independent 1', value: '1112333' },
        { divider: true },
        {
          label: 'Category 2',
          options: [
            { label: 'value 3', value: '333' },
            { label: 'value 4', value: '444' },
          ],
        },
        { divider: true },
        { label: 'independent 2', value: '11111' },
      ],
    },
  ],
};

const groupsAndDividersVariant = { schema: groupsAndDividersSchema, label: 'Groups', value: 'groups-dividers' };

const schemaVariants = {
  mui: [basicVariant, multiVariant, loadOptionsVariant],
  pf4: [basicVariant, multiVariant, loadOptionsVariant, groupsAndDividersVariant],
  blueprint: [basicVariant, multiVariant],
  suir: [basicVariant, multiVariant, loadOptionsVariant],
  ant: [basicVariant, multiVariant, loadOptionsVariant],
  carbon: [basicVariant, multiVariant, loadOptionsVariant],
};

const variants = [
  ...baseFieldProps,
  {
    name: 'isMulti',
    type: 'boolean',
  },
  {
    name: 'options',
    type: 'array',
  },
  {
    name: 'noOptionsMessage',
    type: 'string',
  },
  {
    name: 'placeholder',
    type: 'string',
  },
  {
    name: 'isSearchable',
    type: 'boolean',
  },
  {
    name: 'isClearable',
    type: 'boolean',
  },
  {
    name: 'simpleValue',
    type: 'boolean',
  },
  {
    name: 'loadOptions',
    type: 'func',
  },
];

const Select = () => <ComponentText schema={schema} variants={variants} linkText="Select" schemaVariants={schemaVariants} />;

export default Select;
