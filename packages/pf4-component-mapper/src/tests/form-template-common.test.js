import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, Form, FormSpy, FormError } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { Alert } from '@patternfly/react-core';

import FormTemplate, { Title, Description, Button } from '../form-template';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import componentMapper from '../component-mapper';

describe('FormTemplate PF4 Common', () => {
  let initialProps;
  let ContextWrapper;
  let formOptions;

  beforeEach(() => {
    formOptions = {
      onSubmit: jest.fn(),
      onReset: jest.fn(),
      onCancel: jest.fn(),
      canReset: true,
      pristine: true,
      getState: jest.fn().mockImplementation(() => ({})),
    };
    ContextWrapper = ({ children, ...props }) => (
      <RenderWithProvider value={{ formOptions }}>
        <Form onSubmit={jest.fn()}>{() => children}</Form>
      </RenderWithProvider>
    );
    initialProps = {
      formFields: <div>Formfields</div>,
      schema: {},
    };
  });

  it('should render title', () => {
    initialProps = {
      ...initialProps,
      schema: { title: 'I am title' },
    };

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Description)).toHaveLength(0);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(FormSpy)).toHaveLength(2);
  });

  it('should hide buttons', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} showFormControls={false} />
      </ContextWrapper>
    );

    expect(wrapper.find(Button)).toHaveLength(0);
    expect(wrapper.find(FormSpy)).toHaveLength(1);
  });

  it('should render description', () => {
    initialProps = {
      ...initialProps,
      schema: { description: 'I am description' },
    };

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

    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} FormButtons={FormButtons} />
      </ContextWrapper>
    );

    expect(wrapper.find(FormButtons)).toHaveLength(1);
  });

  it('should render all controls and with default labels', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );
    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit', 'Cancel']);
    wrapper.find('button').first().simulate('click');
    wrapper.find('button').at(1).simulate('click');
    wrapper.find('button').last().simulate('click');

    expect(formOptions.onSubmit).not.toHaveBeenCalled();
    expect(formOptions.onReset).not.toHaveBeenCalled();
    expect(formOptions.onCancel).toHaveBeenCalled();
  });

  it('should render only submit button', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canReset={false} onCancel={undefined} />
      </ContextWrapper>
    );
    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit']);
  });

  it('should render buttons in correct order', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={['cancel', 'submit', 'reset']} />
      </ContextWrapper>
    );
    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Cancel', 'Submit', 'Reset']);
  });

  it('should add missing buttons if not defined in button order', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={[]} />
      </ContextWrapper>
    );
    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit', 'Reset', 'Cancel']);
  });

  it('should call cancel with form values', () => {
    const expectedValues = { name: 'some name', b: { type: 'good' } };

    const onCancel = jest.fn();

    const wrapper = mount(
      <FormRenderer
        onCancel={(values) => onCancel(values)}
        schema={{ fields: [] }}
        onSubmit={jest.fn}
        FormTemplate={FormTemplate}
        initialValues={expectedValues}
        componentMapper={{}}
      />
    );

    expect(wrapper.find(Button)).toHaveLength(2);

    const CANCEL_INDEX = 1;

    wrapper.find('button').at(CANCEL_INDEX).simulate('click');

    expect(onCancel).toHaveBeenCalledWith(expectedValues);
  });

  it('show form alert message', async () => {
    const wrapper = mount(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: 'some error title' };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    expect(wrapper.find(Alert)).toHaveLength(0);

    await act(async () => {
      wrapper.find('input').first().instance().value = 'cats';
      wrapper.find('input').first().simulate('change');
    });
    wrapper.update();

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).props().title).toEqual('some error title');
    expect(wrapper.find(Alert).text()).toEqual('Danger alert:some error title');
  });

  it('show form alert message as object', async () => {
    const wrapper = mount(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: { title: 'some error title', description: 'some description' } };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    expect(wrapper.find(Alert)).toHaveLength(0);

    await act(async () => {
      wrapper.find('input').first().instance().value = 'cats';
      wrapper.find('input').first().simulate('change');
    });
    wrapper.update();

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).props().title).toEqual('some error title');
    expect(wrapper.find(Alert).text()).toEqual('Danger alert:some error titlesome description');
  });
});
