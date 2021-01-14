import React from 'react';
import { mount } from 'enzyme';

import FormTabs from '../tabs';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import { FormRenderer, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '../index';
import { Tab } from 'semantic-ui-react';

describe('tabs', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: []
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: []
      }
    ]
  };

  const formOptions = {
    renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
  };

  it('should render tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(wrapper.find(Tab)).toHaveLength(1);
    expect(wrapper.find(Tab.Pane)).toHaveLength(2);
  });

  it('should switch tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(
      wrapper
        .find(Tab.Pane)
        .first()
        .prop('active')
    ).toEqual(true);
    expect(
      wrapper
        .find(Tab.Pane)
        .last()
        .prop('active')
    ).toEqual(false);

    const secondTabButton = wrapper.find('a.item').last();
    secondTabButton.simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(Tab.Pane)
        .first()
        .prop('active')
    ).toEqual(false);
    expect(
      wrapper
        .find(Tab.Pane)
        .last()
        .prop('active')
    ).toEqual(true);
  });

  it('validate all tabs', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <FormRenderer
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} />}
        onSubmit={(values) => onSubmit(values)}
        schema={{
          fields: [
            {
              component: 'tabs',
              name: 'tabs1',
              title: 'tabs1',
              fields: [
                {
                  name: 'tabitem1',
                  component: 'tab-item',
                  fields: [
                    {
                      component: 'text-field',
                      name: 'name',
                      validate: [{ type: validatorTypes.REQUIRED }]
                    }
                  ]
                },
                {
                  name: 'tabitem2',
                  component: 'tab-item',
                  fields: [
                    {
                      component: 'text-field',
                      name: 'password',
                      validate: [{ type: validatorTypes.REQUIRED }]
                    }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'NAME' } });
    wrapper.update();

    wrapper.find('form').simulate('submit');
    wrapper.update();

    expect(onSubmit).not.toHaveBeenCalled();

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { value: 'PASSWORD' } });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ name: 'NAME', password: 'PASSWORD' });
  });
});
