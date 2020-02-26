import React from 'react';
import toJson from 'enzyme-to-json';
import { Checkbox as Pf4Checkbox, Radio as Pf4Radio } from '@patternfly/react-core';
import { mount, shallow } from 'enzyme';
import TextField from '../components/text-field';
import TextArea from '../components/text-area';
import Radio from '../components/radio';
import Checkbox from '../components/checkbox';
import Select from '../components/select';
import DatePicker from '../components/date-picker';
import TimePicker from '../components/time-picker';
import Switch from '../components/switch';

import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('FormFields', () => {
  let FieldProvider;
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();

    FieldProvider = (props) => (
      <div>
        <MockFieldProvider {...props} input={{ onChange: onChangeSpy, name: 'Foo' }} meta={{ error: false, touched: false }} />
      </div>
    );
  });

  const props = {
    name: 'Name of the field',
    id: 'someIdKey',
    dataType: 'someDataType'
  };
  const propsWithOptions = {
    ...props,
    options: [
      {
        label: 'One',
        value: '1'
      },
      {
        label: 'Two',
        value: '2'
      },
      {
        label: 'Three',
        value: '3'
      }
    ]
  };

  it('should render TextField correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField with description correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} description="This is description" />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField without id correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} id={undefined} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render touched TextField id correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextField {...props} meta={{ touched: true, error: false }} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('should render Checkbox with options correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...propsWithOptions} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('should render disabled Checkbox with options correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...propsWithOptions} disabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('Multiple checkbox - should call on change correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Checkbox {...propsWithOptions} />
      </RenderWithProvider>
    );

    expect(onChangeSpy).not.toHaveBeenCalled();

    wrapper
    .find(Pf4Checkbox)
    .first()
    .props()
    .onChange();

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should render TextArea correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextArea {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled TextArea correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TextArea {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Radio correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Radio {...propsWithOptions} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Radio correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Radio {...propsWithOptions} disabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Select correctly', () => {
    const wrapper = shallow(
      <RenderWithProvider>
        <Select {...propsWithOptions} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Select correctly', () => {
    const wrapper = shallow(
      <RenderWithProvider>
        <Select {...propsWithOptions} isDisabled={true} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render DatePicker correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <DatePicker {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TimePicker correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <TimePicker {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} isDisabled={true} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with onText/OffText Switch correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <Switch {...props} onText="I am on" offText="Turned off" />
      </RenderWithProvider>
    );

    expect(
      wrapper
      .find('.pf-m-on')
      .text()
      .includes('I am on')
    ).toEqual(true);
    expect(
      wrapper
      .find('.pf-m-on')
      .text()
      .includes('Turned off')
    ).toEqual(false);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
