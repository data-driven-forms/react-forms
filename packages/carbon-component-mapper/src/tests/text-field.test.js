import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { TextInput, NumberInput } from 'carbon-components-react';

describe('<TextInput and NumberInput />', () => {
  let onChange;
  let wrapper;
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
    onChange = jest.fn();
  });
  afterEach(() => {
    onChange.mockReset();
    submitSpy.mockReset();
  });
  it('renders NumberInput', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 1
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(wrapper.find(NumberInput)).toHaveLength(1);
  });

  it('NumberInput - click on increment button', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 1
        }
      ]
    };
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          onSubmit={(values) => submitSpy(values)}
          FormTemplate={(props) => <FormTemplate {...props} />}
          schema={schema}
          componentMapper={componentMapper}
        />
      );
    });

    expect(wrapper.find(NumberInput)).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);

    await act(async () => {
      wrapper
        .find('button.up-icon')
        .first()
        .simulate('click');
    });
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();
    expect(submitSpy).toHaveBeenCalledWith({ input: '2' });
  });

  it('NumberInput - click on decrement button ', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 5
        }
      ]
    };
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          onSubmit={(values) => submitSpy(values)}
          FormTemplate={(props) => <FormTemplate {...props} />}
          schema={schema}
          componentMapper={componentMapper}
        />
      );
    });

    expect(wrapper.find(NumberInput)).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);

    await act(async () => {
      wrapper
        .find('button.down-icon')
        .first()
        .simulate('click');
    });
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();
    expect(submitSpy).toHaveBeenCalledWith({ input: '4' });
  });

  it('renders TextInput', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          initialValue: 'test'
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(wrapper.find(TextInput)).toHaveLength(1);
  });
});
