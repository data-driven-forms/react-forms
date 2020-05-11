import React from 'react';
import { mount } from 'enzyme';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import Checkbox from '../files/checkbox';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';

const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
  <FormRenderer
    onSubmit={jest.fn()}
    FormTemplate={(props) => <FormTemplate {...props} />}
    schema={schema}
    componentMapper={componentMapper}
    {...props}
  />
);

describe('formFields', () => {
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
      componentTypes.SELECT
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
            expect(wrapper.find(Radio)).toHaveLength(options.length);
          } else {
            expect(wrapper.find(componentMapper[component])).toHaveLength(1);
          }

          expect(wrapper.find(FormLabel).text()).toEqual(field.label);
          expect(wrapper.find('.Mui-error')).toHaveLength(0);
          expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
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
              .find('.Mui-error')
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
              .find('.MuiFormHelperText-root')
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
              .find('.MuiFormHelperText-root')
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
              .find('.MuiFormHelperText-root')
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
              .find('.Mui-error')
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

          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(1);
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
          } else {
            expect(
              wrapper
                .find('input')
                .first()
                .props().readOnly
            ).toEqual(true);
          }
        });
      });
    });
  });

  describe('MultipleCheckbox', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        ...initialProps,
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
      expect(wrapper.find('.Mui-error')).toHaveLength(0);
      expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
      expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
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
          .find('.Mui-error')
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
          .find('.MuiFormHelperText-root')
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
          .find('.MuiFormHelperText-root')
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
          .find('.MuiFormHelperText-root')
          .last()
          .text()
      ).toEqual(helperText);
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
          .find('.Mui-error')
          .last()
          .text()
      ).toEqual(errorText);
    });
  });
});
