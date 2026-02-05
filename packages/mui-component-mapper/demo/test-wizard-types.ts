// Type test to verify wizard schema typing works correctly
import { componentTypes, validatorTypes, Schema } from '@data-driven-forms/react-form-renderer';
import { compositeMapper } from './compositeMapper';

// Test 1: Basic wizard schema should work
const testSchema1: Schema<typeof compositeMapper> = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'test-wizard',
      fields: [
        {
          name: 'step-1',
          title: 'Step 1',
          nextStep: 'step-2',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'field1',
              label: 'Field 1',
            },
          ],
        },
      ],
    },
  ],
};

// Test 2: Wizard with nextStep object should work
const testSchema2: Schema<typeof compositeMapper> = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'test-wizard-2',
      fields: [
        {
          name: 'step-1',
          nextStep: {
            when: 'fieldName',
            stepMapper: {
              value1: 'step-2',
              value2: 'step-3',
            },
          },
          fields: [
            {
              component: componentTypes.SELECT,
              name: 'fieldName',
              label: 'Select',
            },
          ],
        },
      ],
    },
  ],
};

// Test 3: Regular (non-wizard) field should still work
const testSchema3: Schema<typeof compositeMapper> = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'regular-field',
      label: 'Regular Field',
    },
  ],
};

console.log('Type tests passed!', testSchema1, testSchema2, testSchema3);
