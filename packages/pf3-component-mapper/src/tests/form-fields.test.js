import React from 'react';
import toJson from 'enzyme-to-json';
import { SwitchField, CheckboxGroup, Radio, TextareaField, TextField } from '../form-fields/form-fields';
import { mount } from 'enzyme';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import MultipleChoiceList from '../form-fields/multiple-choice-list';

describe('FormFields', () => {
  describe('<SwitchField />', () => {
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
      FieldProvider: MockFieldProvider,
    };

    it('should render Switch correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render mini Switch correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } bsSize='mini' />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render sm Switch correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } bsSize='mn' />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with label correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } label={ 'Label' } />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with placeholder correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } placeholder={ 'Placeholder' } />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with onText (custom prop) correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } onText={ 'OnText' } />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render disabled Switch correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } isDisabled />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render readOnly Switch correctly', () => {
      const wrapper = mount(
        <SwitchField { ...props } isReadOnly />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call onChange method', () => {
      const changeSpy = jest.fn();
      const wrapper = mount(
        <SwitchField
          { ...props }
          name="Foo"
          FieldProvider={ props => (
            <MockFieldProvider
              { ...props }
              input={{ onChange: changeSpy, name: props.name }}
            />
          ) }
        />
      );
      wrapper.find('input').simulate('change');
      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('<CheckboxGroup />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        FieldProvider: MockFieldProvider,
        input: {
          name: 'single-check-box',
        },
        meta: {},
      };
    });

    it('should render single checkbox variant', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render multiple choice variant', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } options={ [] } />);
      expect(wrapper.find(MultipleChoiceList)).toHaveLength(1);
    });
  });

  describe('<Radio />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'radio',
        },
        meta: {},
        options: [{
          label: 'option 1',
          value: 1,
        }, {
          label: 'option 2',
          value: 2,
        }],
        FieldProvider: MockFieldProvider,
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<Radio { ...initialProps } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('<TextField />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'text-field',
        },
        meta: {},
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<TextField { ...initialProps } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with placeholder', () => {
      const wrapper = mount(<TextField { ...initialProps } placeholder={ 'placeholder' } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('<TextareaField />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'textarea-field',
        },
        meta: {},
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<TextareaField { ...initialProps } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with placeholder', () => {
      const wrapper = mount(<TextareaField { ...initialProps } placeholder={ 'placeholder' } />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
