import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { Checkbox } from 'carbon-components-react';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          label: 'Please select on of options',
          options: [
            {
              label: 'option 1',
              value: 1,
            },
            {
              label: 'option 2',
              value: 2,
            },
          ],
        },
      ],
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Checkbox)).toHaveLength(2);
    expect(wrapper.find(Checkbox).first().props().labelText).toEqual('option 1');
    expect(wrapper.find(Checkbox).last().props().labelText).toEqual('option 2');
  });

  it('selects item in multiple checkbox', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          label: 'Please select on of options',
          options: [
            {
              label: 'option 1',
              value: 'option-1',
            },
            {
              label: 'option 2',
              value: 'option-2',
            },
          ],
        },
      ],
    };
    const eventCheck = {
      target: {
        checked: true,
        type: 'checkbox',
      },
    };
    const eventUncheck = {
      target: {
        checked: false,
        type: 'checkbox',
      },
    };

    const submitSpy = jest.fn();

    const wrapper = mount(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    await act(async () => {
      wrapper.find('input').first().simulate('change', eventCheck);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(submitSpy).toHaveBeenCalledWith({ check: ['option-1'] });
    submitSpy.mockClear();

    await act(async () => {
      wrapper.find('input').last().simulate('change', eventCheck);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(submitSpy).toHaveBeenCalledWith({ check: ['option-1', 'option-2'] });
    submitSpy.mockClear();

    await act(async () => {
      wrapper.find('input').first().simulate('change', eventUncheck);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(submitSpy).toHaveBeenCalledWith({ check: ['option-2'] });
    submitSpy.mockClear();
  });
});
