import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import arraySchemaDDF from '../../components/navigation/field-array-schema';

const variants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'label',
    type: 'string',
    required: false
  },
  {
    name: 'description',
    type: 'string',
    required: false
  }
];

export default () => <ComponentText schema={arraySchemaDDF} variants={variants} linkText="Field Array" />;
