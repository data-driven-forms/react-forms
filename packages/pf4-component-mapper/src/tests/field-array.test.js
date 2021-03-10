import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';
import { FormHelperText } from '@patternfly/react-core';

describe('<FieldArray/>', () => {
  let initialProps;
  let onSubmit;
  let wrapper;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      componentMapper,
      FormTemplate,
      onSubmit: (values) => onSubmit(values)
    };
  });

  it('renders with label and description + custom labels', async () => {
    const label = 'some title';
    const description = 'some description';
    const noItemsMessage = 'no items';

    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            label,
            description,
            noItemsMessage,
            buttonLabels: {
              add: 'CUSTOM ADD',
              remove: 'CUSTOM REMOVE'
            },
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'name'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find('input')).toHaveLength(0);
    expect(wrapper.text().includes(label)).toEqual(true);
    expect(wrapper.text().includes(description)).toEqual(true);
    expect(wrapper.text().includes(noItemsMessage)).toEqual(true);

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.text().includes(label)).toEqual(true);
    expect(wrapper.text().includes(description)).toEqual(true);
    expect(wrapper.text().includes(noItemsMessage)).toEqual(false);
  });

  it('allow to add/remove named fields', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: { name: 'enter a name', lastName: 'enter a last name' },
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'name'
              },
              {
                component: componentTypes.TEXT_FIELD,
                name: 'lastName'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }]
    });

    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('CloseIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: []
    });
  });

  it('allow to add/remove unnamed (array) fields', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: 'defaultItem',
            fields: [
              {
                component: componentTypes.TEXT_FIELD
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem']
    });

    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('CloseIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: []
    });
  });

  it('allow to add/remove within minItems/maxItems range', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: 'defaultItem',
            minItems: 1,
            maxItems: 2,
            fields: [
              {
                component: componentTypes.TEXT_FIELD
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem']
    });
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem']
    });
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem']
    });
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('CloseIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem']
    });
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('CloseIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem']
    });
  });

  it('shows error', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            validate: [{ type: validatorTypes.MIN_ITEMS, threshold: 3 }],
            fields: [
              {
                component: componentTypes.TEXT_FIELD
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find(FormHelperText)).toHaveLength(0);

    await act(async () => {
      wrapper
        .find('AddCircleOIcon')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(wrapper.find(FormHelperText).text()).toEqual('Must have at least 3 items.');
  });

  it('should render array field correctly with props', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: <label id="label">hello</label>,
            noItemsMessage: <h4 id="message">No items</h4>,
            description: <h3 id="desc">No description</h3>,
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find('label[id="label"]')).toHaveLength(1);
    expect(wrapper.find('h4[id="message"]')).toHaveLength(1);
    expect(wrapper.find('h3[id="desc"]')).toHaveLength(1);
    expect(
      wrapper
        .find('AddCircleOIcon')
        .props()
        .className.includes('disabled')
    ).toEqual(false);
    expect(wrapper.find('CloseIcon')).toHaveLength(0);
  });

  it('should render array field correctly with props and initial values', async () => {
    initialProps = {
      ...initialProps,
      initialValues: { foo: ['bar', 'foo'] },
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: <label id="label">hello</label>,
            noItemsMessage: <h4 id="message">No items</h4>,
            description: <h3 id="desc">No description</h3>,
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find('label[id="label"]')).toHaveLength(1);
    expect(wrapper.find('h4[id="message"]')).toHaveLength(0);
    expect(wrapper.find('h3[id="desc"]')).toHaveLength(1);
    expect(
      wrapper
        .find('AddCircleOIcon')
        .props()
        .className.includes('disabled')
    ).toEqual(false);
    expect(wrapper.find('CloseIcon')).toHaveLength(2);
    expect(wrapper.find('CloseIcon')).toHaveLength(2);
    expect(
      wrapper
        .find('CloseIcon')
        .first()
        .props()
        .className.includes('disabled')
    ).toEqual(false);
    expect(
      wrapper
        .find('CloseIcon')
        .last()
        .props()
        .className.includes('disabled')
    ).toEqual(false);
  });

  it('should remove nested field to form', async () => {
    initialProps = {
      ...initialProps,
      initialValues: { foo: ['first value'] },
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find('input')).toHaveLength(1);

    await act(async () => {
      wrapper.find('CloseIcon').simulate('click');
    });

    wrapper.update();
    expect(wrapper.find('input')).toHaveLength(0);
  });

  it('should extract dynamic field name if it contains custom name', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: 'Title',
            description: 'description',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'nested-component',
                label: 'foo'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find({ name: 'foo[0]nested-component' })).toBeTruthy();
  });

  it('should extract dynamic field name if it not contains name', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: 'Title',
            description: 'description',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo'
              }
            ]
          }
        ]
      }
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });

    expect(wrapper.find({ name: 'foo[0]' })).toBeTruthy();
  });
});
