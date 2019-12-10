import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MultipleChoiceList from '../form-fields/multiple-choice-list';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import RequiredLabel from '../form-fields/required-label';
import { FieldLevelHelp, HelpBlock } from 'patternfly-react';

describe('<MultipleChoiceList />', () => {
  let initialProps;
  let changeSpy = jest.fn();
  beforeEach(() => {
    initialProps = {
      FieldProvider: props => <MockFieldProvider { ...props } input={{ onChange: changeSpy, value: props.value || []}} />,
      options: [{
        label: 'Foo',
        value: 0,
      }, {
        label: 'Bar',
        value: 1,
      }],
    };
  });

  afterEach(() => {
    changeSpy.mockReset();
  });

  it('should render correctly', () => {
    const wrapper = mount(<MultipleChoiceList { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call FieldProvider on change method', () => {
    const wrapper = mount(<MultipleChoiceList { ...initialProps } />);

    wrapper.find('input').last().simulate('change', { target: { checked: true }});
    expect(changeSpy).toHaveBeenCalledWith([ 1 ]);
  });

  it('should call FieldProvider on change method and remove option value form all values', () => {
    const wrapper = mount(
      <MultipleChoiceList
        { ...initialProps }
        FieldProvider={ props => <MockFieldProvider { ...props } input={{ onChange: changeSpy, value: props.value || [ 1 ]}} /> }
      />
    );

    wrapper.find('input').last().simulate('change', { target: { checked: true }});
    expect(changeSpy).toHaveBeenCalledWith([]);
  });

  it('should render in error state', () => {
    const wrapper = mount(
      <MultipleChoiceList
        { ...initialProps }
        FieldProvider={ props => (
          <MockFieldProvider
            { ...props }
            input={{ onChange: changeSpy, value: []}}
            meta={{
              error: 'Error message',
              touched: true,
            }}
          />) }
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render required variant', () => {
    const wrapper = mount(<MultipleChoiceList { ...initialProps } isRequired label="Foo" />);
    expect(wrapper.find(RequiredLabel)).toHaveLength(1);
  });

  it('should render helper text variant', () => {
    const wrapper = mount(<MultipleChoiceList { ...initialProps } isRequired label="Foo" helperText="Helper text"/>);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(1);

    expect(wrapper.find(FieldLevelHelp).first().props().content).toEqual('Helper text');
    expect(wrapper.find(HelpBlock)).toHaveLength(0);
  });

  it('should render description variant', () => {
    const wrapper = mount(<MultipleChoiceList { ...initialProps } isRequired label="Foo" description="Description"/>);
    expect(wrapper.find(FieldLevelHelp)).toHaveLength(0);
    expect(wrapper.find(HelpBlock)).toHaveLength(1);
    expect(wrapper.find(HelpBlock).first().text()).toEqual('Description');
  });
});
