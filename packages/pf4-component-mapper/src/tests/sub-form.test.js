import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { Title, Text } from '@patternfly/react-core';

describe('SubForm component', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      componentMapper,
      FormTemplate,
      onSubmit: jest.fn()
    };
  });

  it('should render SubForm correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          title: 'some title',
          description: 'some description',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input'
            }
          ]
        }
      ]
    };
    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(Title).text()).toEqual('some title');
    expect(wrapper.find(Text).text()).toEqual('some description');
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should render SubForm with description correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          title: 'some title',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input'
            }
          ]
        }
      ]
    };
    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(Title).text()).toEqual('some title');
    expect(wrapper.find(Text)).toHaveLength(0);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should render SubForm without title correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          description: 'some description',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input'
            }
          ]
        }
      ]
    };
    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(Title)).toHaveLength(0);
    expect(wrapper.find(Text).text()).toEqual('some description');
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
