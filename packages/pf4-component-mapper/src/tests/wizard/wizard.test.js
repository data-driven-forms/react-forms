import React from 'react';
import { mount } from 'enzyme';
import toJSon from 'enzyme-to-json';

import Wizard from '../../form-fields/wizard/wizard';
import FieldProvider from '../../../../../__mocks__/mock-field-provider';

describe('<Wizard />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      FieldProvider,
      title: 'Wizard',
      description: 'wizard description',
      formOptions: {
        renderForm: ({ name }) => <div key={ name }>{ name }</div>,
        getState: () => ({
          values: {
            'foo-field': 'foo-field-value',
            'bar-field': 'bar-field-value',
            'not-visited-field': 'not-visted-field-value',
          },
        }),
        onCancel: jest.fn(),
        onSubmit: jest.fn(),
        submit: jest.fn(),
        valid: true,
      },
      fields: [{
        stepKey: '1',
        name: 'foo',
        fields: [],
      }],
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<Wizard { ...initialProps } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with custom title and description', () => {
    const wrapper = mount(<Wizard { ...initialProps } title={ <div>Title</div> } description={ <div>description</div> } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should call submit function', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard { ...initialProps } formOptions={{ ...initialProps.formOptions, onSubmit }} />);
    wrapper.find('button').last().simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should go to next step correctly and submit data', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard { ...initialProps } formOptions={{ ...initialProps.formOptions, onSubmit }}   fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);
    // go to next step
    wrapper.find('button').at(2).simulate('click');
    wrapper.update();
    expect(wrapper.children().instance().state).toEqual({ activeStep: '2', prevSteps: [ '1' ]});

    // submit wizard
    wrapper.find('button').at(2).simulate('click');
    expect(onSubmit).toHaveBeenCalledWith({
      'foo-field': 'foo-field-value',
      'bar-field': 'bar-field-value',
    });
  });
});
