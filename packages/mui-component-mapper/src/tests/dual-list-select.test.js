import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { List, ListItem, IconButton, Toolbar, TextField } from '@material-ui/core';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import SortIcon from '@material-ui/icons/ArrowUpward';

import { componentMapper, FormTemplate } from '../index';
import FormFieldGrid from '../form-field-grid';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();

    schema = {
      fields: [
        {
          component: componentTypes.DUAL_LIST_SELECT,
          name: 'dual-list',
          options: [
            {
              value: 'cats',
              label: 'cats'
            },
            {
              value: 'cats_1',
              label: 'cats_1'
            },
            {
              value: 'cats_2',
              label: 'cats_2'
            },
            {
              value: 'zebras',
              label: 'zebras'
            },
            {
              value: 'pigeons',
              label: 'pigeons'
            }
          ]
        }
      ]
    };

    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate,
      schema
    };
  });

  it('renders correctly', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find(FormFieldGrid)).toHaveLength(1);
    expect(wrapper.find(Toolbar)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(SortIcon)).toHaveLength(2);
    expect(wrapper.find(ChevronRightIcon)).toHaveLength(1);
    expect(wrapper.find(DoubleArrowIcon)).toHaveLength(2);
    expect(wrapper.find(ChevronLeftIcon)).toHaveLength(1);
    expect(wrapper.find(List)).toHaveLength(2);
    expect(wrapper.find(ListItem)).toHaveLength(schema.fields[0].options.length + 1); // + empty placeholder
  });

  it('switch left option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find(ListItem)
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(1)
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
  });

  it('switch left option with holding ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(1)
        .props()
        .onClick();
    });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(1)
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch left option with holding and removing by ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(1)
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch right option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats'] }} />);
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
    onSubmit.mockClear();
    await act(async () => {
      wrapper
        .find(ListItem)
        .last()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(IconButton)
        .at(4)
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('switch all to right', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);
    await act(async () => {
      wrapper
        .find(IconButton)
        .at(2)
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch all to left', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);
    await act(async () => {
      wrapper
        .find(IconButton)
        .at(3)
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('filters options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
    ).toHaveLength(schema.fields[0].options.length);
    await act(async () => {
      wrapper
        .find('input')
        .first()
        .instance().value = 'cats';
    });
    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('change');
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
    ).toHaveLength(3);
    wrapper
      .find(List)
      .first()
      .find(ListItem)
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('filters value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
    ).toHaveLength(schema.fields[0].options.length);
    await act(async () => {
      wrapper
        .find('input')
        .last()
        .instance().value = 'cats';
    });

    await act(async () => {
      wrapper
        .find('input')
        .last()
        .simulate('change');
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
    ).toHaveLength(3);
    wrapper
      .find(List)
      .last()
      .find(ListItem)
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('sort options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(IconButton)
        .at(0)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(IconButton)
        .at(0)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(List)
        .first()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('zebras');
  });

  it('sort value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(IconButton)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(IconButton)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(List)
        .last()
        .find(ListItem)
        .last()
        .text()
    ).toEqual('zebras');
  });

  describe('filtered options', () => {
    it('switch all visible to right', async () => {
      const wrapper = mount(<FormRenderer {...initialProps} />);
      await act(async () => {
        wrapper
          .find('input')
          .first()
          .instance().value = 'cats';
      });

      await act(async () => {
        wrapper
          .find('input')
          .first()
          .simulate('change');
      });
      wrapper.update();
      await act(async () => {
        wrapper
          .find(IconButton)
          .at(2)
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2'] });
    });
  });

  describe('filtered value', () => {
    it('switch all visible to left', async () => {
      const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);
      await act(async () => {
        wrapper
          .find('input')
          .last()
          .instance().value = 'cats';
      });
      await act(async () => {
        wrapper
          .find('input')
          .last()
          .simulate('change');
      });
      wrapper.update();

      await act(async () => {
        wrapper
          .find(IconButton)
          .at(3)
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['zebras', 'pigeons'] });
    });
  });
});
