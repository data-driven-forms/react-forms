import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import Select from '../../select/select/select';
import FormTemplate from '../../form-template';
import componentMapper from '../../component-mapper';

describe('<Select />', () => {
  let initialProps;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
    initialProps = {
      onChange,
      name: 'test-select',
      id: 'select',
      options: [
        {
          label: 'First option',
          value: 1,
        },
        {
          label: 'Second option',
          value: 2,
        },
      ],
    };
  });

  it('should render translated option in value container', async () => {
    render(
      <FormRenderer
        onSubmit={jest.fn}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={{
          fields: [
            {
              component: componentTypes.SELECT,
              name: 'select',
              options: [
                {
                  label: <h1>Translated</h1>,
                  value: 'translated',
                },
              ],
            },
          ],
        }}
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));
    await userEvent.click(screen.getByText('Translated'));

    expect(screen.getByText('Translated', { selector: 'h1' }).closest('.pf-v5-c-select__toggle-text')).toBeInTheDocument();
  });

  it('should render description', async () => {
    render(
      <FormRenderer
        onSubmit={jest.fn}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={{
          fields: [
            {
              component: componentTypes.SELECT,
              name: 'select',
              options: [
                {
                  label: <h1>Translated</h1>,
                  value: 'translated',
                  description: 'some description',
                },
              ],
            },
          ],
        }}
      />
    );

    expect(() => screen.getByText('some description')).toThrow();

    await userEvent.click(screen.getByLabelText('open menu'));

    expect(screen.getByText('some description')).toBeInTheDocument();
  });

  it('should render groups and dividers', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <FormRenderer
        onSubmit={(values) => onSubmit(values)}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={{
          fields: [
            {
              component: 'select',
              name: 'select-with-categories',
              label: 'With categories',
              options: [
                {
                  label: 'Category 1',
                  options: [
                    { label: 'value 1', value: '111' },
                    { label: 'value 2', value: '222' },
                  ],
                },
                { divider: true },
                { label: 'independent 1', value: '1112333' },
                { divider: true },
                {
                  label: 'Category 2',
                  options: [
                    { label: 'value 3', value: '333' },
                    { label: 'value 4', value: '444' },
                  ],
                },
                { divider: true },
                { label: 'independent 2', value: '11111' },
              ],
            },
          ],
        }}
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));

    expect(screen.getByText('Category 1')).toHaveClass('pf-v5-c-select__menu-group-title');
    expect(screen.getByText('Category 2')).toHaveClass('pf-v5-c-select__menu-group-title');
    expect(container.getElementsByClassName('pf-v5-c-divider')).toHaveLength(3);
    expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual([
      'value 1',
      'value 2',
      'independent 1',
      'value 3',
      'value 4',
      'independent 2',
    ]);

    await userEvent.click(screen.getByText('value 1'));

    await userEvent.click(screen.getByLabelText('open menu'));

    expect(screen.getByText('value 1', { selector: 'button.pf-v5-c-select__menu-item' })).toHaveClass('pf-m-selected');

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ 'select-with-categories': '111' });
  });

  it('filters with nested options', async () => {
    const { container } = render(
      <FormRenderer
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={{
          fields: [
            {
              component: 'select',
              name: 'select-with-categories',
              label: 'With categories',
              isSearchable: true,
              options: [
                {
                  label: 'Category 1',
                  options: [
                    { label: 'value 1', value: '111' },
                    { label: 'value 2', value: '222' },
                  ],
                },
                { divider: true },
                { label: 'independent 1', value: '1112333' },
                { divider: true },
                {
                  label: 'Category 2',
                  options: [
                    { label: 'value 3', value: '333' },
                    { label: 'value 4', value: '444' },
                  ],
                },
                { divider: true },
                { label: 'independent 2', value: '11111' },
              ],
            },
          ],
        }}
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));

    await userEvent.type(screen.getByPlaceholderText('Choose...'), 'value');
    expect(screen.getByText('Category 1')).toHaveClass('pf-v5-c-select__menu-group-title');
    expect(screen.getByText('Category 2')).toHaveClass('pf-v5-c-select__menu-group-title');
    expect(container.getElementsByClassName('pf-v5-c-divider')).toHaveLength(0);

    expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual([
      'value 1',
      'value 2',
      'value 3',
      'value 4',
    ]);

    await userEvent.clear(screen.getByPlaceholderText('Choose...'));
    await userEvent.type(screen.getByPlaceholderText('Choose...'), 'independent');
    expect(container.getElementsByClassName('pf-v5-c-divider')).toHaveLength(0);
    expect(container.getElementsByClassName('pf-v5-c-select__menu-group-title')).toHaveLength(0);

    expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual([
      'independent 1',
      'independent 2',
    ]);
  });

  it('should return single simple value', async () => {
    render(<Select {...initialProps} />);

    await userEvent.click(screen.getByLabelText('open menu'));
    await userEvent.click(screen.getByText('First option'));

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should return single object value', async () => {
    render(<Select {...initialProps} simpleValue={false} />);

    await userEvent.click(screen.getByLabelText('open menu'));
    await userEvent.click(screen.getByText('First option'));

    expect(onChange).toHaveBeenCalledWith({ ...initialProps.options[0] });
  });

  it('should return multiple simple values', async () => {
    const onChange = jest.fn();
    // simulate first return value in state
    const value = [1];
    render(<Select {...initialProps} value={value} isMulti onChange={onChange} closeMenuOnSelect={false} />);

    await userEvent.click(screen.getByLabelText('open menu'));
    await userEvent.click(screen.getByText('First option', { selector: '.pf-v5-c-select__menu-item' }));
    await userEvent.click(screen.getByText('Second option'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([1, 2]);
  });

  it('should return multiple object values', async () => {
    const onChange = jest.fn();
    // simulate first return value in state
    const value = [{ ...initialProps.options[0] }];
    render(<Select {...initialProps} value={value} simpleValue={false} isMulti onChange={onChange} closeMenuOnSelect={false} />);

    await userEvent.click(screen.getByLabelText('open menu'));
    await userEvent.click(screen.getByText('First option', { selector: '.pf-v5-c-select__menu-item' }));
    await userEvent.click(screen.getByText('Second option'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([...initialProps.options]);
  });

  it('should expand and close multi value chips', async () => {
    const value = [1, 2, 3, 4];
    const options = [
      ...initialProps.options,
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
    ];
    const { container } = render(<Select {...initialProps} options={options} value={value} isMulti closeMenuOnSelect={false} />);

    expect(container.querySelectorAll('.pf-v5-c-chip-group')).toHaveLength(1);
    expect(container.querySelectorAll('div.pf-v5-c-chip')).toHaveLength(3);

    await userEvent.click(screen.getByText('1 more'));

    expect(container.querySelectorAll('div.pf-v5-c-chip')).toHaveLength(4);
  });

  it('should call on change when removing chip', async () => {
    const value = [1, 2];
    render(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    await userEvent.click(screen.getAllByLabelText('remove option')[0]);

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('should load single select Async options correctly', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '3' }]));

    render(<Select {...initialProps} options={undefined} loadOptions={asyncLoading} />);

    await userEvent.click(screen.getByLabelText('open menu'));
    await waitFor(() => expect(screen.getByText('label')).toBeInTheDocument());
  });

  it('should load multi select Async options correctly and set initial value to undefined', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();

    render(
      <Select
        {...initialProps}
        value={['does not exists in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));
    await waitFor(() => expect(screen.getByText('label')).toBeInTheDocument());

    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('should load multi select Async options correctly and set initial value to ["123"]', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();

    render(
      <Select
        {...initialProps}
        value={['123', 'Not in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));
    await waitFor(() => expect(screen.getByText('label', { selector: '.pf-v5-c-select__menu-item' })).toBeInTheDocument());

    expect(onChange).toHaveBeenCalledWith(['123']);
  });

  it('should load multi select Async options correctly and set initial value to ["123"] if initial value is an object', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();

    render(
      <Select
        {...initialProps}
        value={[{ value: '123', label: 'label' }, 'Not in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    await userEvent.click(screen.getByLabelText('open menu'));
    await waitFor(() => expect(screen.getByText('label', { selector: '.pf-v5-c-select__menu-item' })).toBeInTheDocument());

    expect(onChange).toHaveBeenCalledWith([{ label: 'label', value: '123' }]);
  });

  it('should load Async options after filtering', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: 1 }]));

    render(<Select {...initialProps} isSearchable={true} options={undefined} loadOptions={asyncLoading} />);

    expect(asyncLoading.mock.calls).toHaveLength(1);

    await userEvent.click(screen.getByLabelText('open menu'));
    await waitFor(() => expect(screen.getByText('label')).toBeInTheDocument());

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Choose...'), { target: { value: 'foo' } });
    });

    expect(asyncLoading.mock.calls).toHaveLength(2);
    expect(asyncLoading.mock.calls[1]).toEqual(['foo']);

    await waitFor(() => () => expect(screen.getByText('label')).toThrow());
  });

  describe('reloading props', () => {
    const NEW_OPTIONS = [{ label: 'Different label', value: 2 }];
    let asyncLoading;
    let asyncLoadingNew;

    beforeEach(() => {
      asyncLoading = () => Promise.resolve(initialProps.options);
      asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);
    });

    it('should change the options when options prop is changed', async () => {
      const { container, rerender } = render(<Select {...initialProps} />);

      await userEvent.click(screen.getByLabelText('open menu'));

      expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual(
        initialProps.options.map((opt) => opt.label)
      );

      rerender(<Select {...initialProps} options={NEW_OPTIONS} />);

      expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual(
        NEW_OPTIONS.map((opt) => opt.label)
      );
    });

    it('should change the options when loadOptions prop is changed', async () => {
      const { container, rerender } = render(<Select {...initialProps} loadOptions={asyncLoading} />);

      await userEvent.click(screen.getByLabelText('open menu'));

      expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual(
        initialProps.options.map((opt) => opt.label)
      );

      await act(async () => {
        rerender(<Select {...initialProps} loadOptions={asyncLoadingNew} />);
      });

      expect([...container.getElementsByClassName('pf-v5-c-select__menu-item')].map((opt) => opt.textContent)).toEqual(
        NEW_OPTIONS.map((opt) => opt.label)
      );
    });

    it('should change the value when new options do not include it', async () => {
      const { rerender } = render(<Select {...initialProps} value={1} />);

      rerender(<Select {...initialProps} value={1} options={NEW_OPTIONS} />);

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('not should change the value when new options include it', async () => {
      const { rerender } = render(<Select {...initialProps} value={2} />);

      rerender(<Select {...initialProps} value={2} options={NEW_OPTIONS} />);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', async () => {
      let screen;

      await act(async () => {
        screen = render(<Select {...initialProps} loadOptions={asyncLoading} value={1} />);
      });

      await act(async () => {
        screen.rerender(<Select {...initialProps} value={1} loadOptions={asyncLoadingNew} />);
      });

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('should not reset the value when loadOptions prop is changed and new options includes the value', async () => {
      let screen;

      await act(async () => {
        screen = render(<Select {...initialProps} loadOptions={asyncLoading} value={2} />);
      });

      await act(async () => {
        screen.rerender(<Select {...initialProps} value={2} loadOptions={asyncLoadingNew} />);
      });

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
