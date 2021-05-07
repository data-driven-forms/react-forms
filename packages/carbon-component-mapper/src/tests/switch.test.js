import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { Toggle } from 'carbon-components-react';

describe('<Switch />', () => {
  it('initialValue works', async () => {
    const spy = jest.fn();
    const schema = {
      fields: [
        {
          component: componentTypes.SWITCH,
          name: 'switch',
          label: 'Switch',
          initialValue: true
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer
        onSubmit={(values) => spy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).props().toggled).toEqual(true);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(spy).toHaveBeenCalledWith({ switch: true });
    spy.mockClear();

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { checked: false } });
    });
    wrapper.update();

    expect(wrapper.find(Toggle).props().toggled).toEqual(false);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(spy).toHaveBeenCalledWith({});
  });
});
