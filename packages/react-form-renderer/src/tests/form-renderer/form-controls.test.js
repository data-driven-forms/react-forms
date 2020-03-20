import React from 'react';
import { Form } from 'react-final-form';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormControls from '../../form-renderer/form-controls';
import { layoutComponents } from '../../constants';
import RendererContext from '../../form-renderer/renderer-context';

describe('<FormControls />', () => {
  let initialProps;
  let ContextWrapper;
  let initialLayout;

  beforeEach(() => {
    initialLayout = {
      [layoutComponents.BUTTON]: ({ label, buttonType, ...props }) => <button { ...props }>{ label }</button>,
      [layoutComponents.COL]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
      [layoutComponents.BUTTON_GROUP]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
    };
    ContextWrapper = ({ children, ...props }) => (
      <Form onSubmit={ jest.fn() }>
        { () => (
          <RendererContext.Provider
            value={{ layoutMapper: initialLayout, ...props }}
          >
            { children }
          </RendererContext.Provider>
        ) }
      </Form>
    );
    initialProps = {
      onSubmit: jest.fn(),
      onReset: jest.fn(),
      onCancel: jest.fn(),
      canReset: true,
      pristine: true,
    };
  });

  afterEach(() => {
    initialProps.onCancel.mockReset();
    initialProps.onSubmit.mockReset();
    initialProps.onReset.mockReset();
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

  it('should call cancel with form values', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormControls { ...initialProps } />
      </ContextWrapper>
    );

    const CANCEL_INDEX = 2;
    const FIELD_NAME = 'xxx';
    const FIELD_VALUE = 'yyy';

    const expectedValues =  {
      [FIELD_NAME]: FIELD_VALUE,
    };

    wrapper.find(Form).instance().form.change(FIELD_NAME, FIELD_VALUE);
    wrapper.update();

    wrapper.find('button').at(CANCEL_INDEX).simulate('click');

    expect(initialProps.onCancel).toHaveBeenCalledWith(expectedValues);
  });
});
