/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, useFieldApi, FormError as ERROR } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import FormTemplate from '../../form-template/form-template';

describe('FormTemplate', () => {
  let wrapper;

  const DummyField = (props) => {
    const { input } = useFieldApi(props);

    return <input {...input} />;
  };

  const fields = [
    { name: 'field1', component: componentTypes.TEXT_FIELD },
    { name: 'field2', component: componentTypes.TEXT_FIELD },
  ];

  const FormError = ({ formError }) => <span className="formError">{formError}</span>;

  const Form = (props) => <form {...props} />;

  const Button = ({ label, children, buttonType, ...props }) => (
    <button {...props} id={buttonType}>
      {label}
      {children}
    </button>
  );
  const ButtonGroup = (props) => <span className="buttonGroup" {...props} />;

  const Title = (props) => <h1 {...props}>{props.children}</h1>;

  const Description = (props) => <small {...props} />;

  const FormTemplateTest = (props) => (
    <FormTemplate
      BeforeError={FormError}
      FormWrapper={Form}
      Button={Button}
      ButtonGroup={ButtonGroup}
      Title={Title}
      Description={Description}
      {...props}
    />
  );

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: FormTemplateTest,
    componentMapper: { [componentTypes.TEXT_FIELD]: DummyField },
    schema: {
      fields,
    },
  };

  it('Renders correctly', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(FormError)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);

    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit']);

    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
    expect(wrapper.find(Title)).toHaveLength(0);
    expect(wrapper.find(Description)).toHaveLength(0);

    expect(wrapper.find(DummyField)).toHaveLength(2);
  });

  it('Renders correctly - fully enabled', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          schema={{
            title: 'some-title',
            description: 'some-description',
            fields,
          }}
          FormTemplate={(props) => <FormTemplateTest {...props} canReset />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(FormError)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(3);

    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit', 'Reset', 'Cancel']);

    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
    expect(wrapper.find(Title).text()).toEqual('some-title');
    expect(wrapper.find(Description).text()).toEqual('some-description');
  });

  it('Renders correctly - with label', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          schema={{
            label: 'some-title',
            fields,
          }}
          FormTemplate={(props) => <FormTemplateTest {...props} canReset />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(Title).text()).toEqual('some-title');
  });

  it('Calls submit', async () => {
    const spy = jest.fn();

    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} onSubmit={spy} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#submit').simulate('submit');
    });
    wrapper.update();

    expect(spy).toHaveBeenCalled();
  });

  it('Calls reset', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} FormTemplate={(props) => <FormTemplateTest {...props} canReset />} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').first().instance().value = 'y';
      wrapper.find('input').first().simulate('change');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#reset').simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('input').first().value).toEqual();
  });

  it('Calls cancel', async () => {
    const spy = jest.fn();

    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} onCancel={spy} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#cancel').simulate('click');
    });
    wrapper.update();

    expect(spy).toHaveBeenCalled();
  });

  it('Changes button order', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          FormTemplate={(props) => <FormTemplateTest {...props} canReset buttonOrder={['cancel', 'submit', 'reset']} />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Cancel', 'Submit', 'Reset']);
  });

  it('Changes button order - default', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer {...rendererProps} onCancel={jest.fn()} FormTemplate={(props) => <FormTemplateTest {...props} canReset buttonOrder={[]} />} />
      );
    });
    wrapper.update();

    expect(wrapper.find('button').map((b) => b.text())).toEqual(['Submit', 'Reset', 'Cancel']);
  });

  it('Changes labels', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          FormTemplate={(props) => <FormTemplateTest {...props} canReset submitLabel="save" cancelLabel="discard" resetLabel="retry" />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find('button').map((b) => b.text())).toEqual(['save', 'retry', 'discard']);
  });

  it('Changes button className', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          FormTemplate={(props) => <FormTemplateTest {...props} buttonClassName="custom-button-classname" />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(ButtonGroup).find('span').props().className).toEqual('custom-button-classname');
  });

  it('Hide form controls', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          FormTemplate={(props) => <FormTemplateTest {...props} canReset showFormControls={false} />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(Button)).toHaveLength(0);
    expect(wrapper.find(ButtonGroup)).toHaveLength(0);
    expect(wrapper.find(DummyField)).toHaveLength(2);
  });

  it('Custom buttons', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onCancel={jest.fn()}
          FormTemplate={(props) => <FormTemplateTest {...props} FormButtons={() => <div id="custom-buttons" />} />}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(Button)).toHaveLength(0);
    expect(wrapper.find(ButtonGroup)).toHaveLength(0);
    expect(wrapper.find(DummyField)).toHaveLength(2);
    expect(wrapper.find('#custom-buttons')).toHaveLength(1);
  });

  it('shows form error', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          onSubmit={() => ({
            [ERROR]: 'form error',
          })}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(FormError).text()).toEqual('');

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    wrapper.update();

    expect(wrapper.find(FormError).text()).toEqual('form error');
  });
});
