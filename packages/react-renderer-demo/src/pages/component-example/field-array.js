import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import FieldArray from '@docs/doc-components/field-array';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
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

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.FIELD_ARRAY}
        schema={arraySchemaDDF}
        ContentText={FieldArray}
        variants={variants}
        linkText="Field Array"
      />
    </Fragment>
  );
};
