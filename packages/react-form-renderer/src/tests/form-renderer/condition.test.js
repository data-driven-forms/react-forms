import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../component-types';
import useFieldApi from '../../use-field-api';
import FormRenderer from '../../form-renderer';

import { reducer } from '../../condition';

const TextField = (props) => {
  const { input } = useFieldApi(props);
  return <input aria-label={input.name} {...input} />;
};

describe('condition test', () => {
  let initialProps;
  let onSubmit;
  let schema;

  beforeEach(() => {
    jest.useFakeTimers();

    onSubmit = jest.fn();

    initialProps = {
      FormTemplate,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: TextField,
      },
      onSubmit: (values) => onSubmit(values),
    };
  });

  it('should render when condition is fulfill', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              when: 'field-1',
              is: 'show',
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  it('should render when condition is fulfill - when is a function', () => {
    const whenSpy = jest.fn().mockImplementation(() => 'field-1');
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              when: whenSpy,
              is: 'show',
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(whenSpy.mock.calls[0][0]).toEqual({ component: 'text-field', name: 'field-2' });

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  it('sets value when condition is fulfill', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
      ],
    };
    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.type(screen.getByLabelText('field-1'), 'show');

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
    });
  });

  it('sets value when condition is fulfill - initialValues', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} initialValues={{ 'field-1': 'show' }} />);

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
    });
  });

  it('should not override initial value with setter value', async () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field-1',
          label: 'first name',
        },
        {
          component: 'text-field',
          name: 'field-2',
          label: 'last name',
        },
        {
          component: 'text-field',
          name: 'field-3',
          label: 'occupation',
          condition: {
            sequence: [
              {
                and: [
                  { when: 'field-1', is: 'james' },
                  { when: 'field-2', is: 'bond' },
                ],
                then: { set: { 'field-3': 'SPY' } },
                else: { visible: true },
              },
              {
                and: [
                  { when: 'field-1', is: 'steve' },
                  { when: 'field-2', is: 'jobs' },
                ],
                then: { set: { 'field-3': 'CEO' } },
                else: { visible: true },
              },
            ],
          },
        },
      ],
    };

    render(
      <FormRenderer
        {...initialProps}
        schema={schema}
        initialValues={{
          'field-1': 'steve',
          'field-2': 'jobs',
          'field-3': 'RETIRED',
        }}
      />
    );

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByLabelText('field-3')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(10);
    });

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'steve',
      'field-2': 'jobs',
      'field-3': 'RETIRED',
    });
  });

  it('sets value when condition is fulfill on reset', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} initialValues={{ 'field-1': 'show' }} />);

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'dont');

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'showdont',
      'field-2': 'someValue',
    });
    onSubmit.mockClear();

    userEvent.click(screen.getByText('Reset'));

    await act(async () => {
      jest.runAllTimers();
    });

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
    });
  });

  it('sets value when condition is fulfill - sequence', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            sequence: [
              {
                when: 'field-1',
                is: 'show',
                then: {
                  set: {
                    'field-2': 'someValue',
                    'field-3': 'someValue3',
                  },
                },
              },
              {
                when: 'field-1',
                is: 'not',
                then: {
                  set: {
                    'field-4': 'someValue4',
                  },
                },
              },
              {
                when: 'field-1',
                is: 'show',
                then: {
                  set: {
                    'field-5': 'someValuu5',
                  },
                },
              },
            ],
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.type(screen.getByLabelText('field-1'), 'show');

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
      'field-3': 'someValue3',
      'field-5': 'someValuu5',
    });
  });

  it('should render when condition is fulfill - not', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              not: {
                when: 'field-1',
                is: 'show',
              },
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(() => screen.getByLabelText('field-2')).toThrow();

    userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();
  });

  it('should render when condition is fulfill - not - array', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-3',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              not: [
                {
                  when: 'field-1',
                  is: 'show',
                },
                {
                  when: 'field-3',
                  is: 'show',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'show'); // (show == show && '' == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), 'dont'); // (show == dontshow && '' == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-3'), 'show'); // (show == dontshow && show == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('field-1'), '{selectall}{backspace}show'); // (show == show && show == show) = TRUE => FALSE

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  describe('reducer', () => {
    it('returns default', () => {
      const initialState = {
        a: 'bb',
      };

      expect(reducer(initialState, { type: 'nonsesne' })).toEqual(initialState);
    });
  });
});
