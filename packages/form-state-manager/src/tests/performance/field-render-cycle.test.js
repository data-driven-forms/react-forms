import React, { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import useField from '../../files/use-field';
import FormStateManager from '../../files/form-state-manager';

const Field = ({ fieldSpy, ...props }) => {
  const { input, id, ...rest } = useField(props);
  useEffect(() => {
    fieldSpy(input.name);
  });
  return <input id={id} {...input} {...rest} />;
};

const TestSubject = ({ fieldSpy }) => (
  <FormStateManager onSubmit={jest.fn()}>
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
    const wrapper = mount(<TestSubject fieldSpy={fieldSpy} />);
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
});
