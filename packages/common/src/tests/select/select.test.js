/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cloneDeep from 'lodash/cloneDeep';

import { useFieldApi, FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import Select from '../../select';
import reducer from '../../use-select/reducer';

describe('Select test', () => {
  let state;
  let inputValue;
  let field;

  const DummySelect = (props) => {
    const { onChange, onInputChange, noOptionsMessage, name, checked, onBlur, onFocus, meta, ...rest } = props;

    state = rest;

    const selected = rest.value || [];

    const handleSingle = (option) => onChange(selected.value === option.value ? undefined : option);

    const handleMulti = (option) =>
      onChange(
        selected.map(({ value }) => value).includes(option.value) ? selected.filter(({ value }) => value !== option.value) : [...selected, option]
      );

    return (
      <div>
        <input type="text" aria-label="onInputChange" onChange={(e) => onInputChange(e.target.value)} />
        {rest.options.map(({ value, label, ...rest }, index) => (
          <button
            key={`${value}-${index}`}
            onClick={() => (props.isMulti ? handleMulti({ value, label, ...rest }) : handleSingle({ value, label, ...rest }))}
          >
            {label}
          </button>
        ))}
        <button onClick={() => onChange()}>Clear all</button>
        <div id="noOptionsMessage">{noOptionsMessage()}</div>
      </div>
    );
  };

  const WrapperSelect = (props) => {
    const { input, ...rest } = useFieldApi(props);

    inputValue = input.value;

    return <Select {...input} {...rest} SelectComponent={DummySelect} />;
  };

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: ({ formFields }) => formFields,
    componentMapper: { [componentTypes.SELECT]: WrapperSelect },
  };

  beforeEach(() => {
    state = undefined;
    inputValue = undefined;
    field = {
      className: 'current-select',
      classNamePrefix: 'classname-prefix',
      customProp: '123',
      noOptionsMessage: 'No options',
      options: [
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
        { label: 'Hamsters', value: 'h' },
      ],
    };
  });

  describe('single select', () => {
    it('renders correctly', async () => {
      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(state).toEqual({
        className: 'current-select',
        classNamePrefix: 'classname-prefix',
        closeMenuOnSelect: true,
        customProp: '123',
        hideSelectedOptions: false,
        isClearable: false,
        isDisabled: undefined,
        isFetching: false,
        isMulti: undefined,
        isSearchable: false,
        options: [
          { label: 'Dogs', value: 'd' },
          { label: 'Cats', value: 'c' },
          { label: 'Hamsters', value: 'h' },
        ],
        placeholder: 'Choose...',
        value: [],
      });
      expect(screen.getByText('No options')).toBeInTheDocument();
    });

    it('selects value', async () => {
      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      await userEvent.click(screen.getByText('Dogs'));

      expect(state.value).toEqual([{ label: 'Dogs', value: 'd' }]);
      expect(inputValue).toEqual('d');

      await userEvent.click(screen.getByText('Cats'));

      expect(state.value).toEqual([{ label: 'Cats', value: 'c' }]);
      expect(inputValue).toEqual('c');
    });

    it('change options and value is not in', async () => {
      const { rerender } = render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                initialValue: 'c',
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(inputValue).toEqual('c');

      rerender(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                options: [{ label: 'new cats', value: 'cc' }],
                initialValue: 'c',
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(inputValue).toEqual('');
    });

    it('change options and value is not in but keep it', async () => {
      const { rerender } = render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                noValueUpdates: true,
                initialValue: 'c',
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(inputValue).toEqual('c');
      rerender(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                noValueUpdates: true,
                options: [{ label: 'new cats', value: 'cc' }],
                initialValue: 'c',
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );
      expect(inputValue).toEqual('c');
    });
  });

  describe('multi select', () => {
    it('renders correctly', async () => {
      field = { ...field, isMulti: true };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(state).toEqual({
        className: 'current-select',
        classNamePrefix: 'classname-prefix',
        closeMenuOnSelect: false,
        customProp: '123',
        hideSelectedOptions: false,
        isClearable: false,
        isDisabled: undefined,
        isFetching: false,
        isMulti: true,
        isSearchable: false,
        options: [
          { label: 'Dogs', value: 'd' },
          { label: 'Cats', value: 'c' },
          { label: 'Hamsters', value: 'h' },
        ],
        placeholder: 'Choose...',
        value: [],
      });
    });

    it('selects value', async () => {
      field = { ...field, isMulti: true };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      await userEvent.click(screen.getByText('Dogs'));
      await userEvent.click(screen.getByText('Cats'));

      expect(state.value).toEqual([
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
      ]);
      expect(inputValue).toEqual(['d', 'c']);
    });

    it('selects null value - clears selection', async () => {
      field = { ...field, isMulti: true };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );
      await userEvent.click(screen.getByText('Dogs'));
      await userEvent.click(screen.getByText('Cats'));

      expect(state.value).toEqual([
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
      ]);
      expect(inputValue).toEqual(['d', 'c']);

      await userEvent.click(screen.getByText('Clear all'));

      expect(state.value).toEqual([]);
      expect(inputValue).toEqual([]);
    });

    it('selects all values', async () => {
      field = { ...field, isMulti: true, options: [{ label: 'Select all', selectAll: true }, ...field.options] };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      await userEvent.click(screen.getByText('Select all'));

      expect(state.value).toEqual([
        { label: 'Select all', selectAll: true },
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
        { label: 'Hamsters', value: 'h' },
      ]);
      expect(inputValue).toEqual(['d', 'c', 'h']);

      await userEvent.click(screen.getByText('Hamsters'));

      expect(state.value).toEqual([
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
      ]);
      expect(inputValue).toEqual(['d', 'c']);
    });

    it('selects none', async () => {
      field = { ...field, isMulti: true, options: [{ label: 'Select none', selectNone: true }, ...field.options], initialValue: ['d', 'c', 'h'] };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      await userEvent.click(screen.getByText('Select none'));

      expect(state.value).toEqual([{ label: 'Select none', selectNone: true }]);
      expect(inputValue).toEqual('');

      await userEvent.click(screen.getByText('Dogs'));

      expect(state.value).toEqual([{ label: 'Dogs', value: 'd' }]);
      expect(inputValue).toEqual(['d']);
    });

    it('with select all and select none at that same time', async () => {
      field = {
        ...field,
        isMulti: true,
        options: [
          { label: 'Select all', selectAll: true, value: 'select-all' },
          { label: 'Select none', selectNone: true, value: 'select-none' },
          ...field.options,
        ],
      };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );
      await userEvent.click(screen.getByText('Select all'));

      expect(state.value).toEqual([
        { label: 'Select all', selectAll: true, value: 'select-all' },
        { label: 'Dogs', value: 'd' },
        { label: 'Cats', value: 'c' },
        { label: 'Hamsters', value: 'h' },
      ]);
      expect(inputValue).toEqual(['d', 'c', 'h']);

      await userEvent.click(screen.getByText('Select none'));

      expect(state.value).toEqual([{ label: 'Select none', selectNone: true, value: 'select-none' }]);
      expect(inputValue).toEqual([]);
    });
  });

  describe('loadOptions', () => {
    it('loads initial options', async () => {
      jest.useFakeTimers();

      const loadOptions = jest.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => {
              return resolve([
                { value: '111', label: 'first' },
                { value: '222', label: 'second' },
              ]);
            }, 1)
          )
      );

      field = { ...field, loadOptions, options: [] };

      render(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                ...field,
                component: componentTypes.SELECT,
                name: 'select',
              },
            ],
          }}
        />
      );

      expect(state).toEqual({
        className: 'current-select',
        classNamePrefix: 'classname-prefix',
        customProp: '123',
        isClearable: false,
        isDisabled: true,
        isFetching: true,
        isSearchable: false,
        loadingMessage: undefined,
        options: [],
        placeholder: 'Choose...',
        isMulti: undefined,
        value: [],
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(state).toEqual({
        className: 'current-select',
        classNamePrefix: 'classname-prefix',
        closeMenuOnSelect: true,
        customProp: '123',
        hideSelectedOptions: false,
        isClearable: false,
        isDisabled: undefined,
        isFetching: false,
        isMulti: undefined,
        isSearchable: false,
        options: [
          { label: 'first', value: '111' },
          { label: 'second', value: '222' },
        ],
        placeholder: 'Choose...',
        value: [],
      });

      jest.useRealTimers();
    });

    it('initial value is object', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: { value: '111' }, label: 'first' },
          { value: { value: '1111' }, label: 'second' },
        ])
      );
      field = { ...field, loadOptions, options: [] };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  isMulti: true,
                  isSearchable: true,
                  isClearable: true,
                  initialValue: [{ value: { value: '111' }, label: 'first' }],
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(inputValue).toEqual([{ value: { value: '111' }, label: 'first' }]);
    });

    describe('options compareValues', () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: { value: '111' }, label: 'first' },
          { value: { value: '1111' }, label: 'second' },
          { value: { value: '3' }, label: 'third' },
        ])
      );

      const customCompareField = {
        ...field,
        component: componentTypes.SELECT,
        name: 'select',
        loadOptions,
        options: [],
        isMulti: true,
        isSearchable: true,
        isClearable: true,
      };

      it('custom function compares options with object value', async () => {
        await act(async () => {
          render(
            <FormRenderer
              {...rendererProps}
              schema={{
                fields: [
                  {
                    ...customCompareField,
                    compareValues: (a, b) => {
                      return a.value.value === b.value.value;
                    },
                    initialValue: [{ value: { value: '111' }, label: 'first' }],
                  },
                ],
              }}
            />
          );
        });

        expect(inputValue).toEqual([{ value: { value: '111' }, label: 'first' }]);
      });

      it('default function compares options with object value', async () => {
        await act(async () => {
          render(
            <FormRenderer
              {...rendererProps}
              schema={{
                fields: [
                  {
                    ...customCompareField,
                    initialValue: [{ value: { value: '111' }, label: 'first' }],
                  },
                ],
              }}
            />
          );
        });

        expect(inputValue).toEqual([{ value: { value: '111' }, label: 'first' }]);
      });

      it('default function logs an error for highly nested values ', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => undefined);
        const nestedOptions = {
          label: 'Nested',
          value: {
            value: {
              value: {
                value: {
                  value: {
                    value: 'foo',
                  },
                },
              },
            },
          },
        };
        const loadOptions = jest.fn().mockImplementation(() => Promise.resolve([{ ...nestedOptions }]));
        await act(async () => {
          render(
            <FormRenderer
              {...rendererProps}
              schema={{
                fields: [
                  {
                    ...customCompareField,
                    loadOptions,
                    initialValue: [cloneDeep(nestedOptions)],
                  },
                ],
              }}
            />
          );
        });

        // Console error should be triggered for large object depth
        expect(consoleSpy).toHaveBeenCalledWith('Recursion limit of 5 has been exceeded.');
        // Should have no value because he options are not matched if the depth limit was exceeded
        expect(inputValue).toEqual('');

        consoleSpy.mockReset();
      });
    });

    it('initial values are not in options', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [] };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: '333',
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(inputValue).toEqual('');
    });

    it('initial values is not partially in options is multi', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [], isMulti: true };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: ['333', '111'],
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(inputValue).toEqual(['111']);
    });

    it('initial values is not in options is multi', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [], isMulti: true };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: ['333'],
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(inputValue).toEqual('');
    });

    it('initial values is not in options but should stay', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [], noValueUpdates: true };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: '333',
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(inputValue).toEqual('333');
    });

    it('filters', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [], isSearchable: true };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      loadOptions.mockClear();

      await act(async () => {
        fireEvent.change(screen.getByLabelText('onInputChange'), { target: { value: 'search term' } });
      });

      expect(loadOptions).toHaveBeenCalledWith('search term');
    });

    it('filters with error', async () => {
      const tmpCon = console.error;
      console.error = jest.fn();

      const loadOptions = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve([
            { value: '111', label: 'first' },
            { value: '222', label: 'second' },
          ])
        )
        .mockImplementation(() => Promise.reject('error'));

      field = { ...field, loadOptions, options: [], isSearchable: true };

      await act(async () => {
        render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      loadOptions.mockClear();

      await act(async () => {
        fireEvent.change(screen.getByLabelText('onInputChange'), { target: { value: 'search term' } });
      });

      expect(loadOptions).toHaveBeenCalledWith('search term');
      expect(console.error).toHaveBeenCalledWith('error');

      console.error = tmpCon;
    });

    it('should refresh options when loadOptions function changed', async () => {
      const loadOptions = jest.fn().mockImplementation(() =>
        Promise.resolve([
          { value: '111', label: 'first' },
          { value: '222', label: 'second' },
        ])
      );

      field = { ...field, loadOptions, options: [], isMulti: true };

      let select;

      await act(async () => {
        select = render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: ['333'],
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(state.options).toEqual([
        { label: 'first', value: '111' },
        { label: 'second', value: '222' },
      ]);

      await act(async () => {
        select.rerender(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  loadOptions: () => Promise.resolve([{ label: 'new option', value: 'new' }]),
                  options: [],
                  isMulti: true,
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(state.options).toEqual([{ label: 'new option', value: 'new' }]);
    });

    it('should refresh options when loadOptionsChangeCounter function changed', async () => {
      let options = [
        { label: 'first', value: '111' },
        { label: 'second', value: '222' },
      ];
      const loadOptions = () => Promise.resolve(options);

      field = { ...field, loadOptions, options: [], isMulti: true };

      let select;

      await act(async () => {
        select = render(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  initialValue: ['333'],
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(state.options).toEqual([
        { label: 'first', value: '111' },
        { label: 'second', value: '222' },
      ]);

      options = [{ label: 'new option', value: 'new' }];

      await act(async () => {
        select.rerender(
          <FormRenderer
            {...rendererProps}
            schema={{
              fields: [
                {
                  ...field,
                  loadOptions,
                  options: [],
                  isMulti: true,
                  loadOptionsChangeCounter: 1,
                  component: componentTypes.SELECT,
                  name: 'select',
                },
              ],
            }}
          />
        );
      });

      expect(state.options).toEqual([{ label: 'new option', value: 'new' }]);
    });
  });

  describe('reducer', () => {
    it('default', () => {
      expect(reducer({ initialState: true }, { type: 'default' })).toEqual({
        initialState: true,
      });
    });
  });
});
