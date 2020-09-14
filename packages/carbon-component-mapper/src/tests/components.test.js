import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import WithDescription from '../common/with-description';

describe('component tests', () => {
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
            expect(wrapper.find('.bx--radio-button-wrapper')).toHaveLength(options.length);
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
          if ([componentTypes.RADIO, componentTypes.SWITCH, componentTypes.CHECKBOX].includes(component)) {
            // 'skipped because this component does not support this';
            return;
          }

          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }]
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [errorField] }} />);
          wrapper.find('form').simulate('submit');

          if (wrapper.find('#field-name-error-msg').length) {
            expect(wrapper.find('#field-name-error-msg').text()).toEqual(errorText);
          }

          expect(wrapper.find('[invalid=true]').length).toBeGreaterThanOrEqual(1);
        });

        it('renders with helperText', () => {
          if (
            [
              componentTypes.RADIO,
              componentTypes.SWITCH,
              componentTypes.CHECKBOX,
              componentTypes.DATE_PICKER,
              componentTypes.TIME_PICKER,
              componentTypes.SLIDER
            ].includes(component)
          ) {
            // 'skipped because this component does not support this';
            return;
          }

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

        it('renders with description', () => {
          const descriptionField = {
            ...field,
            description
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(wrapper.find(WithDescription)).toHaveLength(1);
        });

        it('renders with description and helperText', () => {
          const descriptionField = {
            ...field,
            description,
            ...(![
              componentTypes.RADIO,
              componentTypes.SWITCH,
              componentTypes.CHECKBOX,
              componentTypes.DATE_PICKER,
              componentTypes.TIME_PICKER,
              componentTypes.SLIDER
            ].includes(component)
              ? { helperText }
              : {})
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(wrapper.find(WithDescription)).toHaveLength(1);

          if (
            ![
              componentTypes.RADIO,
              componentTypes.SWITCH,
              componentTypes.CHECKBOX,
              componentTypes.DATE_PICKER,
              componentTypes.TIME_PICKER,
              componentTypes.SLIDER
            ].includes(component)
          ) {
            expect(
              wrapper
                .find('.bx--form__helper-text')
                .last()
                .text()
            ).toEqual(helperText);
          }
        });

        it('renders with error and helperText', () => {
          const errorFields = {
            ...field,
            ...(![
              componentTypes.RADIO,
              componentTypes.SWITCH,
              componentTypes.CHECKBOX,
              componentTypes.DATE_PICKER,
              componentTypes.TIME_PICKER,
              componentTypes.SLIDER
            ].includes(component)
              ? { helperText }
              : {}),
            validate: [{ type: validatorTypes.REQUIRED }]
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [errorFields] }} />);
          wrapper.find('form').simulate('submit');

          if (wrapper.find('#field-name-error-msg').length) {
            expect(wrapper.find('#field-name-error-msg').text()).toEqual(errorText);
          }

          expect(wrapper.find('.bx--form__helper-text')).toHaveLength(0);
        });

        it('renders isDisabled', () => {
          const disabledField = {
            ...field,
            isDisabled: true
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [disabledField] }} />);

          expect(wrapper.find('[disabled=true]').length).toBeGreaterThanOrEqual(1);
        });
      });
    });
  });
});
