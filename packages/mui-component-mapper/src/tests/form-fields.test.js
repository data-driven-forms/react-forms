import React from 'react';
import { mount } from 'enzyme';
import MuiTextField from '@material-ui/core/TextField';
import MUISwitch from '@material-ui/core/Switch';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';
import MUIRadio from '@material-ui/core/Radio';

import MuiSelect from '../components/select/integration-select';
import Radio from '../components/radio';
import TextField from '../components/text-field';
import TextArea from '../components/text-area';
import Checkbox from '../components/checkbox';
import Switch from '../components/switch';
import DatePicker from '../components/date-picker';
import TimePicker from '../components/time-picker';
import Select from '../components/select';

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
    { label: 'Hamster', value: 'hamsters' }
  ];

  const componentsWithOptions = [Radio, Select];

  const componentsOriginalMapper = {
    TextField: MuiTextField,
    TextArea: MuiTextField,
    Radio: MUIRadio,
    Checkbox: MUICheckbox,
    Switch: MUISwitch,
    DatePicker: MuiTextField,
    TimePicker: MuiTextField,
    Select: MuiSelect
  };

  beforeEach(() => {
    initialProps = {
      input: {
        name: 'field-name',
        value: undefined,
        onChange: jest.fn()
      },
      meta: {},
      label: 'Some label',
      FieldProvider: MockFieldProvider
    };
  });

  describe('components', () => {
    [TextField, TextArea, Radio, Checkbox, DatePicker, TimePicker, Switch, Select].forEach((Component) => {
      describe(`${Component.name}`, () => {
        beforeEach(() => {
          if (componentsWithOptions.includes(Component)) {
            initialProps = {
              ...initialProps,
              options
            };
          }
        });

        it('renders correctly', () => {
          const wrapper = mount(<Component {...initialProps} />);

          if (Component === Radio) {
            expect(wrapper.find(componentsOriginalMapper[Component.name])).toHaveLength(options.length);
          } else {
            expect(wrapper.find(componentsOriginalMapper[Component.name])).toHaveLength(1);
          }

          expect(wrapper.find(FormLabel).text()).toEqual(initialProps.label);
          expect(wrapper.find('.Mui-error')).toHaveLength(0);
          expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
        });

        it('renders with error', () => {
          const wrapper = mount(<Component {...initialProps} meta={metaError} />);

          expect(
            wrapper
            .find('.Mui-error')
            .last()
            .text()
          ).toEqual(errorText);
        });

        it('renders with helperText', () => {
          const wrapper = mount(<Component {...initialProps} helperText={helperText} />);

          expect(
            wrapper
            .find('.MuiFormHelperText-root')
            .last()
            .text()
          ).toEqual(helperText);
        });

        it('renders with description', () => {
          const wrapper = mount(<Component {...initialProps} description={description} />);

          expect(
            wrapper
            .find('.MuiFormHelperText-root')
            .last()
            .text()
          ).toEqual(description);
        });

        it('renders with description and helperText', () => {
          const wrapper = mount(<Component {...initialProps} helperText={helperText} description={description} />);

          expect(
            wrapper
            .find('.MuiFormHelperText-root')
            .last()
            .text()
          ).toEqual(helperText);
        });

        it('renders with error and helperText', () => {
          const wrapper = mount(<Component {...initialProps} meta={metaError} helperText={helperText} />);

          expect(
            wrapper
            .find('.Mui-error')
            .last()
            .text()
          ).toEqual(errorText);
        });

        it('renders isRequired', () => {
          const wrapper = mount(<Component {...initialProps} isRequired />);

          expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(1);
        });

        it('renders isDisabled', () => {
          const wrapper = mount(<Component {...initialProps} isDisabled />);

          if (Component === TextArea) {
            expect(
              wrapper
              .find('textarea')
              .first()
              .props().disabled
            ).toEqual(true);
          } else {
            expect(
              wrapper
              .find('input')
              .first()
              .props().disabled
            ).toEqual(true);
          }
        });

        it('renders isReadOnly', () => {
          const wrapper = mount(<Component {...initialProps} isReadOnly />);

          if (Component === TextArea) {
            expect(
              wrapper
              .find('textarea')
              .first()
              .props().readOnly
            ).toEqual(true);
          } else {
            expect(
              wrapper
              .find('input')
              .first()
              .props().readOnly
            ).toEqual(true);
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
          { label: 'Hamster', value: 'hamsters' }
        ]
      };
    });

    it('renders correctly', () => {
      const wrapper = mount(<Checkbox {...initialProps} />);

      expect(wrapper.find(MultipleChoiceListCommon)).toHaveLength(1);
      expect(wrapper.find('.Mui-error')).toHaveLength(0);
      expect(wrapper.find('.MuiFormHelperText-root')).toHaveLength(0);
      expect(wrapper.find('.MuiFormLabel-asterisk')).toHaveLength(0);
    });

    it('renders with error', () => {
      const wrapper = mount(<Checkbox {...initialProps} meta={metaError} />);

      expect(
        wrapper
        .find('.Mui-error')
        .last()
        .text()
      ).toEqual(errorText);
    });

    it('renders with helperText', () => {
      const wrapper = mount(<Checkbox {...initialProps} helperText={helperText} />);

      expect(
        wrapper
        .find('.MuiFormHelperText-root')
        .last()
        .text()
      ).toEqual(helperText);
    });

    it('renders with description', () => {
      const wrapper = mount(<Checkbox {...initialProps} description={description} />);

      expect(
        wrapper
        .find('.MuiFormHelperText-root')
        .last()
        .text()
      ).toEqual(description);
    });

    it('renders with description and helperText', () => {
      const wrapper = mount(<Checkbox {...initialProps} helperText={helperText} description={description} />);

      expect(
        wrapper
        .find('.MuiFormHelperText-root')
        .last()
        .text()
      ).toEqual(helperText);
    });

    it('renders with error and helperText', () => {
      const wrapper = mount(<Checkbox {...initialProps} meta={metaError} helperText={helperText} />);

      expect(
        wrapper
        .find('.Mui-error')
        .last()
        .text()
      ).toEqual(errorText);
    });
  });
});
