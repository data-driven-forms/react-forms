import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormGroupWrapper from '../files/form-group';

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
            expect(wrapper.find('.bp3-radio')).toHaveLength(options.length);
          } else if (component === componentTypes.SWITCH) {
            expect(
              wrapper
                .find('.bp3-switch')
                .first()
                .text()
                .includes(field.label)
            ).toEqual(true);
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
          expect(wrapper.find('.bp3-form-helper-text')).toHaveLength(0);
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
              .find('.bp3-form-helper-text')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.bp3-intent-danger').length).toBeGreaterThanOrEqual(1);
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
              .find('.bp3-form-helper-text')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.bp3-intent-warning').length).toBeGreaterThanOrEqual(1);
        });

        it('renders with helperText', () => {
          const helpertextField = {
            ...field,
            helperText
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [helpertextField] }} />);

          expect(
            wrapper
              .find('.bp3-form-helper-text')
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
              .find('.bp3-form-helper-text')
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
              .find('.bp3-form-helper-text')
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

          expect(
            wrapper
              .find('.bp3-form-helper-text')
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

          expect(
            wrapper
              .find('.bp3-text-muted')
              .last()
              .text()
          ).toEqual('(required)');
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
          } else {
            if (!wrapper.find('.bp3-disabled')) {
              expect(
                wrapper
                  .find('input')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else {
              expect(wrapper.find('.bp3-disabled').length).toBeGreaterThanOrEqual(1);
            }
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
                .props().disabled
            ).toEqual(true);
          } else {
            if (!wrapper.find('.bp3-disabled')) {
              expect(
                wrapper
                  .find('input')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else {
              expect(wrapper.find('.bp3-disabled').length).toBeGreaterThanOrEqual(1);
            }
          }
        });

        it('renders with error', () => {
          const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);
          wrapper.find('form').simulate('submit');
          expect(
            wrapper
              .find('.bp3-form-helper-text')
              .last()
              .text()
          ).toEqual(errorText);
          expect(wrapper.find('.bp3-intent-danger').length).toBeGreaterThanOrEqual(1);
        });
      });
    });
  });
});
