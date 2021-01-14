import React from 'react';
import { mount as enzymeMount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import WizardStep, { RenderTitle } from '../../wizard/wizard-components/wizard-step';
import { Title } from '@patternfly/react-core';
import { Form } from '@data-driven-forms/react-form-renderer';

const mount = (children) => enzymeMount(<Form onSubmit={jest.fn()}>{() => children}</Form>);

describe('<WizardStep />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      fields: ['foo'],
      formOptions: {
        renderForm: (item) => <div key={item}>{item}</div>,
        onCancel: jest.fn(),
        handleSubmit: jest.fn(),
        getState: jest.fn()
      },
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      buttonLabels: {
        cancel: 'Cancel',
        next: 'Next',
        submit: 'Submit',
        back: 'Back'
      },
      title: 'title',
      description: 'description'
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<WizardStep {...initialProps} />);
    expect(mountToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('RenderTitle')).toHaveLength(0);
  });

  it('should render title with showTitle', () => {
    const wrapper = mount(<WizardStep {...initialProps} showTitle title={<div>title</div>} />);
    expect(mountToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('RenderTitle')).toHaveLength(1);
  });

  it('should render title with showTitles', () => {
    const wrapper = mount(<WizardStep {...initialProps} showTitles title={<div>title</div>} />);
    expect(wrapper.find('RenderTitle')).toHaveLength(1);
  });

  it('should not render title with showTitles and showTitle = false', () => {
    const wrapper = mount(<WizardStep {...initialProps} showTitles showTitle={false} title={<div>title</div>} />);
    expect(wrapper.find('RenderTitle')).toHaveLength(0);
  });

  it('should render custom description', () => {
    const wrapper = mount(<WizardStep {...initialProps} description={<div>description</div>} />);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  describe('<RenderTitle />', () => {
    const TITLE = 'I am a title';
    const CUSTOM_TITLE = 'Custom title';
    const CustomTitle = <h3>{CUSTOM_TITLE}</h3>;

    it('should render title', () => {
      const wrapper = mount(<RenderTitle title={TITLE} />);

      expect(wrapper.find(Title)).toHaveLength(1);
      expect(
        wrapper
          .find(Title)
          .html()
          .includes(TITLE)
      ).toEqual(true);
    });

    it('should render custom title', () => {
      const wrapper = mount(<RenderTitle title={TITLE} customTitle={CustomTitle} />);

      expect(wrapper.find(Title)).toHaveLength(0);
      expect(wrapper.find('h3')).toHaveLength(1);
      expect(
        wrapper
          .find('h3')
          .html()
          .includes(CUSTOM_TITLE)
      ).toEqual(true);
    });
  });
});
