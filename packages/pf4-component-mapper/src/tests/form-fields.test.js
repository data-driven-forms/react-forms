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
    input: {
      name: 'Name of the field',
      value: ''
    },
    id: 'someIdKey',
    dataType: 'someDataType',
    meta: {
      error: false,
      touched: false
    }
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
    const wrapper = mount(<TextField {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField with description correctly', () => {
    const wrapper = mount(<TextField {...props} description="This is description" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TextField without id correctly', () => {
    const wrapper = mount(<TextField {...props} id={undefined} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render touched TextField id correctly', () => {
    const wrapper = mount(<TextField {...props} meta={{ touched: true, error: false }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox correctly', () => {
    const wrapper = mount(<Checkbox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Checkbox with options correctly', () => {
    const wrapper = mount(<Checkbox {...propsWithOptions} FieldProvider={FieldProvider} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Checkbox with options correctly', () => {
    const wrapper = mount(<Checkbox {...propsWithOptions} FieldProvider={FieldProvider} disabled={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Multiple checkbox - should call on change correctly', () => {
    const wrapper = mount(<Checkbox {...propsWithOptions} FieldProvider={FieldProvider} />);

    expect(onChangeSpy).not.toHaveBeenCalled();

    wrapper
      .find(Pf4Checkbox)
      .first()
      .props()
      .onChange();

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should render TextArea correctly', () => {
    const wrapper = mount(<TextArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled TextArea correctly', () => {
    const wrapper = mount(<TextArea {...props} isDisabled={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Radio correctly', () => {
    const wrapper = mount(<Radio {...propsWithOptions} FieldProvider={FieldProvider} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Radio correctly', () => {
    const wrapper = mount(<Radio {...propsWithOptions} FieldProvider={FieldProvider} disabled={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('radio - should call fieldProvider onChange correctly', () => {
    const wrapper = mount(<Radio {...propsWithOptions} FieldProvider={FieldProvider} disabled={true} />);

    wrapper
      .find(Pf4Radio)
      .first()
      .props()
      .onChange();

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should render Select correctly', () => {
    const wrapper = shallow(<Select {...propsWithOptions} />).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Select correctly', () => {
    const wrapper = shallow(<Select {...propsWithOptions} isDisabled={true} />).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render DatePicker correctly', () => {
    const wrapper = mount(<DatePicker {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render TimePicker correctly', () => {
    const wrapper = mount(<TimePicker {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Switch correctly', () => {
    const wrapper = mount(<Switch {...props} FieldProvider={FieldProvider} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(<Switch {...props} isDisabled={true} FieldProvider={FieldProvider} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled Switch correctly', () => {
    const wrapper = mount(<Switch {...props} isDisabled={true} FieldProvider={FieldProvider} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with onText/OffText Switch correctly', () => {
    const wrapper = mount(<Switch {...props} onText="I am on" offText="Turned off" FieldProvider={FieldProvider} />);

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
