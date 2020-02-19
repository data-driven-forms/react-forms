import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormRenderer, { componentTypes as components } from '@data-driven-forms/react-form-renderer';
import { TextInput } from '@patternfly/react-core';

import AddCircleOIcon from '@patternfly/react-icons/dist/js/icons/add-circle-o-icon';
import CloseIcon from '@patternfly/react-icons/dist/js/icons/close-icon';
import { componentMapper, formTemplate } from '../../index';

describe('FieldArray', () => {
  const ContextWrapper = ({ initialValues = {}, ...rest }) => (
    <FormRenderer formFieldsMapper={componentMapper} formTemplate={formTemplate()} initialValues={initialValues} onSubmit={jest.fn()} {...rest} />
  );

  it('should render array field correctly', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        fields: [
          {
            component: components.TEXT_FIELD,
            name: 'nested component',
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper schema={{ fields: formFields }} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render array field correctly with props', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: <label id="label">hello</label>,
        noItemsMessage: <h4 id="message">No items</h4>,
        description: <h3 id="desc">No description</h3>,
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper schema={{ fields: formFields }} />);

    expect(wrapper.find('label[id="label"]')).toHaveLength(1);
    expect(wrapper.find('h4[id="message"]')).toHaveLength(1);
    expect(wrapper.find('h3[id="desc"]')).toHaveLength(1);
    expect(
      wrapper
      .find(AddCircleOIcon)
      .props()
      .className.includes('disabled')
    ).toEqual(false);
    expect(wrapper.find(CloseIcon)).toHaveLength(0);
  });

  it('should render array field correctly with props and initial values', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: <label id="label">hello</label>,
        noItemsMessage: <h4 id="message">No items</h4>,
        description: <h3 id="desc">No description</h3>,
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['bar', 'foo']}} schema={{ fields: formFields }} />);

    expect(wrapper.find('label[id="label"]')).toHaveLength(1);
    expect(wrapper.find('h4[id="message"]')).toHaveLength(0);
    expect(wrapper.find('h3[id="desc"]')).toHaveLength(1);
    expect(
      wrapper
      .find(AddCircleOIcon)
      .props()
      .className.includes('disabled')
    ).toEqual(false);
    expect(wrapper.find(CloseIcon)).toHaveLength(2);
    expect(wrapper.find(CloseIcon)).toHaveLength(2);
    expect(
      wrapper
      .find(CloseIcon)
      .first()
      .props()
      .className.includes('disabled')
    ).toEqual(false);
    expect(
      wrapper
        .find(CloseIcon)
      .last()
      .props()
      .className.includes('disabled')
    ).toEqual(false);
  });

  it('should add nested field to form', (done) => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        fields: [
          {
            component: components.TEXT_FIELD,
            name: 'nested component',
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper schema={{ fields: formFields }} />);

    expect(wrapper.find(TextInput)).toHaveLength(0);
    wrapper.find(AddCircleOIcon).simulate('click');

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(TextInput)).toHaveLength(1);
      done();
    });
  });

  it('should remove nested field to form', (done) => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['first value']}} schema={{ fields: formFields }} />);

    expect(wrapper.find(TextInput)).toHaveLength(1);
    wrapper.find(CloseIcon).simulate('click');

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(TextInput)).toHaveLength(0);
      done();
    });
  });

  it('should extract dynamic field name if it contains custom name', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: 'Title',
        description: 'description',
        fields: [
          {
            component: components.TEXT_FIELD,
            name: 'nested-component',
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['bar']}} schema={{ fields: formFields }} />);
    expect(wrapper.find({ name: 'foo[0]nested-component' })).toBeTruthy();
  });

  it('should extract dynamic field name if it not contains name', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: 'Title',
        description: 'description',
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['bar']}} schema={{ fields: formFields }} />);
    expect(wrapper.find({ name: 'foo[0]' })).toBeTruthy();
  });

  it('should disable add buton when maxItem is reached', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: 'Title',
        description: 'description',
        maxItems: 2,
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['bar', 'foo']}} schema={{ fields: formFields }} />);

    expect(
      wrapper
      .find(AddCircleOIcon)
      .props()
      .className.includes('disabled')
    ).toEqual(true);
  });

  it('should disable add buton when maxItem is reached', () => {
    const formFields = [
      {
        component: components.FIELD_ARRAY,
        name: 'foo',
        label: 'Title',
        description: 'description',
        minItems: 2,
        fields: [
          {
            component: components.TEXT_FIELD,
            label: 'foo'
          }
        ]
      }
    ];

    const wrapper = mount(<ContextWrapper initialValues={{ foo: ['bar', 'foo']}} schema={{ fields: formFields }} />);

    expect(wrapper.find(CloseIcon)).toHaveLength(2);
    expect(
      wrapper
      .find(CloseIcon)
      .first()
      .props()
      .className.includes('disabled')
    ).toEqual(true);
    expect(
      wrapper
      .find(CloseIcon)
      .last()
      .props()
      .className.includes('disabled')
    ).toEqual(true);
  });
});
