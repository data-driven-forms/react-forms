import React, { useEffect, useContext, Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import useField from '../../files/use-field';
import FormStateManager from '../../files/form-state-manager';
import FormManagerContext from '../../files/form-manager-context';

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
          <Field fieldSpy={fieldSpy} name="one" id="one" type="text" />
          <Field fieldSpy={fieldSpy} name="two" id="two" type="text" />
          <button type="submit">Submit</button>
        </form>
      );
    }}
  </FormStateManager>
);

describe('useField rendering cycle', () => {
  it('should render first field twice and second once', () => {
    const fieldSpy = jest.fn();
    const wrapper = mount(<TestSubject fieldSpy={fieldSpy} subscription={{}} />);
    /**
     * Initial mount render of both fields
     */
    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('two');
    fieldSpy.mockReset();
    /**
     * Change value of field#one twice which should trigger its render twice
     * Field#two should not render
     */
    act(() => {
      wrapper.find('input#one').prop('onChange')({ target: { value: 'foo', type: 'text' } });
    });
    act(() => {
      wrapper.find('input#one').prop('onChange')({ target: { value: 'bar', type: 'text' } });
    });
    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('one');
  });

  it('should render both fields when subscription {values: true} on change', () => {
    const fieldSpy = jest.fn();
    const wrapper = mount(<TestSubject fieldSpy={fieldSpy} subscription={{ values: true }} />);

    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('two');
    fieldSpy.mockReset();

    act(() => {
      wrapper.find('input#one').prop('onChange')({ target: { value: 'foo', type: 'text' } });
    });

    expect(fieldSpy).toHaveBeenCalledTimes(2);
    expect(fieldSpy.mock.calls[0][0]).toEqual('one');
    expect(fieldSpy.mock.calls[1][0]).toEqual('two');
  });

  describe('callable function rerender forms', () => {
    let Tester;
    let renderSpy;

    const Buttons = () => {
      const { formOptions } = useContext(FormManagerContext);

      return (
        <Fragment>
          <button id="initialize" onClick={() => formOptions.initialize({ one: 'changed' })} />
          <button id="reset" onClick={() => formOptions.reset()} />
          <button id="resetfieldstate" onClick={() => formOptions.resetFieldState('one')} />
          <button id="submit" type="submit" />
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
                <Field fieldSpy={renderSpy} name="one" id="one" type="text" />
                <Buttons />
              </form>
            );
          }}
        </FormStateManager>
      );
    });

    it('should rerender on initilize', async () => {
      const wrapper = mount(<Tester />);
      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('#initialize').simulate('click');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on resetFieldState', async () => {
      const wrapper = mount(<Tester />);
      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('input#one').prop('onChange')({ target: { value: 'foo', type: 'text' } });
      });
      wrapper.update();

      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('#resetfieldstate').simulate('click');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on reset', async () => {
      const wrapper = mount(<Tester />);

      await act(async () => {
        wrapper.find('input#one').prop('onChange')({ target: { value: 'foo', type: 'text' } });
      });
      wrapper.update();

      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('#reset').simulate('click');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
    });

    it('should rerender on focus & blur', async () => {
      const wrapper = mount(<Tester />);
      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('input#one').simulate('focus');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('input#one').simulate('focus');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(0);

      await act(async () => {
        wrapper.find('input#one').simulate('blur');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy.mock.calls[0][0]).toEqual('one');
      renderSpy.mockReset();

      await act(async () => {
        wrapper.find('input#one').simulate('blur');
      });
      wrapper.update();

      expect(renderSpy).toHaveBeenCalledTimes(0);
    });
  });
});
