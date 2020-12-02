import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { Button, FormHelperText, IconButton, Typography } from '@material-ui/core';

import { componentMapper, FormTemplate } from '../index';
import { reducer } from '../field-array';

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

    expect(wrapper.find(Typography)).toHaveLength(3);
    expect(
      wrapper
        .find(Typography)
        .first()
        .text()
    ).toEqual('I am label');
    expect(
      wrapper
        .find(Typography)
        .at(1)
        .text()
    ).toEqual('I am description');
    expect(
      wrapper
        .find(Typography)
        .last()
        .text()
    ).toEqual('I have no items');

    expect(
      wrapper
        .find(Button)
        .first()
        .text()
    ).toEqual('CUSTOM ADD');

    await act(async () => {
      wrapper
        .find(Button)
        .first() // add buton
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find(Button)
        .at(1)
        .text()
    ).toEqual('CUSTOM REMOVE');
    expect(wrapper.find(Typography)).toHaveLength(2);
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
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .at(1) // remove button
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
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .at(1) // remove button
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
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .at(1) // remove button
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
        .find(Button)
        .at(1) // remove button
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
        .find(Button)
        .first() // add buton
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(wrapper.find(FormHelperText)).toHaveLength(1);
    expect(wrapper.find(FormHelperText).text()).toEqual('Must have at least 3 items.');
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

    await act(async () => {
      wrapper
        .find(Button)
        .first() // add buton
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
        .find(Button)
        .at(1) // remove button
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

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(0) // undo button
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
        .find(IconButton)
        .at(1) // redo button
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

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(0) // undo button
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

    await act(async () => {
      wrapper
        .find(Button)
        .first() // add buton
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find(IconButton)
        .at(1) // redo button
        .props().disabled // 'add' action resets history
    ).toEqual(true);
  });

  it('reducer - default state', () => {
    const initialState = { aa: 'aa' };

    expect(reducer(initialState, { type: 'nonsense' })).toEqual(initialState);
  });
});
