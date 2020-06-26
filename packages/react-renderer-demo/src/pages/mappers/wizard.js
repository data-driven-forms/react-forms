import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import WizardText from '@docs/doc-components/wizard';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

const schema = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      fields: [
        {
          title: 'Get started with adding source',
          name: 'step-1',
          nextStep: {
            when: 'source-type',
            stepMapper: {
              aws: 'aws',
              google: 'google'
            }
          },
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source-name',
              type: 'text',
              label: 'Source name'
            },
            {
              component: componentTypes.SELECT,
              name: 'source-type',
              label: 'Source type',
              isRequired: true,
              options: [
                {
                  label: 'Please Choose'
                },
                {
                  value: 'aws',
                  label: 'Aws'
                },
                {
                  value: 'google',
                  label: 'Google'
                }
              ],
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          title: 'Configure AWS',
          name: 'aws',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part'
            }
          ]
        },
        {
          name: 'google',
          title: 'Configure google',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'google-field',
              label: 'Google field part'
            }
          ]
        }
      ]
    }
  ]
};

const variants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'fields',
    type: 'array',
    required: true
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.WIZARD}
        schema={schema}
        ContentText={WizardText}
        variants={variants}
        linkText="Wizard"
      />
    </Fragment>
  );
};
