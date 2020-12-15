import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { FormGroup, Radio as PF4Radio } from '@patternfly/react-core';
import { mount, shallow } from 'enzyme';
import TextField from '../files/text-field';
import Textarea from '../files/textarea';
import Radio from '../files/radio';
import Checkbox from '../files/checkbox';
import Select from '../files/select';
import DatePicker from '../files/date-picker';
import TimePicker from '../files/time-picker';
import Switch from '../files/switch';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';

describe('FormFields', () => {
  const props = {
    name: 'Name of the field',
    id: 'someIdKey'
  };
  const propsWithOptions = {
    ...props,
    options: [
      {
        label: 'One',
        value: '1'
      },
      {
        label: 'Two',
        value: '2'
      },
      {
        label: 'Three',
        value: '3'
      }
    ]
  };

  it('should render TextField correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField with description correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} description="This is description" />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField without id correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} id={undefined} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render touched TextField id correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} meta={{ touched: true, error: false }} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox with options correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...propsWithOptions} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Checkbox with options correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...propsWithOptions} disabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Textarea correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Textarea {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Textarea correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Textarea {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Radio correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Radio {...propsWithOptions} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Radio correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Radio {...propsWithOptions} disabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Select correctly', () => {
    const wrapper = shallow(
      <RenderWithProvider>
        <Select {...propsWithOptions} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Select correctly', () => {
    const wrapper = shallow(
      <RenderWithProvider>
        <Select {...propsWithOptions} isDisabled={true} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render DatePicker correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <DatePicker {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TimePicker correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TimePicker {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

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
            const disabledField = {
              ...field,
              isReadOnly: true
            };
            const wrapper = mount(<RendererWrapper schema={{ fields: [disabledField] }} />);

            if (component === componentTypes.SELECT) {
              expect(true);
              return;
            }

            if (component === componentTypes.TEXTAREA) {
              expect(
                wrapper
                  .find('textarea')
                  .first()
                  .props().disabled
              ).toEqual(true);
            } else if ([componentTypes.CHECKBOX, componentTypes.RADIO, componentTypes.SWITCH, componentTypes.SLIDER].includes(component)) {
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

          it('renders with submit error', () => {
            const wrapper = mount(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);
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
