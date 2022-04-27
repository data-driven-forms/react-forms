import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('TimePicker', () => {
  let initialProps;
  let onSubmit;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '00:35' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.selectOptions(screen.getByLabelText('open list of options', { selector: 'select' }), screen.getByText('PM'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('12:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(12);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);

    onSubmit.mockReset();

    await userEvent.selectOptions(screen.getByLabelText('open list of options', { selector: 'select' }), screen.getByText('AM'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('12:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(0);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);
  });

  it('handle invalid date', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
        },
      ],
    };

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: 'aa:BB' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('24:00');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(0);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(0);
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '13:87' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('13:27');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(13);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(27);
    onSubmit.mockReset();

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '25:16' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('01:16');
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
            { label: 'EST', value: 'EST', showAs: 'Pacific/Easter' },
          ],
        },
      ],
    };

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '00:35' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.selectOptions(screen.getAllByLabelText('open list of options', { selector: 'select' })[1], screen.getByText('EST'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('07:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(12);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);

    onSubmit.mockReset();

    await userEvent.selectOptions(screen.getAllByLabelText('open list of options', { selector: 'select' })[1], screen.getByText('UTC'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('12:35');
    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(0);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(35);
  });

  it('handles initial value', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          name: 'time-picker',
          initialValue: new Date('December 17, 1995 16:00:00'),
          twelveHoursFormat: true,
        },
      ],
    };

    render(<FormRenderer schema={schema} {...initialProps} />);

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('04:00');
    expect(screen.getByLabelText('open list of options', { selector: 'select' })).toHaveValue('PM');

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '03:00' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit.mock.calls[0][0]['time-picker'].getHours()).toEqual(15);
    expect(onSubmit.mock.calls[0][0]['time-picker'].getMinutes()).toEqual(0);
  });
});
