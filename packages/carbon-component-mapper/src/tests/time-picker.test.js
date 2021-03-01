import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { act } from 'react-dom/test-utils';

describe('TimePicker', () => {
  let initialProps;
  let onSubmit;
  let wrapper;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate
    };
  });

  it('change AM/PM', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          twelveHoursFormat: true
        }
      ]
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

    expect(wrapper.find('input').props().value).toEqual('12:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(12);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);

    onSubmit.mockReset();

    await act(async () => {
      wrapper.find('select#time-picker-12h').simulate('change', { target: { value: 'AM' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('12:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(0);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);
  });

  it('handle invalid date', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker'
        }
      ]
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

    expect(wrapper.find('input').props().value).toEqual('00:00');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(0);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(0);
  });

  it('handle change', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker'
        }
      ]
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

    expect(wrapper.find('input').props().value).toEqual('13:28');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(13);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(28);
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

    expect(wrapper.find('input').props().value).toEqual('01:16');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(1);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(16);
  });

  it('change timezone', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          twelveHoursFormat: true,
          timezones: [
            { label: 'UTC', value: 'UTC', showAs: 'UTC' },
            { label: 'EST', value: 'EAST', showAs: 'Pacific/Easter' }
          ]
        }
      ]
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

    expect(wrapper.find('input').props().value).toEqual('05:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(5);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);

    onSubmit.mockReset();

    await act(async () => {
      wrapper.find('select#time-picker-12h').simulate('change', { target: { value: 'UTC' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(wrapper.find('input').props().value).toEqual('10:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(10);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);
  });
});
