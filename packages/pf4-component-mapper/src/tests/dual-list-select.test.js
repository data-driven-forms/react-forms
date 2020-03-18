import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { FormGroup, TextInput } from '@patternfly/react-core';
import { DataToolbar } from '@patternfly/react-core/dist/js/experimental';
import {
  SearchIcon,
  SortAlphaUpIcon,
  SortAlphaDownIcon,
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleLeftIcon,
  AngleRightIcon
} from '@patternfly/react-icons';

import { componentMapper, FormTemplate } from '../index';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();

    schema = {
      fields: [
        {
          component: 'dual-list-select',
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

    expect(wrapper.find(FormGroup)).toHaveLength(1);
    expect(wrapper.find(DataToolbar)).toHaveLength(2);
    expect(wrapper.find(TextInput)).toHaveLength(2);
    expect(wrapper.find(SearchIcon)).toHaveLength(2);
    expect(wrapper.find(SortAlphaUpIcon)).toHaveLength(2);
    expect(wrapper.find(SortAlphaDownIcon)).toHaveLength(0);
    expect(wrapper.find(AngleRightIcon)).toHaveLength(1);
    expect(wrapper.find(AngleLeftIcon)).toHaveLength(1);
    expect(wrapper.find(AngleDoubleRightIcon)).toHaveLength(1);
    expect(wrapper.find(AngleDoubleLeftIcon)).toHaveLength(1);
    expect(wrapper.find('select')).toHaveLength(2);
    expect(wrapper.find('option')).toHaveLength(schema.fields[0].options.length + 1); // + placeholder 'No options'
  });

  it('switch left option', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    wrapper
      .find('option')
      .first()
      .simulate('click');
    wrapper.update();

    wrapper
      .find(AngleRightIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
  });

  it('switch left option with holding ctrl', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper
      .find('select')
      .first()
      .find('option')
      .first()
      .simulate('click');
    wrapper.update();
    wrapper
      .find('select')
      .first()
      .find('option')
      .last()
      .simulate('click', { ctrlKey: true });
    wrapper.update();

    wrapper
      .find(AngleRightIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper
      .find('select')
      .first()
      .find('option')
      .first()
      .simulate('click');
    wrapper.update();
    wrapper
      .find('select')
      .first()
      .find('option')
      .last()
      .simulate('click', { shiftKey: true });
    wrapper.update();

    wrapper
      .find(AngleRightIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch left option with holding and removing by ctrl', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper
      .find('select')
      .first()
      .find('option')
      .first()
      .simulate('click');
    wrapper.update();
    wrapper
      .find('select')
      .first()
      .find('option')
      .last()
      .simulate('click', { shiftKey: true });
    wrapper.update();
    wrapper
      .find('select')
      .first()
      .find('option')
      .first()
      .simulate('click', { ctrlKey: true });
    wrapper.update();

    wrapper
      .find(AngleRightIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch right option', () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats'] }} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
    onSubmit.mockClear();

    wrapper
      .find('option')
      .last()
      .simulate('click');
    wrapper.update();

    wrapper
      .find(AngleLeftIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('switch all to right', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper
      .find(AngleDoubleRightIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch all to left', () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    wrapper
      .find(AngleDoubleLeftIcon)
      .parent()
      .props()
      .onClick();
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('filters options', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
    ).toHaveLength(schema.fields[0].options.length);

    wrapper
      .find('input')
      .first()
      .instance().value = 'cats';
    wrapper
      .find('input')
      .first()
      .simulate('change');
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
    ).toHaveLength(3);
    wrapper
      .find('select')
      .first()
      .find('option')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('filters value', () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
    ).toHaveLength(schema.fields[0].options.length);

    wrapper
      .find('input')
      .last()
      .instance().value = 'cats';
    wrapper
      .find('input')
      .last()
      .simulate('change');
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
    ).toHaveLength(3);
    wrapper
      .find('select')
      .last()
      .find('option')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('sort options', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .last()
        .text()
    ).toEqual('zebras');

    wrapper
      .find(SortAlphaUp)
      .first()
      .parent()
      .props()
      .onClick();
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .last()
        .text()
    ).toEqual('cats');

    wrapper
      .find(SortAlphaDown)
      .first()
      .parent()
      .props()
      .onClick();
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('select')
        .first()
        .find('option')
        .last()
        .text()
    ).toEqual('zebras');
  });

  it('sort value', () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .last()
        .text()
    ).toEqual('zebras');

    wrapper
      .find(SortAlphaUp)
      .last()
      .parent()
      .props()
      .onClick();
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .last()
        .text()
    ).toEqual('cats');

    wrapper
      .find(SortAlphaDown)
      .last()
      .parent()
      .props()
      .onClick();
    wrapper.update();

    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('select')
        .last()
        .find('option')
        .last()
        .text()
    ).toEqual('zebras');
  });

  describe('filtered options', () => {
    it('switch all visible to right', () => {
      const wrapper = mount(<FormRenderer {...initialProps} />);

      wrapper
        .find('input')
        .first()
        .instance().value = 'cats';
      wrapper
        .find('input')
        .first()
        .simulate('change');
      wrapper.update();

      wrapper
        .find(AngleDoubleRightIcon)
        .parent()
        .props()
        .onClick();
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2'] });
    });
  });

  describe('filtered value', () => {
    it('switch all visible to left', () => {
      const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

      wrapper
        .find('input')
        .last()
        .instance().value = 'cats';
      wrapper
        .find('input')
        .last()
        .simulate('change');
      wrapper.update();

      wrapper
        .find(AngleDoubleLeftIcon)
        .parent()
        .props()
        .onClick();
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['zebras', 'pigeons'] });
    });
  });
});
