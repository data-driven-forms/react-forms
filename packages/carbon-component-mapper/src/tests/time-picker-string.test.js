import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import TimePicker from '../time-picker';

describe('TimePicker<String>', () => {
  let initialProps;
  let onSubmit;
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    await userEvent.type(screen.getByPlaceholderText('hh:mm'), '00:35');
    await userEvent.selectOptions(screen.getByLabelText('open list of options', { selector: 'select' }), screen.getByText('PM'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 PM' });

    onSubmit.mockReset();

    await userEvent.selectOptions(screen.getByLabelText('open list of options', { selector: 'select' }), screen.getByText('AM'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('00:35');
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    await userEvent.type(screen.getByPlaceholderText('hh:mm'), 'aa:BB');
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('aa:BB');
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '13:87' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('13:87');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '13:87' });
    onSubmit.mockReset();

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '25:16' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('25:16');
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '00:35' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));
    await userEvent.selectOptions(screen.getAllByLabelText('open list of options', { selector: 'select' })[1], screen.getByText('EST'));
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('00:35');
    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 AM EAST' });

    onSubmit.mockReset();

    await userEvent.selectOptions(screen.getAllByLabelText('open list of options', { selector: 'select' })[1], screen.getByText('UTC'));
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('00:35');
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

    render(<FormRenderer schema={schema} {...initialProps} />);

    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('12:57');

    fireEvent.focusIn(screen.getByPlaceholderText('hh:mm'));
    fireEvent.change(screen.getByPlaceholderText('hh:mm'), { target: { value: '00:35' } });
    fireEvent.focusOut(screen.getByPlaceholderText('hh:mm'));

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenLastCalledWith({ 'time-picker': '00:35 PM EAST' });
  });
});
