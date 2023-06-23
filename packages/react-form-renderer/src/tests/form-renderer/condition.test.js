import React, { useState } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../component-types';
import useFieldApi from '../../use-field-api';
import FormRenderer from '../../form-renderer';

import { reducer } from '../../condition';

const TextField = (props) => {
  const { input, placeholder } = useFieldApi(props);
  return <input aria-label={input.name} placeholder={placeholder} {...input} />;
};

describe('condition test', () => {
  let initialProps;
  let onSubmit;
  let schema;

  beforeEach(() => {
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

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  it('should render when condition is fulfill - when is a function', async () => {
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

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  it('should render when condition is fulfill - when is a function from action mapper', async () => {
    const whenSpy = jest.fn().mockImplementation(() => 'field-1');
    const actionMapper = {
      condition: () => [
        {
          when: whenSpy,
          is: 'show',
        },
      ],
    };

    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          actions: { condition: ['condition'] },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} actionMapper={actionMapper} />);

    expect(whenSpy.mock.calls[0][0]).toEqual({ component: 'text-field', name: 'field-2' });

    expect(() => screen.getByLabelText('field-2')).toThrow();

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont');

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

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

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

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

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

    expect(screen.getByLabelText('field-3')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

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

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont');

    expect(() => screen.getByLabelText('field-2')).toThrow();

    await userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'showdont',
      'field-2': 'someValue',
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Reset'));

    await act(async () => {
      jest.runAllTimers();
    });

    await userEvent.click(screen.getByText('Submit'));

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

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    await userEvent.click(screen.getByText('Submit'));
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

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(() => screen.getByLabelText('field-2')).toThrow();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont');

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

    await userEvent.type(screen.getByLabelText('field-1'), 'show'); // (show == show && '' == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'dont'); // (show == dontshow && '' == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-3'), 'show'); // (show == dontshow && show == show) = FALSE => TRUE

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('field-1'));
    await userEvent.type(screen.getByLabelText('field-1'), 'show'); // (show == show && show == show) = TRUE => FALSE

    expect(() => screen.getByLabelText('field-2')).toThrow();
  });

  it('should handle nested complex conditions', async () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'info.name.last',
          label: 'last name',
        },
        {
          component: 'text-field',
          name: 'info.name.father',
          label: 'Father name',
        },
        {
          component: 'text-field',
          name: 'info.name.equipment',
          label: 'Equipment name',
        },
        {
          component: 'text-field',
          name: 'info.occupation',
          label: 'occupation',
          condition: {
            sequence: [
              {
                and: [
                  {
                    or: [
                      { when: 'info.name.father', is: 'Charles' },
                      { when: 'info.name.equipment', is: 'Gun' },
                    ],
                  },
                  { when: 'info.name.last', is: 'Bond' },
                ],
                then: {
                  set: { 'info.occupation': 'SPY' },
                },
                else: { visible: true },
              },
            ],
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    await userEvent.type(screen.getByLabelText('info.name.last'), 'Bond');
    await userEvent.type(screen.getByLabelText('info.name.equipment'), 'Gun');

    await waitFor(() => expect(screen.getByLabelText('info.occupation')).toHaveValue('SPY'));
  });

  it('should change field with initial value only when form is modified', async () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field1',
          initialValue: 'B',
        },
        {
          component: 'text-field',
          name: 'field2',
          initialValue: 'schema initial value',
          clearOnUnmount: true,
          condition: {
            when: 'field1',
            is: 'B',
            then: { set: { field2: 'set with then' } },
            else: { set: { field2: 'set with else' } },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('field2')).toHaveValue('schema initial value');

    await userEvent.type(screen.getByLabelText('field2'), '+++');

    expect(screen.getByLabelText('field2')).toHaveValue('schema initial value+++');

    await userEvent.clear(screen.getByLabelText('field1'));
    await userEvent.type(screen.getByLabelText('field1'), 'A');
    await userEvent.clear(screen.getByLabelText('field1'));
    await userEvent.type(screen.getByLabelText('field1'), 'B');

    await waitFor(() => expect(screen.getByLabelText('field2')).toHaveValue('set with then'));
  });

  it('should change fields value by set funciton', async () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field1',
          label: 'field1',
        },
        {
          component: 'text-field',
          name: 'field2',
          label: 'field2',
          condition: {
            when: 'field1',
            is: 'foo',
            then: {
              set: (formState) => {
                return { field2: formState.values.field1 };
              },
            },
            else: { visible: true, set: {} },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);
    expect(screen.getByLabelText('field2')).toHaveValue('');

    await userEvent.type(screen.getByLabelText('field1'), 'foo');
    await waitFor(() => expect(screen.getByLabelText('field2')).toHaveValue('foo'));
  });

  it('check the set function received valid arguments', async () => {
    const setSpy = jest.fn();

    setSpy.mockImplementation(() => ({}));

    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field1',
          label: 'field1',
        },
        {
          component: 'text-field',
          name: 'field2',
          label: 'field2',
          condition: {
            when: 'field1',
            is: 'foo',
            then: {
              set: setSpy,
            },
            else: { visible: true, set: {} },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    await userEvent.type(screen.getByLabelText('field1'), 'foo');

    await waitFor(() => expect(setSpy).toHaveBeenCalledTimes(1));

    const expected = { active: 'field1', dirty: true };

    await waitFor(() => expect(setSpy).toHaveBeenCalledWith(expect.objectContaining(expected), expect.any(Function)));
  });

  it('check the object', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field1',
          label: 'field1',
        },
        {
          component: 'text-field',
          name: 'field2',
          label: 'field2',
          condition: {
            when: 'field1',
            is: 'foo',
            then: {
              set: (formState) => {
                return null;
              },
            },
            else: { visible: true, set: {} },
          },
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    await userEvent.type(screen.getByLabelText('field1'), 'foo');

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
      expect(console.error.mock.calls[0][0]).toContain('Received invalid setterValue. Expected object, received: ');
    });
  });

  it('check the getFieldState object', async () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'field1',
          label: 'field1',
        },
        {
          component: 'text-field',
          name: 'field2',
          label: 'field2',
          condition: {
            when: 'field1',
            is: 'foo',
            then: {
              set: (_formState, getFieldState) => {
                return { field2: getFieldState('field1').value };
              },
            },
            else: { visible: true, set: {} },
          },
        },
      ],
    };
    render(<FormRenderer {...initialProps} schema={schema} />);

    await userEvent.type(screen.getByLabelText('field1'), 'foo');

    await waitFor(() => {
      expect(screen.getByLabelText('field2')).toHaveValue('foo');
    });
  });

  it('should be possible to change props to component with condition', async () => {
    const Dummy = () => {
      const [conditionalField, setConditionalField] = useState({
        component: componentTypes.TEXT_FIELD,
        name: 'field-2',
        condition: [
          {
            when: 'field-1',
            is: 'show',
          },
        ],
      });

      const onButton = () =>
        setConditionalField({
          ...conditionalField,
          placeholder: 'Changed placeholder',
        });

      return (
        <React.Fragment>
          <button type="button" onClick={onButton}>
            Change field
          </button>
          <FormRenderer
            {...initialProps}
            schema={{
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'field-1',
                },
                conditionalField,
              ],
            }}
          />
        </React.Fragment>
      );
    };

    render(<Dummy />);

    expect(screen.queryByLabelText('field-2')).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('field-1'), 'show');

    expect(screen.getByLabelText('field-2')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Changed placeholder')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Change field'));

    expect(screen.getByPlaceholderText('Changed placeholder')).toBeInTheDocument();
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
