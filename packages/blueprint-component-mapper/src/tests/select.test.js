import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';
import { Select, MultiSelect } from '@blueprintjs/select';

import { itemPredicate, tagRenderer, multiOnChange } from '../select/select';

describe('<Select />', () => {
  it('renders select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('renders multi select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          initialValue: [1],
          isMulti: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(MultiSelect)).toHaveLength(1);
    expect(wrapper.find('.bp3-tag')).toHaveLength(1);
  });

  it('multi on change - undefined', () => {
    const onChange = jest.fn();
    multiOnChange({ value: '1' }, { onChange, value: undefined });

    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('multi on change - defined', () => {
    const onChange = jest.fn();
    multiOnChange({ value: '1' }, { onChange, value: ['2'] });

    expect(onChange).toHaveBeenCalledWith(['2', '1']);
  });

  it('multi on change - remove', () => {
    const onChange = jest.fn();
    multiOnChange({ value: '2' }, { onChange, value: ['2', '3'] });

    expect(onChange).toHaveBeenCalledWith(['3']);
  });

  it('tag renderer', () => {
    expect(
      tagRenderer('1', [
        { value: 2, label: '1' },
        { value: '1', label: 'selected' }
      ])
    ).toEqual('selected');
  });

  it('item predicate - no query', () => {
    expect(itemPredicate('', { label: 'pepa' })).toEqual({ label: 'pepa' });
  });

  it('item predicate - filter - not pass', () => {
    expect(itemPredicate('honza', { label: 'pepa' })).toEqual(undefined);
  });

  it('item predicate - filter - should pass', () => {
    expect(itemPredicate('PeP', { label: 'pepa' })).toEqual({ label: 'pepa' });
  });
});
