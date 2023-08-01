import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
            label: 'cats',
          },
          {
            value: 'cats_1',
            label: 'cats_1',
          },
          {
            value: 'cats_2',
            label: 'cats_2',
          },
          {
            value: 'zebras',
            label: 'zebras',
          },
          {
            value: 'pigeons',
            label: 'pigeons',
          },
        ],
      },
    ],
    [
      'simple string values',
      {
        options: ['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons'],
      },
    ],
    [
      'node values',
      {
        getValueFromNode: (option) => option.props.children,
        options: [
          {
            value: 'cats',
            label: <span>cats</span>,
          },
          {
            value: 'cats_1',
            label: <span>cats_1</span>,
          },
          {
            value: 'cats_2',
            label: <span>cats_2</span>,
          },
          {
            value: 'zebras',
            label: <span>zebras</span>,
          },
          {
            value: 'pigeons',
            label: <span>pigeons</span>,
          },
        ],
      },
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
          <span key="pigeons">pigeons</span>,
        ],
      },
    ],
    [
      'tree variant',
      {
        isTree: true,
        options: [
          {
            value: 'cats',
            label: 'cats',
          },
          {
            value: 'cats_1',
            label: 'cats_1',
          },
          {
            value: 'cats_2',
            label: 'cats_2',
          },
          {
            value: 'zebras',
            label: 'zebras',
          },
          {
            value: 'pigeons',
            label: 'pigeons',
          },
        ],
      },
    ],
  ].forEach(([title, props]) => {
    describe(`${title} values`, () => {
      beforeEach(() => {
        onSubmit = jest.fn();

        schema = {
          fields: [
            {
              component: componentTypes.DUAL_LIST_SELECT,
              name: 'dual-list',
              ...props,
            },
          ],
        };

        initialProps = {
          onSubmit: (values) => onSubmit(values),
          componentMapper,
          FormTemplate,
          schema,
        };
      });

      it('renders correctly', () => {
        render(<FormRenderer {...initialProps} />);

        expect(screen.getByText('cats')).toBeInTheDocument();
        expect(screen.getByText('cats_1')).toBeInTheDocument();
        expect(screen.getByText('cats_2')).toBeInTheDocument();
        expect(screen.getByText('zebras')).toBeInTheDocument();
        expect(screen.getByText('pigeons')).toBeInTheDocument();
      });

      it('switch left option', async () => {
        render(<FormRenderer {...initialProps} />);

        await userEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenCalledWith({});

        await userEvent.click(screen.getByText('cats'));
        await userEvent.click(screen.getByLabelText('Add selected'));
        await userEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats'] });
      });

      it('switch right option', async () => {
        render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats'] }} />);

        await userEvent.click(screen.getByText('Submit'));
        expect(onSubmit).toHaveBeenLastCalledWith({ 'dual-list': ['cats'] });

        await userEvent.click(screen.getByText('cats'));
        await userEvent.click(screen.getByLabelText('Remove selected'));
        await userEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenLastCalledWith({});
      });

      it('switch all to right', async () => {
        render(<FormRenderer {...initialProps} />);

        await userEvent.click(screen.getByLabelText('Add all'));
        await userEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons'] });
      });

      it('switch all to left', async () => {
        render(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons'] }} />);

        await userEvent.click(screen.getByLabelText('Remove all'));
        await userEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenCalledWith({});
      });

      it('filters options', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSearchable: true,
            },
          ],
        };

        render(<FormRenderer {...initialProps} schema={schema} />);

        await userEvent.type(screen.getByLabelText('Available search input'), 'cats');

        expect(screen.getByText('cats')).toBeInTheDocument();
        expect(screen.getByText('cats_1')).toBeInTheDocument();
        expect(screen.getByText('cats_2')).toBeInTheDocument();
        expect(() => screen.getByText('zebras')).toThrow();
        expect(() => screen.getByText('pigeons')).toThrow();
      });

      it('filters value', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSearchable: true,
            },
          ],
        };

        render(
          <FormRenderer
            {...initialProps}
            schema={schema}
            initialValues={{
              'dual-list': schema.fields[0].options.map(
                (option) => option.value || (schema.fields[0].getValueFromNode && schema.fields[0].getValueFromNode(option)) || option
              ),
            }}
          />
        );

        await userEvent.type(screen.getByLabelText('Chosen search input'), 'cats');

        expect(screen.getByText('cats')).toBeInTheDocument();
        expect(screen.getByText('cats_1')).toBeInTheDocument();
        expect(screen.getByText('cats_2')).toBeInTheDocument();
        expect(() => screen.getByText('zebras')).toThrow();
        expect(() => screen.getByText('pigeons')).toThrow();
      });

      it('sort options', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSortable: true,
              availableOptionsActions: [<DualListSortButton position="left" key="sort" aria-label="sort-options" />],
              chosenOptionsActions: [<DualListSortButton position="right" key="sort" aria-label="sort-values" />],
            },
          ],
        };

        const { container } = render(<FormRenderer {...initialProps} schema={schema} />);
        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'cats',
          'cats_1',
          'cats_2',
          'pigeons',
          'zebras',
        ]);

        await userEvent.click(screen.getByLabelText('sort-options'));

        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'zebras',
          'pigeons',
          'cats_2',
          'cats_1',
          'cats',
        ]);

        await userEvent.click(screen.getByLabelText('sort-options'));

        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'cats',
          'cats_1',
          'cats_2',
          'pigeons',
          'zebras',
        ]);
      });

      it('sort value', async () => {
        schema = {
          fields: [
            {
              ...schema.fields[0],
              isSortable: true,
              availableOptionsActions: [<DualListSortButton position="left" key="sort" aria-label="sort-options" />],
              chosenOptionsActions: [<DualListSortButton position="right" key="sort" aria-label="sort-values" />],
            },
          ],
        };

        const { container } = render(
          <FormRenderer
            {...initialProps}
            schema={schema}
            initialValues={{
              'dual-list': schema.fields[0].options.map(
                (option) => option.value || (schema.fields[0].getValueFromNode && schema.fields[0].getValueFromNode(option)) || option
              ),
            }}
          />
        );

        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'cats',
          'cats_1',
          'cats_2',
          'pigeons',
          'zebras',
        ]);

        await userEvent.click(screen.getByLabelText('sort-values'));

        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'zebras',
          'pigeons',
          'cats_2',
          'cats_1',
          'cats',
        ]);

        await userEvent.click(screen.getByLabelText('sort-values'));

        expect([...container.getElementsByClassName('pf-v5-c-dual-list-selector__item-text')].map((e) => e.textContent)).toEqual([
          'cats',
          'cats_1',
          'cats_2',
          'pigeons',
          'zebras',
        ]);
      });
    });
  });
});
