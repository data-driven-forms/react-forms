import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';
import { StructuredListWrapper, Search, StructuredListRow, Button, TooltipIcon } from 'carbon-components-react';

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
          name: 'dual-StructuredListWrapper',
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
      FormTemplate: (props) => <FormTemplate {...props} showFormControls={false} />,
      schema
    };
  });

  it('renders correctly', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find(StructuredListWrapper)).toHaveLength(2);
    expect(wrapper.find(Search)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(4);
    expect(wrapper.find(StructuredListRow)).toHaveLength(schema.fields[0].options.length + 1); // + empty placeholder
  });

  it('switch left option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find(StructuredListRow)
        .first()
        .props()
        .onClick({});
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('button#move-right')
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats'] });
  });

  it('switch left option with holding ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .props()
        .onClick({});
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .props()
        .onClick({ ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('button#move-right')
        .props()
        .onClick();
    });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .props()
        .onClick({});
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .props()
        .onClick({ shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('button#move-right')
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch left option with holding and removing by ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .props()
        .onClick({});
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .props()
        .onClick({ shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .props()
        .onClick({ ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('button#move-right')
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch right option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-StructuredListWrapper': ['cats'] }} />);
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats'] });
    onSubmit.mockClear();
    await act(async () => {
      wrapper
        .find(StructuredListRow)
        .last()
        .props()
        .onClick({});
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('button#move-all-left')
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
        .find('button#move-all-right')
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch all to left', async () => {
    const wrapper = mount(
      <FormRenderer {...initialProps} initialValues={{ 'dual-StructuredListWrapper': schema.fields[0].options.map(({ value }) => value) }} />
    );
    await act(async () => {
      wrapper
        .find('button#move-all-left')
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
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
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
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
    ).toHaveLength(3);
    wrapper
      .find(StructuredListWrapper)
      .first()
      .find(StructuredListRow)
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('filters value', async () => {
    const wrapper = mount(
      <FormRenderer {...initialProps} initialValues={{ 'dual-StructuredListWrapper': schema.fields[0].options.map(({ value }) => value) }} />
    );

    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
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
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
    ).toHaveLength(3);
    wrapper
      .find(StructuredListWrapper)
      .last()
      .find(StructuredListRow)
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('sort options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(TooltipIcon)
        .at(0)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(TooltipIcon)
        .at(0)
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .first()
        .find(StructuredListRow)
        .last()
        .text()
    ).toEqual('zebras');
  });

  it('sort value', async () => {
    const wrapper = mount(
      <FormRenderer {...initialProps} initialValues={{ 'dual-StructuredListWrapper': schema.fields[0].options.map(({ value }) => value) }} />
    );

    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(TooltipIcon)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(TooltipIcon)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find(StructuredListWrapper)
        .last()
        .find(StructuredListRow)
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
          .find('button#move-all-right')
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['cats', 'cats_1', 'cats_2'] });
    });
  });

  describe('filtered value', () => {
    it('switch all visible to left', async () => {
      const wrapper = mount(
        <FormRenderer {...initialProps} initialValues={{ 'dual-StructuredListWrapper': schema.fields[0].options.map(({ value }) => value) }} />
      );
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
          .find('button#move-all-left')
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-StructuredListWrapper': ['zebras', 'pigeons'] });
    });
  });
});
