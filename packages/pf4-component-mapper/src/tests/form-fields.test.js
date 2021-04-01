import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { FormGroup, Radio as PF4Radio } from '@patternfly/react-core';
import { mount } from 'enzyme';
import Checkbox from '../checkbox';
import Switch from '../switch';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';

describe('FormFields', () => {
  const props = {
    name: 'Name of the field',
    id: 'someIdKey'
  };

  it('should render with onText/OffText Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} onText="I am on" offText="Turned off" />
      </RenderWithProvider>
    );

    expect(
      wrapper
        .find('.pf-m-on')
        .text()
        .includes('I am on')
    ).toEqual(true);
    expect(
      wrapper
        .find('.pf-m-on')
        .text()
        .includes('Turned off')
    ).toEqual(false);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('formFields generated tests', () => {
    const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
      <FormRenderer
        onSubmit={jest.fn()}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
        subscription={{ submitFailed: true }}
        {...props}
      />
    );
    let field;
    let schema;

    const errorText = 'Required';
    const helperText = 'I am helper text';
    const description = 'This is description';
    const options = [
      { label: 'Cat', value: 'cats' },
      { label: 'Dog', value: 'dogs' },
      { label: 'Hamster', value: 'hamsters' }
    ];

    const componentsWithOptions = [componentTypes.RADIO, componentTypes.SELECT];

    beforeEach(() => {
      field = {};
      schema = [];
    });

    describe('components', () => {
      [
        componentTypes.TEXT_FIELD,
        componentTypes.TEXTAREA,
        componentTypes.RADIO,
        componentTypes.CHECKBOX,
        componentTypes.DATE_PICKER,
        componentTypes.TIME_PICKER,
        componentTypes.SWITCH,
        componentTypes.SELECT,
        componentTypes.SLIDER
      ].forEach((component) => {
        describe(`Component type: ${component}`, () => {
          beforeEach(() => {
            field.component = component;
            field.name = 'field-name';
            field.label = 'Some label';

            if (componentsWithOptions.includes(component)) {
              field = {
                ...field,
                options
              };
            }

            schema = { fields: [field] };
          });

          it('renders correctly', () => {
            const wrapper = mount(<RendererWrapper schema={schema} />);

            if (component === componentTypes.RADIO) {
              expect(wrapper.find(PF4Radio)).toHaveLength(options.length);
            } else if (component === componentTypes.SWITCH) {
              expect(
                wrapper
                  .find('.pf-c-switch__label')
                  .first()
                  .text()
              ).toEqual(field.label);
            } else {
              expect(wrapper.find(componentMapper[component])).toHaveLength(1);
              expect(wrapper.find('label').text()).toEqual(field.label);
            }

            expect(wrapper.find(FormGroup)).toHaveLength(1);
            expect(wrapper.find('.pf-m-error')).toHaveLength(0);
            expect(wrapper.find('.pf-c-form__helper-text')).toHaveLength(0);
            expect(wrapper.find('.pf-c-form__label-required')).toHaveLength(0);
          });

          it('renders with error', () => {
            const errorField = {
              ...field,
              validate: [{ type: validatorTypes.REQUIRED }]
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
            wrapper.find('form').simulate('submit');
            expect(
              wrapper
                .find('.pf-m-error')
                .last()
                .text()
            ).toEqual(errorText);
          });

          it('renders with error and validateOnMount', async () => {
            const errorField = {
              ...field,
              validate: [{ type: validatorTypes.REQUIRED }],
              validateOnMount: true
            };
            let wrapper;
            await act(async () => {
              wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
            });
            wrapper.update();
            expect(
              wrapper
                .find('.pf-m-error')
                .last()
                .text()
            ).toEqual(errorText);
          });

          it('renders with helperText', () => {
            const helpertextField = {
              ...field,
              helperText
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [helpertextField] }} />);

            expect(
              wrapper
                .find('.pf-c-form__helper-text')
                .last()
                .text()
            ).toEqual(helperText);
          });

          it('renders with description', () => {
            const descriptionField = {
              ...field,
              description
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

            expect(
              wrapper
                .find('small')
                .last()
                .text()
            ).toEqual(description);
          });

          it('renders with description and helperText', () => {
            const descriptionField = {
              ...field,
              description,
              helperText
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

            expect(
              wrapper
                .find('.pf-c-form__helper-text')
                .last()
                .text()
            ).toEqual(helperText);
            expect(
              wrapper
                .find('small')
                .last()
                .text()
            ).toEqual(description);
          });

          if (![componentTypes.SELECT, componentTypes.SLIDER, componentTypes.RADIO].includes(component)) {
            it('renders with warning and helperText', async () => {
              const errorFields = {
                ...field,
                helperText,
                id: 'warning-field',
                validate: [() => ({ type: 'warning', error: errorText })],
                useWarnings: true
              };

              let wrapper;

              await act(async () => {
                wrapper = mount(<RendererWrapper schema={{ fields: [errorFields] }} />);
              });
              wrapper.update();

              await act(async () => {
                wrapper
                  .find('#warning-field')
                  .last()
                  .simulate('focus');
              });
              wrapper.update();

              await act(async () => {
                wrapper
                  .find('#warning-field')
                  .last()
                  .simulate('blur');
              });
              wrapper.update();

              expect(
                wrapper
                  .find('.pf-m-warning')
                  .last()
                  .text()
              ).toEqual(errorText);
            });
          }

          it('renders isRequired', () => {
            const requiredField = {
              ...field,
              isRequired: true
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [requiredField] }} />);

            if (component === componentTypes.SWITCH) {
              expect(wrapper.find('.pf-c-form__label-required')).toHaveLength(2);
            } else {
              expect(wrapper.find('.pf-c-form__label-required')).toHaveLength(1);
            }
          });

          it('renders isDisabled', () => {
            if (component === componentTypes.SLIDER) {
              return;
            }

            const disabledField = {
              ...field,
              isDisabled: true
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [disabledField] }} />);

            if (component === componentTypes.TEXTAREA) {
              expect(
                wrapper
                  .find('textarea')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else if (component === componentTypes.SELECT) {
              expect(wrapper.find('div.pf-c-select__toggle').prop('disabled')).toEqual(true);
            } else {
              expect(
                wrapper
                  .find('input')
                  .first()
                  .props().disabled
              ).toEqual(true);
            }
          });

          it('renders isReadOnly', () => {
            if (component === componentTypes.SELECT || component === componentTypes.SLIDER) {
              return;
            }

            const disabledField = {
              ...field,
              isReadOnly: true
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [disabledField] }} />);

            if (component === componentTypes.TEXTAREA) {
              expect(
                wrapper
                  .find('textarea')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else if (
              [
                componentTypes.DATE_PICKER,
                componentTypes.TIME_PICKER,
                componentTypes.CHECKBOX,
                componentTypes.RADIO,
                componentTypes.SWITCH,
                componentTypes.SLIDER
              ].includes(component)
            ) {
              expect(
                wrapper
                  .find('input')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else {
              expect(
                wrapper
                  .find('input')
                  .first()
                  .props().readOnly
              ).toEqual(true);
            }
          });

          it('renders with submit error', async () => {
            const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);

            await act(async () => {
              wrapper.find('form').simulate('submit');
            });
            wrapper.update();

            expect(
              wrapper
                .find('.pf-m-error')
                .last()
                .text()
            ).toEqual(errorText);
          });
        });
      });
    });

    describe('MultipleCheckbox', () => {
      let initialProps;
      beforeEach(() => {
        initialProps = {
          ...initialProps,
          name: 'checkbox',
          options: [
            { label: 'Cat', value: 'cats' },
            { label: 'Dog', value: 'dogs' },
            { label: 'Hamster', value: 'hamsters' }
          ]
        };
      });

      it('renders correctly', () => {
        const wrapper = mount(
          <RenderWithProvider>
            <Checkbox {...initialProps} />
          </RenderWithProvider>
        );

        expect(wrapper.find(MultipleChoiceListCommon)).toHaveLength(1);
        expect(wrapper.find('.pf-m-error')).toHaveLength(0);
        expect(wrapper.find('.pf-c-form__helper-text')).toHaveLength(0);
        expect(wrapper.find('.pf-c-form__label-required')).toHaveLength(0);
      });

      it('renders with error', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              validate: [{ type: validatorTypes.REQUIRED }]
            }
          ]
        };
        const wrapper = mount(<RendererWrapper schema={schema} />);
        wrapper.find('form').simulate('submit');

        expect(
          wrapper
            .find('.pf-m-error')
            .last()
            .text()
        ).toEqual(errorText);
      });

      it('renders with helperText', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText
            }
          ]
        };
        const wrapper = mount(<RendererWrapper schema={schema} />);

        expect(
          wrapper
            .find('.pf-c-form__helper-text')
            .last()
            .text()
        ).toEqual(helperText);
      });

      it('renders with description', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              description
            }
          ]
        };
        const wrapper = mount(<RendererWrapper schema={schema} />);

        expect(
          wrapper
            .find('small')
            .last()
            .text()
        ).toEqual(description);
      });

      it('renders with description and helperText', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText,
              description
            }
          ]
        };
        const wrapper = mount(<RendererWrapper schema={schema} />);

        expect(
          wrapper
            .find('.pf-c-form__helper-text')
            .last()
            .text()
        ).toEqual(helperText);
        expect(
          wrapper
            .find('small')
            .last()
            .text()
        ).toEqual(description);
      });

      it('renders with error and helperText', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText,
              validate: [{ type: validatorTypes.REQUIRED }]
            }
          ]
        };
        const wrapper = mount(<RendererWrapper schema={schema} />);
        wrapper.find('form').simulate('submit');

        expect(
          wrapper
            .find('.pf-m-error')
            .last()
            .text()
        ).toEqual(errorText);
      });
    });
  });
});
