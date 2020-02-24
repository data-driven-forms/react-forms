import React from 'react';
import { Form } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { formTemplate } from '../index';
import { Title, Description, Button } from '../components/form-template';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('FormTemplate PF4 Common', () => {
  let initialProps;
  let ContextWrapper;
  let FormTemplate;
  let formOptions;

  beforeEach(() => {
    formOptions = { onSubmit: jest.fn(), onReset: jest.fn(), onCancel: jest.fn(), canReset: true, pristine: true };
    ContextWrapper = ({ children, ...props }) => (
      <RenderWithProvider value={{ formOptions }}>
        <Form onSubmit={jest.fn()}>{() => children}</Form>
      </RenderWithProvider>
    );
    initialProps = {
      formFields: <div>Formfields</div>,
      schema: {}
    };
  });

  it('should render title', () => {
    initialProps = {
      ...initialProps,
      schema: { title: 'I am title' }
    };

    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Description)).toHaveLength(0);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should hide buttons', () => {
    FormTemplate = formTemplate({ showFormControls: false });

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('should render description', () => {
    initialProps = {
      ...initialProps,
      schema: { description: 'I am description' }
    };

    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(Title)).toHaveLength(0);
    expect(wrapper.find(Description)).toHaveLength(1);
  });

  it('should render custom formControls', () => {
    const FormButtons = () => <div>Form Controls</div>;

    FormTemplate = formTemplate({ FormButtons });

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(FormButtons)).toHaveLength(1);
  });

  it('should render all controls and with default labels', () => {
    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
    .find('button')
    .first()
    .simulate('click');
    wrapper
    .find('button')
    .at(1)
    .simulate('click');
    wrapper
    .find('button')
    .last()
    .simulate('click');

    expect(formOptions.onSubmit).not.toHaveBeenCalled();
    expect(formOptions.onReset).not.toHaveBeenCalled();
    expect(formOptions.onCancel).toHaveBeenCalled();
  });

  it('should render only submit button', () => {
    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canReset={false} onCancel={undefined} />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render buttons in correct order', () => {
    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={['cancel', 'submit', 'reset']} />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add missing buttons if not defined in button order', () => {
    FormTemplate = formTemplate({});

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={[]} />
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call cancel with form values', () => {
    FormTemplate = formTemplate({ canReset: true });

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(Button)).toHaveLength(3);

    const CANCEL_INDEX = 2;
    const FIELD_NAME = 'xxx';
    const FIELD_VALUE = 'yyy';

    const expectedValues = {
      [FIELD_NAME]: FIELD_VALUE
    };

    wrapper
    .find(Form)
    .instance()
    .form.change(FIELD_NAME, FIELD_VALUE);
    wrapper.update();

    wrapper
    .find('button')
    .at(CANCEL_INDEX)
    .simulate('click');

    expect(formOptions.onCancel).toHaveBeenCalledWith(expectedValues);
  });
});
