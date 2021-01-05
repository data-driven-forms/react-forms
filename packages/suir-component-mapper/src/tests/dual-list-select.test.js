import React from 'react';
import { act } from 'react-dom/test-utils';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { componentMapper, FormTemplate } from '../index';
import FormFieldGrid from '../form-field-grid/form-field-grid';
import FormField from '../form-field/form-field';
import { Input, Icon, Segment } from 'semantic-ui-react';

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
    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find('input[type="search"]')).toHaveLength(2);
    expect(wrapper.find(Input)).toHaveLength(2);
    expect(wrapper.find(Icon)).toHaveLength(8);
    expect(wrapper.find(Segment)).toHaveLength(2);
  });

  it('switch left option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'angle right')
        .find('button')
        .simulate('click');
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
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'zebras')
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'angle right')
        .find('button')
        .simulate('click');
    });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'zebras')
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'angle right')
        .find('button')
        .simulate('click');
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
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'zebras')
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('List')
        .first()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'angle right')
        .find('button')
        .simulate('click');
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
        .find('List')
        .last()
        .findWhere((node) => node.prop('value') === 'cats')
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'angle left')
        .find('button')
        .simulate('click');
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
        .findWhere((node) => node.prop('icon') === 'angle double right')
        .find('button')
        .simulate('click');
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
        .findWhere((node) => node.prop('icon') === 'angle double left')
        .find('button')
        .simulate('click');
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
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
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
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
    ).toHaveLength(3);
    wrapper
      .find('List')
      .first()
      .findWhere((node) => typeof node.prop('value') === 'string')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('filters value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
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
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
    ).toHaveLength(3);
    wrapper
      .find('List')
      .last()
      .findWhere((node) => typeof node.prop('value') === 'string')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('sort options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'sort amount up')
        .first()
        .find('button')
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'sort amount down')
        .find('button')
        .first()
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('List')
        .first()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .last()
        .text()
    ).toEqual('zebras');
  });

  it('sort value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'sort amount up')
        .last()
        .find('button')
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .findWhere((node) => node.prop('icon') === 'sort amount down')
        .find('button')
        .last()
        .simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('List')
        .last()
        .findWhere((node) => typeof node.prop('value') === 'string')
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
          .findWhere((node) => node.prop('icon') === 'angle double right')
          .find('button')
          .last()
          .simulate('click');
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
          .findWhere((node) => node.prop('icon') === 'angle double left')
          .find('button')
          .last()
          .simulate('click');
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['zebras', 'pigeons'] });
    });
  });
});
