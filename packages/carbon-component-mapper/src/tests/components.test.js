import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import WithDescription from '../with-description';

describe('component tests', () => {
  const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
    <FormRenderer
      onSubmit={jest.fn()}
      FormTemplate={(props) => <FormTemplate {...props} />}
      schema={schema}
      componentMapper={{
        ...componentMapper,
        'text-field-number': {
          component: componentMapper[componentTypes.TEXT_FIELD],
          type: 'number'
        }
      }}
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
      componentTypes.SLIDER,
      'text-field-number'
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
            expect(wrapper.find('.bx--radio-button-wrapper')).toHaveLength(options.length);
          } else if (component === 'text-field-number') {
            expect(wrapper.find('NumberInput')).toHaveLength(1);
          } else {
            expect(wrapper.find(componentMapper[component])).toHaveLength(1);
            expect(
              wrapper
                .find('label')
                .text()
                .includes(field.label)
            ).toEqual(true);
          }
        });

        it('renders with error', () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }]
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
          wrapper.find('form').simulate('submit');

          if (wrapper.find('#field-name-error-msg').length) {
            expect(wrapper.find('#field-name-error-msg').text()).toEqual(errorText);
            expect(wrapper.find('[invalid=true]').length).toBeGreaterThanOrEqual(1);
          }

          if (wrapper.find('.ddorg__carbon-error-helper-text').length) {
            expect(wrapper.find('.ddorg__carbon-error-helper-text').text()).toEqual(errorText);
          }
        });

        if (component !== 'text-field-number') {
          it('renders with warning', async () => {
            const errorField = {
              ...field,
              validate: [{ type: validatorTypes.REQUIRED, warning: true }],
              useWarnings: true,
              validateOnMount: true
            };
            let wrapper;

            await act(async () => {
              wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
            });
            wrapper.update();
            wrapper.update();

            const helperText = wrapper.find('.bx--form__helper-text');

            if (helperText.length) {
              expect(helperText.text()).toEqual(errorText);
            } else {
              expect(
                wrapper
                  .find('.bx--form-requirement')
                  .last()
                  .text()
              ).toEqual(errorText);
            }
          });

          it('renders with helperText', () => {
            const helpertextField = {
              ...field,
              helperText
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [helpertextField] }} />);

            expect(
              wrapper
                .find('.bx--form__helper-text')
                .last()
                .text()
            ).toEqual(helperText);
          });

          it('renders with description and helperText', () => {
            const descriptionField = {
              ...field,
              description,
              helperText
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

            expect(wrapper.find(WithDescription)).toHaveLength(1);

            expect(
              wrapper
                .find('.bx--form__helper-text')
                .last()
                .text()
            ).toEqual(helperText);
          });

          it('renders with error and helperText', () => {
            const errorFields = {
              ...field,
              helperText,
              validate: [{ type: validatorTypes.REQUIRED }]
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [errorFields] }} />);
            wrapper.find('form').simulate('submit');

            if (wrapper.find('#field-name-error-msg').length) {
              expect(wrapper.find('#field-name-error-msg').text()).toEqual(errorText);
              expect(wrapper.find('[invalid=true]').length).toBeGreaterThanOrEqual(1);
            }

            if (wrapper.find('.ddorg__carbon-error-helper-text').length) {
              expect(wrapper.find('.ddorg__carbon-error-helper-text').text()).toEqual(errorText);
            }

            expect(wrapper.find('.bx--form__helper-text')).toHaveLength(0);
          });
        }

        it('renders with description', () => {
          const descriptionField = {
            ...field,
            description
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(wrapper.find(WithDescription)).toHaveLength(1);
        });

        it('renders isDisabled', () => {
          const disabledField = {
            ...field,
            isDisabled: true
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [disabledField] }} />);

          expect(wrapper.find('[disabled=true]').length).toBeGreaterThanOrEqual(1);
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [requiredField] }} />);
          expect(wrapper.find('.ddorg__carbon-component-mapper_is-required').text()).toEqual('*');
        });

        it('renders with submitError', () => {
          const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);
          wrapper.find('form').simulate('submit');

          if (wrapper.find('#field-name-error-msg').length) {
            expect(wrapper.find('#field-name-error-msg').text()).toEqual(errorText);
            expect(wrapper.find('[invalid=true]').length).toBeGreaterThanOrEqual(1);
          }

          if (wrapper.find('.ddorg__carbon-error-helper-text').length) {
            expect(wrapper.find('.ddorg__carbon-error-helper-text').text()).toEqual(errorText);
          }
        });
      });
    });
  });
});
