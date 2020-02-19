import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WizardStep, { RenderTitle } from '../../components/wizard/wizard-step';
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
        getState: jest.fn(),
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
    expect(wrapper.find('RenderTitle')).toHaveLength(0);
  });

  it('should render title with showTitle', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } showTitle title={ <div>title</div> }/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('RenderTitle')).toHaveLength(1);
  });

  it('should render title with showTitles', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } showTitles title={ <div>title</div> }/>);
    expect(wrapper.find('RenderTitle')).toHaveLength(1);
  });

  it('should not render title with showTitles and showTitle = false', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } showTitles showTitle={ false } title={ <div>title</div> }/>);
    expect(wrapper.find('RenderTitle')).toHaveLength(0);
  });

  it('should render custom description', () => {
    const wrapper = shallow(<WizardStep  { ...initialProps } description={ <div>description</div> }/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('<RenderTitle />', () => {
    const TITLE = 'I am a title';
    const CUSTOM_TITLE = 'Custom title';
    const CustomTitle = <h3>{ CUSTOM_TITLE }</h3>;

    it('should render title', () => {
      const wrapper = shallow(<RenderTitle title={ TITLE }/>);

      expect(wrapper.find('Title')).toHaveLength(1);
      expect(wrapper.find('Title').html().includes(TITLE)).toEqual(true);
    });

    it('should render custom title', () => {
      const wrapper = mount(<RenderTitle title={ TITLE } customTitle={ CustomTitle }/>);

      expect(wrapper.find('Title')).toHaveLength(0);
      expect(wrapper.find('h3')).toHaveLength(1);
      expect(wrapper.find('h3').html().includes(CUSTOM_TITLE)).toEqual(true);
    });
  });
});
