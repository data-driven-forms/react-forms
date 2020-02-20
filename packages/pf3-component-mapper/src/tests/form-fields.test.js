import React from 'react';
import toJson from 'enzyme-to-json';
import TextField from '../components/text-field';
import { mount } from 'enzyme';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import MultipleChoiceList from '../form-fields/multiple-choice-list';
import { FieldLevelHelp } from 'patternfly-react';
import Switch from '../components/switch';
import Checkbox from '../components/checkbox';
import Radio from '../components/radio';
import Textarea from '../components/textarea';

describe('FormFields', () => {
  describe('<Switch />', () => {
    let FieldProvider;
    let onChangeSpy;
    let props;
    beforeEach(() => {
      onChangeSpy = jest.fn();

      FieldProvider = (props) => (
        <div>
          <MockFieldProvider {...props} input={{ onChange: onChangeSpy, name: 'Foo' }} meta={{ error: false, touched: false }} />
        </div>
      );
      props = {
        input: {
          name: 'Name of the field',
          value: ''
        },
        id: 'someIdKey',
        dataType: 'someDataType',
        meta: {
          error: false,
          touched: false
        },
        FieldProvider
      };
    });

    it('should render Switch correctly', () => {
      const wrapper = mount(<Switch {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render mini Switch correctly', () => {
      const wrapper = mount(<Switch {...props} bsSize="mini" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render sm Switch correctly', () => {
      const wrapper = mount(<Switch {...props} bsSize="mn" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with label correctly', () => {
      const wrapper = mount(<Switch {...props} label={'Label'} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with placeholder correctly', () => {
      const wrapper = mount(<Switch {...props} placeholder={'Placeholder'} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render Switch with onText (custom prop) correctly', () => {
      const wrapper = mount(<Switch {...props} onText={'OnText'} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render disabled Switch correctly', () => {
      const wrapper = mount(<Switch {...props} isDisabled />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render readOnly Switch correctly', () => {
      const wrapper = mount(<Switch {...props} isReadOnly />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call onChange method', () => {
      const wrapper = mount(<Switch {...props} name="Foo" FieldProvider={FieldProvider} />);
      wrapper.find('input').simulate('change');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });

  describe('<Checkbox />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        FieldProvider: MockFieldProvider,
        input: {
          name: 'single-check-box'
        },
        meta: {}
      };
    });

    it('should render single checkbox variant', () => {
      const wrapper = mount(<Checkbox {...initialProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find(FieldLevelHelp)).toHaveLength(0);
    });

    it('should render single checkbox variant with a helper text', () => {
      const wrapper = mount(<Checkbox {...initialProps} helperText="Helper text" />);
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find(FieldLevelHelp)).toHaveLength(1);
    });

    it('should render multiple choice variant', () => {
      const wrapper = mount(<Checkbox {...initialProps} options={[]} />);
      expect(wrapper.find(MultipleChoiceList)).toHaveLength(1);
    });
  });

  describe('<Radio />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'radio'
        },
        meta: {},
        options: [
          {
            label: 'option 1',
            value: 1
          },
          {
            label: 'option 2',
            value: 2
          }
        ],
        FieldProvider: MockFieldProvider
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<Radio {...initialProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('<TextField />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'text-field'
        },
        meta: {}
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<TextField {...initialProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with placeholder', () => {
      const wrapper = mount(<TextField {...initialProps} placeholder={'placeholder'} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with helperText', () => {
      const wrapper = mount(<TextField {...initialProps} label="label" helperText="I am a helper text" />);

      expect(wrapper.find('FieldLevelHelp')).toHaveLength(1);
      expect(wrapper.find('FieldLevelHelp').props().content).toEqual('I am a helper text');
    });

    it('should render correctly with description', () => {
      const wrapper = mount(<TextField {...initialProps} description="I am a description" />);

      expect(wrapper.find('HelpBlock')).toHaveLength(1);
      expect(wrapper.find('HelpBlock').text()).toEqual('I am a description');
    });
  });

  describe('<Textarea />', () => {
    let initialProps;
    beforeEach(() => {
      initialProps = {
        input: {
          name: 'textarea-field'
        },
        meta: {}
      };
    });

    it('should render correctly', () => {
      const wrapper = mount(<Textarea {...initialProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with placeholder', () => {
      const wrapper = mount(<Textarea {...initialProps} placeholder={'placeholder'} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
