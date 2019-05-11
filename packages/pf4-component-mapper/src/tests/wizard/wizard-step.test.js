import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WizardStep from '../../form-fields/wizard/wizard-step';
import FieldProvider from '../../../../../__mocks__/mock-field-provider';

describe('<WizardStep />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      fields: [ 'foo' ],
      formOptions: {
        renderForm: item => <div key={ item }>{ item }</div>,
        onCancel: jest.fn(),
        handleSubmit: jest.fn(),
      },
      FieldProvider,
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      buttonLabels: {
        cancel: 'Cancel',
        next: 'Next',
        submit: 'Submit',
        back: 'Back',
      },
      title: 'title',
      description: 'description',
    };
  });

  it('should render correctly', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps }/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render custom title', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } title={ <div>title</div> }/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render custom description', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } description={ <div>description</div> }/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
