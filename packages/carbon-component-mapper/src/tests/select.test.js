import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { getMultiValue } from '../select/select';

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
            { label: 'option 2', value: 2 },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('select', { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText('option 1', { selector: 'option' })).toBeInTheDocument();
    expect(screen.getByText('option 2', { selector: 'option' })).toBeInTheDocument();
  });

  it('renders select with categories', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          options: [
            {
              label: 'Category 1',
              options: [
                { label: 'value 1', value: '111' },
                { label: 'value 2', value: '222' },
              ],
            },
            {
              label: 'Category 2',
              options: [
                { label: 'value 3', value: '333' },
                { label: 'value 4', value: '444' },
              ],
            },
          ],
        },
      ],
    };

    const { container } = render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('select', { selector: 'label' })).toBeInTheDocument();

    expect([...container.getElementsByTagName('optgroup')].map((x) => x.label)).toEqual(['Category 1', 'Category 2']);

    expect(screen.getByText('value 1', { selector: 'option' })).toBeInTheDocument();
    expect(screen.getByText('value 2', { selector: 'option' })).toBeInTheDocument();

    expect(screen.getByText('value 3', { selector: 'option' })).toBeInTheDocument();
    expect(screen.getByText('value 4', { selector: 'option' })).toBeInTheDocument();
  });

  ['isSearchable', 'isClearable'].forEach((setting) => {
    it(`renders select ${setting}`, () => {
      const schema = {
        fields: [
          {
            component: componentTypes.SELECT,
            name: 'select',
            label: 'select',
            [setting]: true,
            options: [
              { label: 'option 1', value: 1 },
              { label: 'option 2', value: 2 },
            ],
          },
        ],
      };

      render(
        <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument(1);
    });
  });

  it('should render initial value label text when only value is passed as initial value', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          isSearchable: true,
          isClearable: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 },
          ],
        },
      ],
    };

    render(
      <FormRenderer
        initialValues={{ select: 1 }}
        onSubmit={jest.fn()}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('option 1');
  });

  it('should render initial value label text when only value is passed as initial value with simpleValue option', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          isSearchable: true,
          isClearable: true,
          simpleValue: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 },
          ],
        },
      ],
    };

    render(
      <FormRenderer
        initialValues={{ select: 1 }}
        onSubmit={jest.fn()}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('option 1');
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
            { label: 'option 2', value: 2 },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('Choose...')).toHaveAttribute('id', 'multiselect-field-label-1');
  });

  ['isSearchable', 'isClearable'].forEach((setting) => {
    it(`renders multi select - ${setting}`, () => {
      const schema = {
        fields: [
          {
            component: componentTypes.SELECT,
            name: 'select',
            label: 'select',
            initialValue: [1],
            isMulti: true,
            [setting]: true,
            options: [
              { label: 'option 1', value: 1 },
              { label: 'option 2', value: 2 },
            ],
          },
        ],
      };

      render(
        <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('getMultiValue', () => {
    let value;
    let options;

    beforeEach(() => {
      value = undefined;
      options = [];
    });

    it('undefined', () => {
      expect(getMultiValue(value, options)).toEqual([]);
    });

    it('array', () => {
      value = ['dogs'];
      options = [
        { label: 'cats', value: 'cats' },
        { label: 'dogs', value: 'dogs' },
      ];

      expect(getMultiValue(value, options)).toEqual([{ label: 'dogs', value: 'dogs' }]);
    });

    it('single', () => {
      value = 'dogs';
      options = [
        { label: 'cats', value: 'cats' },
        { label: 'dogs', value: 'dogs' },
      ];

      expect(getMultiValue(value, options)).toEqual([{ label: 'dogs', value: 'dogs' }]);
    });
  });
});
