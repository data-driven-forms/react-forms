import React from 'react';
import { mount } from 'enzyme';
import MuiTextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';

import {
  TextField,
  TextareaField,
  Radio,
  CheckboxGroup,
  SwitchField,
  DatePickerField,
  TimePickerField,
  SelectField,
} from '../form-fields/form-fields';
import MuiSelect from '../form-fields/select-field';
import RadioGroup from '../form-fields/radio';

import MockFieldProvider from '../../../../__mocks__/mock-field-provider';

describe('formFields', () => {
  let initialProps;

  const errorText = 'It is required';
  const helperText = 'I am helper text';
  const description = 'This is description';
  const metaError = { touched: true, error: errorText };
  const options = [
    { label: 'Cat', value: 'cats' },
    { label: 'Dog', value: 'dogs' },
    { label: 'Hamster', value: 'hamsters' },
  ];

  const componentsWithOptions = [ Radio, SelectField ];

  const componentsOriginalMapper = {
    TextField: MuiTextField,
    TextareaField: MuiTextField,
    Radio: RadioGroup,
    CheckboxGroup: Checkbox,
    SwitchField: Switch,
    DatePickerField: MuiTextField,
    TimePickerField: MuiTextField,
    SelectField: MuiSelect,
  };

  beforeEach(() => {
    initialProps = {
      input: {
        name: 'field-name',
        value: undefined,
        onChange: jest.fn(),
      },
      meta: {},
      label: 'Some label',
      FieldProvider: MockFieldProvider,
    };
  });

  describe('helperText test', () => {
    [ TextField, TextareaField, Radio, CheckboxGroup, DatePickerField, TimePickerField, SwitchField, SelectField ].forEach(Component => {
      describe(`${Component.name}`, () => {
        beforeEach(() => {
          if (componentsWithOptions.includes(Component)) {
            initialProps = {
              ...initialProps,
              options,
            };
          }
        });

        it('renders correctly', () => {
          const wrapper = mount(<Component { ...initialProps } />);

          expect(wrapper.find(componentsOriginalMapper[Component.name])).toHaveLength(1);
          expect(wrapper.find(FormLabel).text()).toEqual(initialProps.label);
          expect(wrapper.find('.Mui-error')).toHaveLength(0);
          expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
        });

        it('renders with error', () => {
          const wrapper = mount(<Component { ...initialProps } meta={ metaError }/>);

          expect(wrapper.find('.Mui-error').last().text()).toEqual(errorText);
        });

        it('renders with helperText', () => {
          const wrapper = mount(<Component { ...initialProps } helperText={ helperText }/>);

          expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(helperText);
        });

        it('renders with description', () => {
          const wrapper = mount(<Component { ...initialProps } description={ description }/>);

          expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(description);
        });

        it('renders with description and helperText', () => {
          const wrapper = mount(<Component { ...initialProps } helperText={ helperText } description={ description }/>);

          expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(helperText);
        });

        it('renders with error and helperText', () => {
          const wrapper = mount(<Component { ...initialProps } meta={ metaError } helperText={ helperText }/>);

          expect(wrapper.find('.Mui-error').last().text()).toEqual(errorText);
        });

        it('renders isRequired', () => {
          const wrapper = mount(<Component { ...initialProps } isRequired={ true }/>);

          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(1);
        });

        it('renders isDisabled', () => {
          const wrapper = mount(<Component { ...initialProps } isDisabled={ true }/>);

          if (Component === TextareaField) {
            expect(wrapper.find('textarea').first().props().disabled).toEqual(true);
          } else {
            expect(wrapper.find('input').first().props().disabled).toEqual(true);
          }
        });

        it('renders isReadOnly', () => {
          const wrapper = mount(<Component { ...initialProps } isReadOnly={ true }/>);

          if (Component === TextareaField) {
            expect(wrapper.find('textarea').first().props().readOnly).toEqual(true);
          } else {
            expect(wrapper.find('input').first().props().readOnly).toEqual(true);
          }
        });
      });
    });
  });

  describe('MultipleCheckbox', () => {
    beforeEach(() => {
      initialProps = {
        ...initialProps,
        FieldProvider: MockFieldProvider,
        options: [
          { label: 'Cat', value: 'cats' },
          { label: 'Dog', value: 'dogs' },
          { label: 'Hamster', value: 'hamsters' },
        ],
      };
    });

    it('renders correctly', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } />);

      expect(wrapper.find(MultipleChoiceListCommon)).toHaveLength(1);
      expect(wrapper.find('.Mui-error')).toHaveLength(0);
      expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
      expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
    });

    it('renders with error', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } meta={ metaError }/>);

      expect(wrapper.find('.Mui-error').last().text()).toEqual(errorText);
    });

    it('renders with helperText', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } helperText={ helperText }/>);

      expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(helperText);
    });

    it('renders with description', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } description={ description }/>);

      expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(description);
    });

    it('renders with description and helperText', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } helperText={ helperText } description={ description }/>);

      expect(wrapper.find('.MuiFormHelperText-root').last().text()).toEqual(helperText);
    });

    it('renders with error and helperText', () => {
      const wrapper = mount(<CheckboxGroup { ...initialProps } meta={ metaError } helperText={ helperText }/>);

      expect(wrapper.find('.Mui-error').last().text()).toEqual(errorText);
    });
  });
});
