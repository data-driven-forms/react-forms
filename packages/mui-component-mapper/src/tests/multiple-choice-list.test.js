import React from 'react';
import { mount } from 'enzyme';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MultipleChoiceList from '../common/multiple-choice-list';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';

describe('<MultipleChoiceList />', () => {
  let initialProps;
  let changeSpy = jest.fn();
  beforeEach(() => {
    initialProps = {
      input: {
        name: 'name'
      },
      FieldProvider: (props) => <MockFieldProvider {...props} input={{ onChange: changeSpy, value: props.value || []}} />,
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
    const wrapper = mount(<MultipleChoiceList {...initialProps} />);

    expect(wrapper.find(FormControl)).toHaveLength(1);
    expect(wrapper.find(FormGroup)).toHaveLength(1);
    expect(wrapper.find(FormLabel)).toHaveLength(1);
    expect(wrapper.find(FormControlLabel)).toHaveLength(initialProps.options.length);
    expect(wrapper.find(Grid)).toHaveLength(1);
    expect(wrapper.find(Checkbox)).toHaveLength(initialProps.options.length);
  });

  it('should call FieldProvider on change method', () => {
    const wrapper = mount(<MultipleChoiceList {...initialProps} />);

    wrapper
    .find('input')
    .last()
    .simulate('change', { target: { checked: true }});
    expect(changeSpy).toHaveBeenCalledWith([1]);
  });

  it('should call FieldProvider on change method and remove option value form all values', () => {
    const wrapper = mount(
      <MultipleChoiceList
        {...initialProps}
        FieldProvider={(props) => <MockFieldProvider {...props} input={{ onChange: changeSpy, value: props.value || [1]}} />}
      />
    );

    wrapper
    .find('input')
    .last()
    .simulate('change', { target: { checked: true }});
    expect(changeSpy).toHaveBeenCalledWith([]);
  });

  it('should render in error state', () => {
    const ERROR_MESSAGE = 'Error message';

    const wrapper = mount(
      <MultipleChoiceList
        {...initialProps}
        FieldProvider={(props) => (
          <MockFieldProvider
            {...props}
            input={{ onChange: changeSpy, value: []}}
            meta={{
              error: ERROR_MESSAGE,
              touched: true
            }}
          />
        )}
      />
    );

    expect(wrapper.find(FormHelperText).text()).toEqual(ERROR_MESSAGE);
  });
});
