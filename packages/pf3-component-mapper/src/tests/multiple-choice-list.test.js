import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import RequiredLabel from '../form-fields/required-label';
import { FieldLevelHelp, HelpBlock } from 'patternfly-react';
import Checkbox from '../files/checkbox';

describe.skip('<MultipleChoiceList />', () => {
  let initialProps;
  let changeSpy = jest.fn();
  beforeEach(() => {
    initialProps = {
      input: {
        name: 'Name of the field',
        value: ''
      },
      FieldProvider: (props) => <MockFieldProvider {...props} input={{ onChange: changeSpy, value: props.value || [] }} />,
      options: [
        {
          label: 'Foo',
          value: 0
        },
        {
          label: 'Bar',
          value: 1
        }
      ]
    };
  });

  afterEach(() => {
    changeSpy.mockReset();
  });

  it('should render correctly', () => {
    const wrapper = mount(<Checkbox {...initialProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call FieldProvider on change method', () => {
    const wrapper = mount(<Checkbox {...initialProps} />);

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { checked: true } });
    expect(changeSpy).toHaveBeenCalledWith([1]);
  });

  it('should call FieldProvider on change method and remove option value form all values', () => {
    const wrapper = mount(<Checkbox {...initialProps} value={[1]} />);

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { checked: true } });
    expect(changeSpy).toHaveBeenCalledWith([]);
  });

  it('should render in error state', () => {
    const wrapper = mount(
      <Checkbox
        {...initialProps}
        FieldProvider={(props) => (
          <MockFieldProvider
            {...props}
            input={{ onChange: changeSpy, value: [] }}
            meta={{
              error: 'Error message',
              touched: true
            }}
          />
        )}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render required variant', () => {
    const wrapper = mount(<Checkbox {...initialProps} isRequired label="Foo" />);
    expect(wrapper.find(RequiredLabel)).toHaveLength(1);
  });

  it('should render helper text variant', () => {
    const wrapper = mount(<Checkbox {...initialProps} isRequired label="Foo" helperText="Helper text" />);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(1);

    expect(
      wrapper
        .find(FieldLevelHelp)
        .first()
        .props().content
    ).toEqual('Helper text');
    expect(wrapper.find(HelpBlock)).toHaveLength(0);
  });

  it('should render description variant', () => {
    const wrapper = mount(<Checkbox {...initialProps} isRequired label="Foo" description="Description" />);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(0);
    expect(wrapper.find(HelpBlock)).toHaveLength(1);
    expect(
      wrapper
        .find(HelpBlock)
        .first()
        .text()
    ).toEqual('Description');
  });
});
