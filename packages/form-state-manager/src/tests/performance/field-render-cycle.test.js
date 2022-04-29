import React, { useEffect, useContext, Fragment } from 'react';
import { act, render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useField from '../../use-field';
import FormStateManager from '../../form-state-manager';
import FormManagerContext from '../../form-manager-context';

const Field = ({ fieldSpy, ...props }) => {
  const { input, id, ...rest } = useField(props);
  useEffect(() => {
    fieldSpy(input.name);
  });
  return <input id={id} {...input} {...rest} />;
};

const TestSubject = ({ fieldSpy, subscription }) => (
  <FormStateManager onSubmit={jest.fn()} subscription={subscription}>
    {() => {
      return (
        <form onSubmit={jest.fn()}>
          <Field fieldSpy={fieldSpy} name="one" id="one" type="text" placeholder="one" />
          <Field fieldSpy={fieldSpy} name="two" id="two" type="text" placeholder="two" />
          <button type="submit">Submit</button>
        </form>
      );
    }}
  </FormStateManager>
);

describe('useField rendering cycle', () => {
  it('should render first field twice and second once', async () => {
    const fieldSpy = jest.fn();
    rtlRender(<TestSubject fieldSpy={fieldSpy} subscription={{}} />);
    /**
     * Initial rtlRender render of both fields
     */
    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('two');
    fieldSpy.mockReset();
    /**
     * Change value of field#one twice which should trigger its render twice
     * Field#two should not render
     */

    await userEvent.type(screen.getByPlaceholderText('one'), 'foo');
    await userEvent.type(screen.getByPlaceholderText('one'), 'bar');

    expect(fieldSpy).toHaveBeenCalledTimes(7);
    expect(fieldSpy.mock.calls.every(([name]) => name === 'one')).toBeTruthy();
  });

  it('should render both fields when subscription {values: true} on change', async () => {
    const fieldSpy = jest.fn();
    rtlRender(<TestSubject fieldSpy={fieldSpy} subscription={{ values: true }} />);

    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('two');
    fieldSpy.mockReset();

    await userEvent.type(screen.getByPlaceholderText('one'), 'foo');

    expect(fieldSpy).toHaveBeenCalledTimes(7);
    expect(fieldSpy.mock.calls.map(([name]) => name)).toEqual(['one', 'one', 'two', 'one', 'two', 'one', 'two']);
  });

  describe('callable function rerender forms', () => {
    let Tester;
    let renderSpy;

    const Buttons = () => {
      const { formOptions } = useContext(FormManagerContext);

      return (
        <Fragment>
          <button type="button" id="initialize" onClick={() => formOptions.initialize({ one: 'changed' })}>
            initialize
          </button>
          <button type="button" id="reset" onClick={() => formOptions.reset()}>
            reset
          </button>
          <button type="button" id="resetfieldstate" onClick={() => formOptions.resetFieldState('one')}>
            resetfieldstate
          </button>
          <button id="submit" type="submit">
            submit
          </button>
        </Fragment>
      );
    };

    beforeEach(() => {
      renderSpy = jest.fn();

      Tester = ({ subscription }) => (
        <FormStateManager onSubmit={jest.fn()} subscription={subscription}>
          {() => {
            return (
              <form onSubmit={jest.fn()}>
                <Field fieldSpy={renderSpy} name="one" id="one" type="text" placeholder="one" />
                <Buttons />
              </form>
            );
          }}
        </FormStateManager>
      );
    });

    it('should rerender on initilize', async () => {
      rtlRender(<Tester />);
      renderSpy.mockReset();

      await userEvent.click(screen.getByText('initialize'));

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on resetFieldState', async () => {
      rtlRender(<Tester />);
      renderSpy.mockReset();

      await userEvent.type(screen.getByPlaceholderText('one'), 'foo');
      await act(async () => {
        screen.getByPlaceholderText('one').blur();
      });

      renderSpy.mockReset();

      await userEvent.click(screen.getByText('resetfieldstate'));

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on reset', async () => {
      rtlRender(<Tester />);

      await userEvent.type(screen.getByPlaceholderText('one'), 'foo');
      await act(async () => {
        screen.getByPlaceholderText('one').blur();
      });

      renderSpy.mockReset();

      await userEvent.click(screen.getByText('reset'));

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on focus & blur', async () => {
      rtlRender(<Tester />);
      renderSpy.mockReset();

      await act(async () => {
        screen.getByPlaceholderText('one').focus();
      });

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
      renderSpy.mockReset();

      await act(async () => {
        screen.getByPlaceholderText('one').focus();
      });

      expect(renderSpy).toHaveBeenCalledTimes(0);

      await act(async () => {
        screen.getByPlaceholderText('one').blur();
      });

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
      renderSpy.mockReset();

      await act(async () => {
        screen.getByPlaceholderText('one').blur();
      });

      expect(renderSpy).toHaveBeenCalledTimes(0);
    });
  });
});
