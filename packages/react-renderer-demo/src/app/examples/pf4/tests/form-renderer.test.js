import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';

import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper/dist/cjs';

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
