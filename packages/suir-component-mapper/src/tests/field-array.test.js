import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';
import { reducer } from '../field-array';
import { Header, Button } from 'semantic-ui-react';

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
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            label: 'I am label',
            description: 'I am description',
            noItemsMessage: 'I have no items',
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

    expect(wrapper.find(Header)).toHaveLength(2);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(
      wrapper
        .find(Header)
        .first()
        .text()
    ).toEqual('I am label');
    expect(
      wrapper
        .find(Header)
        .at(1)
        .text()
    ).toEqual('I am description');
    expect(
      wrapper
        .find('p')
        .last()
        .text()
    ).toEqual('I have no items');

    expect(
      wrapper
        .find('button.ui.blue.button')
        .first()
        .text()
    ).toEqual('CUSTOM ADD');

    /**
     * Add new item to field array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
        .first()
        .simulate('click');
    });
    wrapper.update();
    expect(
      wrapper
        .find(Button)
        .at(3)
        .text()
    ).toEqual('CUSTOM REMOVE');
    expect(wrapper.find('p')).toHaveLength(0);
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Click remove button
     */
    await act(async () => {
      wrapper.find('button.ui.red.basic.button').simulate('click');
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Click remove button
     */
    await act(async () => {
      wrapper.find('button.ui.red.basic.button').simulate('click');
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Click remove button
     */
    await act(async () => {
      wrapper
        .find('button.ui.red.basic.button')
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

    /**
     * Click remove button
     */
    await act(async () => {
      wrapper
        .find('button.ui.red.basic.button')
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

    expect(wrapper.find('.ddorg__suir__mapper__field-array-error')).toHaveLength(0);

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    expect(wrapper.find('.ddorg__suir__mapper__field-array-error')).toHaveLength(1);
    expect(wrapper.find('.ddorg__suir__mapper__field-array-error').text()).toEqual('Must have at least 3 items.');
  });

  it('allow to revert removal', async () => {
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
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

    /**
     * Click remove button
     */
    await act(async () => {
      wrapper
        .find('button.ui.red.basic.button')
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

    onSubmit.mockClear();

    /**
     * Undo last action
     */
    await act(async () => {
      wrapper
        .find('button.ddorg__suir__mapper__field-array-undo')
        .at(0)
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

    /**
     * Redo last action
     */
    await act(async () => {
      wrapper
        .find('button.ddorg__suir__mapper__field-array-redo')
        .at(0)
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

    /**
     * Undo last action
     */
    await act(async () => {
      wrapper
        .find('button.ddorg__suir__mapper__field-array-undo')
        .at(0)
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

    /**
     * Add new item to the array
     */
    await act(async () => {
      wrapper
        .find('button.ui.blue.button')
        .first()
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find('button.ddorg__suir__mapper__field-array-redo')
        .at(0) // redo button
        .prop('disabled') // 'add' action resets history
    ).toEqual(true);
  });

  it('reducer - default state', () => {
    const initialState = { aa: 'aa' };

    expect(reducer(initialState, { type: 'nonsense' })).toEqual(initialState);
  });
});
