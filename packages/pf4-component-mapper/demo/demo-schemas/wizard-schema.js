import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { Button } from '@patternfly/react-core';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const ValidateButtons = ({ disableBack, handlePrev, buttonLabels: { back, cancel }, renderNextButton }) => {
  const [state, setState] = useState('init');
  const formOptions = useFormApi();

  const setValidating = () => {
    setState('validating');
    setTimeout(() => setState('done'), 0);
  };

  return (
    <React.Fragment>
      {state === 'init' ? (
        <Button variant="primary" type="button" isDisabled={!formOptions.valid} onClick={setValidating}>
          Validate
        </Button>
      ) : state === 'validating' ? (
        <Button type="button" variant="primary" isDisabled={true} onClick={() => {}}>
          Validating...
        </Button>
      ) : (
        renderNextButton()
      )}
      <Button type="button" variant="secondary" isDisabled={disableBack} onClick={handlePrev}>
        {back}
      </Button>
      <Button type="button" variant="link" onClick={formOptions.onCancel}>
        {cancel}
      </Button>
    </React.Fragment>
  );
};

ValidateButtons.propTypes = {
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  buttonLabels: PropTypes.shape({ back: PropTypes.node.isRequired, cancel: PropTypes.node.isRequired }).isRequired,
  renderNextButton: PropTypes.func.isRequired
};

const asyncValidator = () => new Promise((res) => setTimeout(() => res(), 1000));

export const wizardSchema = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      crossroads: ['source.source-type'],
      //inModal: true,
      title: 'Title',
      showTitles: true,
      description: 'Description',
      buttonsPosition: 'left',
      fields: [
        {
          title: 'Get started with adding source',
          name: 1,
          nextStep: {
            when: 'source.source-type',
            stepMapper: {
              aws: 'aws',
              google: 'google'
            }
          },
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source.source-name',
              type: 'text',
              label: 'Source name',
              validate: [asyncValidator]
            },
            {
              component: componentTypes.SELECT,
              name: 'source.source-type',
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
                },
                {
                  value: 'disabled',
                  label: 'i am disabled',
                  isDisabled: true
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
          substepOf: 'Summary',
          nextStep: 'summary',
          buttons: ValidateButtons,
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ],
              isRequired: true
            }
          ]
        },
        {
          name: 'google',
          title: 'Configure google',
          nextStep: 'summary',
          showTitle: false,
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'google.google-field',
              label: 'Google field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary',
          substepOf: 'Summary',
          title: 'Summary'
        }
      ]
    }
  ]
};

export const wizardSchemaWithFunction = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      //inModal: true,
      title: 'Title',
      showTitles: true,
      description: 'Description',
      buttonsPosition: 'left',
      fields: [
        {
          title: 'Get started with adding source',
          name: 1,
          nextStep: ({ values }) => values.source && values.source['source-type'],
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source.source-name',
              type: 'text',
              label: 'Source name'
            },
            {
              component: componentTypes.SELECT,
              name: 'source.source-type',
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
          substepOf: 'Summary',
          nextStep: 'summary',
          buttons: ValidateButtons,
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ],
              isRequired: true
            }
          ]
        },
        {
          name: 'google',
          title: 'Configure google',
          nextStep: 'summary',
          showTitle: false,
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'google.google-field',
              label: 'Google field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary',
          substepOf: 'Summary',
          title: 'Summary'
        }
      ]
    }
  ]
};

export const wizardSchemaSimple = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      title: 'Title',
      description: 'Description',
      buttonsPosition: 'left',
      fields: [
        {
          title: 'Get started with adding source',
          name: 'step-1',
          nextStep: 'aws',
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source-name',
              type: 'text',
              label: 'Source name'
            }
          ]
        },
        {
          title: 'Configure AWS',
          name: 'aws',
          nextStep: 'summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
              isRequired: true,
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary',
          title: 'Summary'
        }
      ]
    }
  ]
};

export const wizardSchemaSubsteps = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      title: 'Title',
      description: 'Description',
      buttonsPosition: 'left',
      fields: [
        {
          title: 'Get started with adding source',
          showTitle: true,
          name: 1,
          nextStep: 'aws',
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source-name',
              type: 'text',
              label: 'Source name'
            }
          ]
        },
        {
          title: 'Configure AWS',
          name: 'aws',
          nextStep: 'summary',
          substepOf: 'Summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part'
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary',
          title: 'Summary',
          substepOf: 'Summary'
        }
      ]
    }
  ]
};

export const wizardSchemaMoreSubsteps = {
  fields: [
    {
      component: componentTypes.WIZARD,
      isDynamic: true,
      name: 'wizzard',
      title: 'Dynamic with steps predicting',
      description: 'Description',
      buttonsPosition: 'left',
      fields: [
        {
          title: 'Get started with adding source',
          name: 1,
          nextStep: 'aws',
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source-name',
              type: 'text',
              label: 'Source name'
            }
          ]
        },
        {
          title: 'Configure AWS',
          name: 'aws',
          nextStep: 'aws2',
          substepOf: 'Summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part'
            }
          ]
        },
        {
          title: 'Configure AWS part 2 - disabled jumping',
          disableForwardJumping: true,
          name: 'aws2',
          nextStep: 'summary',
          substepOf: 'Summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field-1',
              label: 'Aws field part 1'
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary',
          title: 'Summary',
          substepOf: 'Finish',
          nextStep: 'summary2'
        },
        {
          fields: [
            {
              name: 'summary',
              component: 'summary'
            }
          ],
          name: 'summary2',
          title: 'Summary2',
          substepOf: 'Finish'
        }
      ]
    }
  ]
};
