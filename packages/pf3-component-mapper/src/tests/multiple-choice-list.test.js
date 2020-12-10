import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RequiredLabel from '../form-fields/required-label';
import { FieldLevelHelp, HelpBlock } from 'patternfly-react';
import Checkbox from '../files/checkbox';
import FormTemplate from '../files/form-template';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import FormRenderer from '@data-driven-forms/react-form-renderer';

describe.skip('<MultipleChoiceList />', () => {
  let initialProps;
  let changeSpy;
  let schema;

  beforeEach(() => {
    changeSpy = jest.fn();

    initialProps = {
      componentMapper: {
        [componentTypes.CHECKBOX]: Checkbox
      },
      onSubmit: (values) => changeSpy(values),
      FormTemplate,
      schema: {
        fields: [
          {
            component: componentTypes.CHECKBOX,
            name: 'checkbox',
            options: [
              {
                label: 'Foo',
                value: 0
              },
              {
                label: 'Bar',
                value: 1
              }
            ]
          }
        ]
      }
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should select', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { checked: true, type: 'checkbox' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(changeSpy).toHaveBeenCalledWith({ checkbox: [1] });
  });

  it('should unselect', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ checkbox: [1] }} />);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(changeSpy).toHaveBeenCalledWith({ checkbox: [1] });
    changeSpy.mockClear();

    await act(async () => {
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { checked: false, type: 'checkbox' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(changeSpy).toHaveBeenCalledWith({ checkbox: [] });
  });

  it('should render in error state', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          validate: [{ type: 'required' }],
          name: 'checkbox',
          options: [
            {
              label: 'Foo',
              value: 0
            },
            {
              label: 'Bar',
              value: 1
            }
          ]
        }
      ]
    };
    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render required variant', () => {
    schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          isRequired: true,
          name: 'checkbox',
          label: 'I am required',
          options: [
            {
              label: 'Foo',
              value: 0
            },
            {
              label: 'Bar',
              value: 1
            }
          ]
        }
      ]
    };
    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    expect(wrapper.find(RequiredLabel)).toHaveLength(1);
  });

  it('should render helper text variant', () => {
    schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          helperText: 'Helper text',
          name: 'checkbox',
          options: [
            {
              label: 'Foo',
              value: 0
            },
            {
              label: 'Bar',
              value: 1
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(1);

    expect(
      wrapper
        .find(FieldLevelHelp)
        .first()
        .props().content
    ).toEqual('Helper text');
    expect(wrapper.find(HelpBlock)).toHaveLength(0);
  });

  it('should render description variant', () => {
    schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          description: 'Description',
          name: 'checkbox',
          options: [
            {
              label: 'Foo',
              value: 0
            },
            {
              label: 'Bar',
              value: 1
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(0);
    expect(wrapper.find(HelpBlock)).toHaveLength(1);
    expect(
      wrapper
        .find(HelpBlock)
        .first()
        .text()
    ).toEqual('Description');
  });
});
