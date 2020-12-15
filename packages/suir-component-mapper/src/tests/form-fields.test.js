import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import Checkbox from '../files/checkbox';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { Radio, Dropdown } from 'semantic-ui-react';
import HelperText from '../common/helper-text';

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

          expect(
            wrapper
              .find('label')
              .first()
              .text()
          ).toEqual(field.label);
          expect(wrapper.find('.ui.pointing.prompt.label')).toHaveLength(0);
          expect(wrapper.find(HelperText)).toHaveLength(0);
          expect(wrapper.find('.required.field')).toHaveLength(0);
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
              .find('.ui.pointing.prompt.label')
              .last()
              .text()
          ).toEqual(errorText);
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
              .find(HelperText)
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
              .find(HelperText)
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
              .find('.ui.pointing.prompt.label')
              .last()
              .text()
          ).toEqual(errorText);
          expect(
            wrapper
              .find(HelperText)
              .last()
              .text()
          ).toEqual(helperText);
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true
          };
          const wrapper = mount(<RendererWrapper schema={{ fields: [requiredField] }} />);
          if (component === componentTypes.TEXTAREA) {
            expect(wrapper.find('.required.field')).toHaveLength(2);
          } else {
            expect(wrapper.find('.required.field')).toHaveLength(1);
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
          } else if (component === componentTypes.SELECT) {
            expect(
              wrapper
                .find(Dropdown)
                .first()
                .prop('disabled')
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
          } else if (component === componentTypes.SELECT) {
            /**SUIR select does not have read only prop */
            expect(true);
          } else {
            expect(
              wrapper
                .find('input')
                .first()
                .props().readOnly
            ).toEqual(true);
          }
        });

        it('renders with error', () => {
          const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);
          wrapper.find('form').simulate('submit');
          expect(
            wrapper
              .find('.ui.pointing.prompt.label')
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
        name: 'multiple-checkbox',
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
      expect(wrapper.find('.ui.pointing.prompt.label')).toHaveLength(0);
      expect(wrapper.find(HelperText)).toHaveLength(0);
      expect(wrapper.find('.required.field')).toHaveLength(0);
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
          .find('.ui.pointing.prompt.label')
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
          .find(HelperText)
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
          .find('.ui.pointing.prompt.label')
          .last()
          .text()
      ).toEqual(errorText);

      expect(
        wrapper
          .find(HelperText)
          .last()
          .text()
      ).toEqual(helperText);
    });
  });
});
