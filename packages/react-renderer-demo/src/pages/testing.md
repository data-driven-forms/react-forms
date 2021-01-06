import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Testing

Always make sure that your **custom components** and their features are tested to avoid bugs and runtime crashes.

In these examples, we will use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/docs/api/) but the same rules apply to any other testing libraries.


## Testing the renderer

If you want to test your whole form, the easiest way is just to render it as you would normally. Be careful that you will have to mock all your async validations and submissions. Data driven forms have great test coverage so its not necessary to test core features.

Below is an example of a form with an async validation and a conditional field. All features in the data driven forms packages are tested by the library. It should not be required to tests them most of the time.

```jsx
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/mui-component-mapper';

describe('<FormRendererTest />', () => {
  /**
   * Mocking a validation endpoint
   */
  const validate = (value) =>
    new Promise((res, rej) => {
      return value === 'John' ? res('Validation sucesfull') : rej('Only value John is allowed');
    });

  /**
   * Create submit spy
   */
  const submitSpy = jest.fn();

  /**
   * example of form schema
   */
  const schema = {
    fields: [
      {
        component: 'text-field',
        name: 'username',
        label: 'Username',
        isRequired: true,
        validate: [{ type: 'required', message: 'Username is required' }]
      },
      {
        component: 'switch',
        name: 'enable-emails',
        label: 'Do you wish to receive promotinal emails?'
      },
      {
        component: 'text-field',
        name: 'email',
        type: 'email',
        label: 'Email adress',
        condition: {
          when: 'enable-emails',
          is: true
        },
        validate: [validate, { type: 'required' }] // validation will be run immediatelly after the component is mounted and after changes
      }
    ]
  };

  it('should validate and submit the form', async () => {
    /**
     * we will be using mount because we will need the DOM updates
     */
    const wrapper = mount(<FormRenderer onSubmit={submitSpy} componentMapper={componentMapper} FormTemplate={FormTemplate} schema={schema} />);

    /**
     * we can try submit the form when the validation is not met
     */
    wrapper.find('form').simulate('submit');
    expect(submitSpy).not.toHaveBeenCalled(); // true

    /**
     * fill the user name to pass the validation
     */
    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'John' } });
    wrapper.find('form').simulate('submit');
    /**
     * first argument are the values and the second one is formApi
     */
    expect(submitSpy).toHaveBeenLastCalledWith({ username: 'John' }, expect.any(Object), expect.any(Function)); // true
    submitSpy.mockReset();
    /**
     * now lets check the email subscription
     */
    expect(wrapper.find('input[name="email"]')).toHaveLength(0);
    wrapper.find('input[name="enable-emails"]').simulate('change', { target: { checked: true } });
    wrapper.update();
    /**
     * there should be new form field
     */
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    /**
     * submit should not occur
     */
    wrapper.find('form').simulate('submit');
    expect(submitSpy).not.toHaveBeenCalled(); // true

    /**
     * field should be in error state
     * we only allow value of John
     */
    await act(async () => {
      wrapper.find('input[name="email"]').simulate('change', { target: { value: 'Marty' } });
    });
    wrapper.find('form').simulate('submit');
    expect(submitSpy).not.toHaveBeenCalled(); // true
    expect(wrapper.find('input[name="email"]').props()['aria-invalid']).toEqual(true);
    /**
     * set value to John and submit the form
     */
    await act(async () => {
      wrapper.find('input[name="email"]').simulate('change', { target: { value: 'John' } });
    });
    wrapper.update();
    wrapper.find('input[name="email"]').simulate('focus', { target: { value: 'John' } });
    wrapper.find('form').simulate('submit');
    expect(submitSpy).toHaveBeenCalledWith(
      {
        email: 'John',
        username: 'John',
        'enable-emails': true
      },
      expect.any(Object),
      expect.any(Function)
    ); // true
  });
});

```
<br/>

## Testing custom components

Components that are using `useFieldApi` or `useFormApi` must be children of contexts. Therefore they must be wrapped inside these contexts when testing. The simplest way to test them is just rendering them with the FormRenderer, but there may be cases when you might now want to do that. We will show you both options.

### With renderer

Set up your renderer to make it easier to test the component-specific features. Use initial values to trigger falsey validation results to avoid unnecessary changes simulation.

```jsx
import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, useFieldApi } from '@data-driven-forms/react-form-renderer';
import { FormTemplate } from '@data-driven-forms/mui-component-mapper';

import toJson from 'enzyme-to-json';

const CustomComponent = (props) => {
  const { input, meta, label, sideEffect } = useFieldApi(props);
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        {...input}
        onChange={(...args) => {
          sideEffect(...args); // do something in addition to just changing the value in form state
          input.onChange(...args);
        }}
      />
      {meta.error && (
        <div className="custom-error-block">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

CustomComponent.defaultProps = {
  sideEffect: () => {}
};

const createSchema = ({ label = 'Custom label', validate = [], ...rest }) => ({
  fields: [
    {
      name: 'custom-component',
      component: 'custom-component',
      label,
      validate,
      ...rest
    }
  ]
});

const RendererWrapper = (props) => (
  <FormRenderer
    onSubmit={() => {}}
    FormTemplate={FormTemplate}
    componentMapper={{
      'custom-component': CustomComponent
    }}
    schema={{ fields: [] }}
    {...props}
  />
);

describe('<CustomComponent /> with renderer', () => {
  it('should render component to snapshot', () => {
    const wrapper = mount(<RendererWrapper schema={createSchema({})} />);
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });
  it('should render component in error state to snapshot', () => {
    const wrapper = mount(<RendererWrapper schema={createSchema({ validate: [{ type: 'required' }] })} />);
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });

  it('should call sideEffect when the input change', () => {
    const sideEffect = jest.fn();
    const wrapper = mount(<RendererWrapper schema={createSchema({ sideEffect })} />);
    wrapper.find('input[name="custom-component"]').simulate('change', { target: { value: 'foo' } });
    expect(sideEffect).toHaveBeenCalledTimes(1);
  });
});

```
<br/>

### Outside renderer

Rendering components outside of the renderer will require some additional set up which is not traditionally used when using form renderer and require some additional knowledge of the library. Most notably, you need to wrap the component inside the `Form` component and `RendererContext`. Be careful, no Data Driven Forms functionality is provided, so you have to configure it manually, if you need need to use it.

```jsx
import React from 'react';
import { mount } from 'enzyme';

import { Form, RendererContext, useFieldApi } from '@data-driven-forms/react-form-renderer';

import toJson from 'enzyme-to-json';

const CustomComponent = (props) => {
  const { input, meta, label, sideEffect } = useFieldApi(props);
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        {...input}
        onChange={(...args) => {
          sideEffect(...args); // do something in addition to just changing the value in form state
          input.onChange(...args);
        }}
      />
      {meta.error && (
        <div className="custom-error-block">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

CustomComponent.defaultProps = {
  sideEffect: () => {}
};

const FormWrapper = ({ props, children }) => (
  <Form onSubmit={() => {}} {...props}>
    {() => (
      <form>
        <RendererContext.Provider
          value={{
            formOptions: {},
            validatorMapper: { required: () => (value) => (value ? undefined : 'required') }
          }}
        >
          {children}
        </RendererContext.Provider>
      </form>
    )}
  </Form>
);

describe('<CustomComponent /> outside renderer', () => {
  it('should render component to snapshot', () => {
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" />
      </FormWrapper>
    );
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });
  it('should render component in error state to snapshot', () => {
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" validate={[{ type: 'required' }]} />
      </FormWrapper>
    );
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });

  it('should call sideEffect when the input change', () => {
    const sideEffect = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" sideEffect={sideEffect} />
      </FormWrapper>
    );
    wrapper.find('input[name="custom-component"]').simulate('change', { target: { value: 'foo' } });
    expect(sideEffect).toHaveBeenCalledTimes(1);
  });
});

```
<br/>

</DocPage>
