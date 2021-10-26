import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import { act } from 'react-dom/test-utils';
import TimePicker from '../time-picker';

describe('TimePicker<String>', () => {
  let initialProps;
  let onSubmit;
  let wrapper;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper: {
        [componentTypes.TIME_PICKER]: {
          component: TimePicker,
          useStringFormat: true,
        },
      },
      FormTemplate,
    };
  });

  it('change AM/PM', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          twelveHoursFormat: true,
        },
      ],
    };

    wrapper = mount(<FormRenderer schema={schema} {...initialProps} />);

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '00:35' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('select#time-picker-12h').simulate('change', { target: { value: 'PM' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 PM' });

    onSubmit.mockReset();

    await act(async () => {
      wrapper.find('select#time-picker-12h').simulate('change', { target: { value: 'AM' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 AM' });
  });

  it('does not handle invalid date', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
        },
      ],
    };

    wrapper = mount(<FormRenderer schema={schema} {...initialProps} />);

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: 'aa:BB' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').simulate('blur');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('aa:BB');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': 'aa:BB' });
  });

  it('handle change', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
        },
      ],
    };

    wrapper = mount(<FormRenderer schema={schema} {...initialProps} />);

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '13:87' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').simulate('blur');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('13:87');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '13:87' });
    onSubmit.mockReset();

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '25:16' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').simulate('blur');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('25:16');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '25:16' });
  });

  it('change timezone', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          twelveHoursFormat: true,
          timezones: [
            { label: 'UTC', value: 'UTC' },
            { label: 'EST', value: 'EAST' },
          ],
        },
      ],
    };

    wrapper = mount(<FormRenderer schema={schema} {...initialProps} />);

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '00:35' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('select#time-picker-timezones').simulate('change', { target: { value: 'EST' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 AM EST' });

    onSubmit.mockReset();

    await act(async () => {
      wrapper.find('select#time-picker-timezones').simulate('change', { target: { value: 'UTC' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 AM UTC' });
  });

  it('handles initial value', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          initialValue: '12:57 PM EAST',
          twelveHoursFormat: true,
          timezones: [
            { label: 'UTC', value: 'UTC' },
            { label: 'EST', value: 'EAST' },
          ],
        },
      ],
    };

    wrapper = mount(<FormRenderer schema={schema} {...initialProps} />);

    expect(wrapper.find('input').props().value).toEqual('12:57');

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '00:35' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 PM EAST' });
  });
});
