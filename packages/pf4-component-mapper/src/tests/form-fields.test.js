import React from 'react';
import toJson from 'enzyme-to-json';
import { TextField, TextAreaField, CheckboxField, RadioField, SelectField, TimePickerField, DatePickerField, SwitchField } from '../form-fields/form-fields';
import { mount } from 'enzyme';

const FieldProvider = ({ render, ...props }) => <div>{ render({ input: { name: 'Foo', onChange: jest.fn() }, meta: { error: false, touched: false }, ...props }) }</div>;

describe('FormFields', () => {
  const props = {
    input: {
      name: 'Name of the field',
      value: '',
    },
    id: 'someIdKey',
    dataType: 'someDataType',
    meta: {
      error: false,
      touched: false,
    },
  };
  const propsWithOptions = {
    ...props,
    options: [{
      label: 'One',
      value: '1',
    },
    {
      label: 'Two',
      value: '2',
    },
    {
      label: 'Three',
      value: '3',
    }]};

  it('should render TextField correctly', () => {
    const wrapper = mount(
      <TextField { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField with description correctly', () => {
    const wrapper = mount(
      <TextField { ...props } description="This is description" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField without id correctly', () => {
    const wrapper = mount(
      <TextField { ...props } id={ undefined } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render touched TextField id correctly', () => {
    const wrapper = mount(
      <TextField { ...props } meta={{ touched: true, error: false }} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox correctly', () => {
    const wrapper = mount(
      <CheckboxField { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox with options correctly', () => {
    const wrapper = mount(
      <CheckboxField { ...propsWithOptions } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Checkbox with options correctly', () => {
    const wrapper = mount(
      <CheckboxField { ...propsWithOptions } FieldProvider={ FieldProvider } disabled={ true }/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextArea correctly', () => {
    const wrapper = mount(
      <TextAreaField { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled TextArea correctly', () => {
    const wrapper = mount(
      <TextAreaField { ...props } isDisabled={ true } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Radio correctly', () => {
    const wrapper = mount(
      <RadioField { ...propsWithOptions } FieldProvider={ FieldProvider }  />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Radio correctly', () => {
    const wrapper = mount(
      <RadioField { ...propsWithOptions } FieldProvider={ FieldProvider } disabled={ true } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Select correctly', () => {
    const wrapper = mount(
      <SelectField { ...propsWithOptions } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Select correctly', () => {
    const wrapper = mount(
      <SelectField { ...propsWithOptions } isDisabled={ true } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render DatePicker correctly', () => {
    const wrapper = mount(
      <DatePickerField { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TimePicker correctly', () => {
    const wrapper = mount(
      <TimePickerField { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } FieldProvider={ FieldProvider } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } isDisabled={ true } FieldProvider={ FieldProvider }/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <SwitchField { ...props } isDisabled={ true } FieldProvider={ FieldProvider }/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
