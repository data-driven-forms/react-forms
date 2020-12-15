import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormGroupWrapper from '../common/form-wrapper';

describe('formFields generated tests', () => {
  const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
    <FormRenderer
      onSubmit={jest.fn()}
      FormTemplate={(props) => <FormTemplate {...props} />}
      schema={schema}
      componentMapper={componentMapper}
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
            expect(wrapper.find('.ant-radio-wrapper')).toHaveLength(options.length);
          } else {
            expect(wrapper.find(componentMapper[component])).toHaveLength(1);
            expect(
              wrapper
                .find('label')
                .text()
                .includes(field.label)
            ).toEqual(true);
          }

          expect(wrapper.find(FormGroupWrapper)).toHaveLength(1);
          expect(wrapper.find('.ant-form-item-explain')).toHaveLength(0);
        });

        it('renders with error', async () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }]
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
          await act(async () => {
            wrapper.find('form').simulate('submit');
          });
          wrapper.update();
          expect(
            wrapper
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.ant-form-item-has-error').length).toBeGreaterThanOrEqual(1);
        });

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

          expect(
            wrapper
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.ant-form-item-has-warning').length).toBeGreaterThanOrEqual(1);
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
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.ant-form-item-has-error').length).toBeGreaterThanOrEqual(1);
        });

        it('renders with helperText', () => {
          const helpertextField = {
            ...field,
            helperText
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [helpertextField] }} />);

          expect(
            wrapper
              .find('.ant-form-item-explain')
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
              .find('.ant-form-item-explain')
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
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(helperText);
        });

        it('renders with error and helperText', async () => {
          const errorFields = {
            ...field,
            helperText,
            validate: [{ type: validatorTypes.REQUIRED }]
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [errorFields] }} />);
          await act(async () => {
            wrapper.find('form').simulate('submit');
          });
          wrapper.update();

          expect(
            wrapper
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(errorText);
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [requiredField] }} />);

          if (component === componentTypes.CHECKBOX) {
            expect(wrapper.find('.ddorg__ant-component-mapper_is-required').text()).toEqual('*');
          } else {
            expect(wrapper.find('.ant-form-item-required')).toHaveLength(1);
          }
        });

        it('renders isDisabled', () => {
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
          } else if (component === componentTypes.RADIO) {
            expect(wrapper.find('.ant-radio-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.CHECKBOX) {
            expect(wrapper.find('.ant-checkbox-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.SWITCH) {
            expect(wrapper.find('.ant-switch-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.SLIDER) {
            expect(wrapper.find('.ant-slider-disabled').length).toBeGreaterThanOrEqual(1);
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
                .props().readOnly
            ).toEqual(true);
          } else if (component === componentTypes.RADIO) {
            expect(wrapper.find('.ant-radio-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.CHECKBOX) {
            expect(wrapper.find('.ant-checkbox-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.SWITCH) {
            expect(wrapper.find('.ant-switch-disabled').length).toBeGreaterThanOrEqual(1);
          } else if (component === componentTypes.SLIDER) {
            expect(wrapper.find('.ant-slider-disabled').length).toBeGreaterThanOrEqual(1);
          } else {
            expect(
              wrapper
                .find('input')
                .first()
                .props().readOnly
            ).toEqual(true);
          }
        });

        it('renders with submitError', async () => {
          const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);
          await act(async () => {
            wrapper.find('form').simulate('submit');
          });
          wrapper.update();
          expect(
            wrapper
              .find('.ant-form-item-explain')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.ant-form-item-has-error').length).toBeGreaterThanOrEqual(1);
        });
      });
    });
  });
});
