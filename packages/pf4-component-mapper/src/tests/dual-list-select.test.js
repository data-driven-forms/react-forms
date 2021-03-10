import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { DualListSelector, FormGroup } from '@patternfly/react-core';
import { AngleDoubleLeftIcon, AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons';

import { componentMapper, FormTemplate } from '../index';
import DualListSortButton from '../dual-list-sort-button';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  [
    [
      'string values',
      {
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
    ],
    [
      'simple string values',
      {
        options: ['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons']
      }
    ],
    [
      'node values',
      {
        getValueFromNode: (option) => option.props.children,
        options: [
          {
            value: 'cats',
            label: <span>cats</span>
          },
          {
            value: 'cats_1',
            label: <span>cats_1</span>
          },
          {
            value: 'cats_2',
            label: <span>cats_2</span>
          },
          {
            value: 'zebras',
            label: <span>zebras</span>
          },
          {
            value: 'pigeons',
            label: <span>pigeons</span>
          }
        ]
      }
    ],
    [
      'simple node values',
      {
        getValueFromNode: (option) => option.props.children,
        options: [
          <span key="cats">cats</span>,
          <span key="cats_1">cats_1</span>,
          <span key="cats_2">cats_2</span>,
          <span key="zebras">zebras</span>,
          <span key="pigeons">pigeons</span>
        ]
      }
    ]
  ].forEach(([title, props]) => {
    describe(`${title} values`, () => {
      beforeEach(() => {
        onSubmit = jest.fn();

        schema = {
          fields: [
            {
              component: componentTypes.DUAL_LIST_SELECT,
              name: 'dual-list',
              ...props
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
        expect(wrapper.find(DualListSelector)).toHaveLength(1);
        expect(wrapper.find('.pf-c-dual-list-selector__item')).toHaveLength(5);
      });

      it('switch left option', async () => {
        const wrapper = mount(<FormRenderer {...initialProps} />);

        wrapper.find('form').simulate('submit');
        expect(onSubmit).toHaveBeenCalledWith({});
        onSubmit.mockClear();

        await act(async () => {
          wrapper
            .find('.pf-c-dual-list-selector__item')
            .first()
            .simulate('click');
        });
        wrapper.update();

        await act(async () => {
          wrapper
            .find(AngleRightIcon)
            .parent()
            .props()
            .onClick();
        });
        wrapper.update();

        await act(async () => {
          wrapper.find('form').simulate('submit');
        });

        expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
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
            .find('.pf-c-dual-list-selector__item')
            .last()
            .simulate('click');
        });
        wrapper.update();

        await act(async () => {
          wrapper
            .find(AngleLeftIcon)
            .parent()
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
            .find('.pf-c-dual-list-selector__controls-item')
            .find('button')
            .first()
            .simulate('click');
        });
        wrapper.update();

        await act(async () => {
          wrapper.find('form').simulate('submit');
        });

        expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons'] });
      });

      it('switch all to left', async () => {
        const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);
        await act(async () => {
          wrapper
            .find(AngleDoubleLeftIcon)
            .parent()
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
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSearchable: true
            }
          ]
        };

        const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
        ).toHaveLength(schema.fields[0].options.length);

        await act(async () => {
          wrapper
            .find('input')
            .first()
            .instance().value = 'cats';
          wrapper
            .find('input')
            .first()
            .simulate('change');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
        ).toHaveLength(3);
        wrapper
          .find('.pf-c-dual-list-selector__menu')
          .first()
          .find('.pf-c-dual-list-selector__item')
          .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
      });

      it('filters value', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSearchable: true
            }
          ]
        };

        const wrapper = mount(
          <FormRenderer
            {...initialProps}
            schema={schema}
            initialValues={{
              'dual-list': schema.fields[0].options.map(
                (option) => option.value || (schema.fields[0].getValueFromNode && schema.fields[0].getValueFromNode(option)) || option
              )
            }}
          />
        );

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
        ).toHaveLength(schema.fields[0].options.length);
        await act(async () => {
          wrapper
            .find('input')
            .last()
            .instance().value = 'cats';
          wrapper
            .find('input')
            .last()
            .simulate('change');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
        ).toHaveLength(3);
        wrapper
          .find('.pf-c-dual-list-selector__menu')
          .last()
          .find('.pf-c-dual-list-selector__item')
          .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
      });

      it('sort options', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSortable: true,
              availableOptionsActions: [<DualListSortButton position="left" key="sort" />],
              chosenOptionsActions: [<DualListSortButton position="right" key="sort" />]
            }
          ]
        };

        const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('cats');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('zebras');
        await act(async () => {
          wrapper
            .find('.pf-c-dual-list-selector__tools-actions')
            .first()
            .find('button')
            .simulate('click');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('zebras');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('cats');
        await act(async () => {
          wrapper
            .find('.pf-c-dual-list-selector__tools-actions')
            .first()
            .find('button')
            .simulate('click');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('cats');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .first()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('zebras');
      });

      it('sort value', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSortable: true,
              availableOptionsActions: [<DualListSortButton position="left" key="sort" />],
              chosenOptionsActions: [<DualListSortButton position="right" key="sort" />]
            }
          ]
        };

        const wrapper = mount(
          <FormRenderer
            {...initialProps}
            schema={schema}
            initialValues={{
              'dual-list': schema.fields[0].options.map(
                (option) => option.value || (schema.fields[0].getValueFromNode && schema.fields[0].getValueFromNode(option)) || option
              )
            }}
          />
        );

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('cats');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('zebras');
        await act(async () => {
          wrapper
            .find('.pf-c-dual-list-selector__tools-actions')
            .last()
            .find('button')
            .simulate('click');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('zebras');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('cats');
        await act(async () => {
          wrapper
            .find('.pf-c-dual-list-selector__tools-actions')
            .last()
            .find('button')
            .simulate('click');
        });
        wrapper.update();

        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .first()
            .text()
        ).toEqual('cats');
        expect(
          wrapper
            .find('.pf-c-dual-list-selector__menu')
            .last()
            .find('.pf-c-dual-list-selector__item')
            .last()
            .text()
        ).toEqual('zebras');
      });
    });
  });
});
