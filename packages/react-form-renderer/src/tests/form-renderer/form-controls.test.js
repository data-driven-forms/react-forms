import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormControls from '../../form-renderer/form-controls';
import { layoutComponents } from '../../constants';
import RendererContext, { configureContext } from '../../form-renderer/renderer-context';

describe('<FormControls />', () => {
  let initialProps;
  let ContextWrapper;
  let initialLayout;
  beforeEach(() => {
    initialLayout = {
      [layoutComponents.BUTTON]: ({ label, ...props }) => <button { ...props }>{ label }</button>,
      [layoutComponents.COL]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
      [layoutComponents.FORM_GROUP]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
      [layoutComponents.BUTTON_GROUP]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
    };
    ContextWrapper = ({ children, ...props }) => (
      <RendererContext.Provider
        value={ configureContext({ layoutMapper: initialLayout, ...props }) }
      >
        { children }
      </RendererContext.Provider>
    );
    initialProps = {
      onSubmit: jest.fn(),
      onReset: jest.fn(),
      onCancel: jest.fn(),
      canReset: true,
      pristine: true,
    };
  });

  it('should render all controls and with default labels', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps }  disableSubmit/>
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button').first().simulate('click');
    wrapper.find('button').at(1).simulate('click');
    wrapper.find('button').last().simulate('click');

    expect(initialProps.onSubmit).not.toHaveBeenCalled();
    expect(initialProps.onReset).not.toHaveBeenCalled();
    expect(initialProps.onCancel).toHaveBeenCalled();
  });

  it('should render only submit button', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } canReset={ false } onCancel={ undefined } />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should enable reset button if pristine is false', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } pristine={ false } />
      </ContextWrapper>
    );

    wrapper.find('button').at(1).simulate('click');
    expect(initialProps.onReset).toHaveBeenCalled();
  });

  it('should enable submit button if canSubmit is true', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } canSubmit />
      </ContextWrapper>
    );

    wrapper.find('button').first().simulate('click');
    expect(initialProps.onSubmit).toHaveBeenCalled();
  });

  it('should render buttons in correct order', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } canSubmit canReset buttonOrder={ [ 'cancel', 'submit', 'reset' ] } />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add missing buttons if not defined in button order', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } canSubmit canReset buttonOrder={ [] } />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
