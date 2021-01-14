import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';

describe('<FieldArray/>', () => {
  let initialProps;
  let onSubmit;
  let wrapper;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      componentMapper: {
        ...componentMapper,
        [componentTypes.FIELD_ARRAY]: {
          component: componentMapper[componentTypes.FIELD_ARRAY],
          AddButtonProps: { id: 'add-button' },
          RemoveButtonProps: { id: 'remove-button' }
        }
      },
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

    expect(
      wrapper
        .find('#add-button')
        .first()
        .text()
    ).toEqual('CUSTOM ADD');

    await act(async () => {
      wrapper
        .find('#add-button')
        .first()
        .simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.text().includes(label)).toEqual(true);
    expect(wrapper.text().includes(description)).toEqual(true);
    expect(wrapper.text().includes(noItemsMessage)).toEqual(false);

    expect(
      wrapper
        .find('#remove-button')
        .first()
        .text()
    ).toEqual('CUSTOM REMOVE');
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
        .find('#add-button')
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
        .find('#remove-button')
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
        .find('#add-button')
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
        .find('#remove-button')
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
        .find('#add-button')
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
        .find('#add-button')
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
        .find('#add-button')
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
        .find('#remove-button')
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
        .find('#remove-button')
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

    expect(wrapper.find('.bp3-form-helper-text')).toHaveLength(0);

    await act(async () => {
      wrapper
        .find('#add-button')
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

    expect(wrapper.find('.bp3-form-helper-text').text()).toEqual('Must have at least 3 items.');
  });
});
