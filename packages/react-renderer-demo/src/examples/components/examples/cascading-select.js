import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import Select from '@data-driven-forms/mui-component-mapper/select';

const mockApi = (type) => {
  console.log(type);
  switch (type) {
    case 'vegetable':
      return Promise.resolve([
        { label: 'Carrot', value: 'carrot' },
        { label: 'Potato', value: 'potato' },
      ]);
    case 'fruit':
      return Promise.resolve([
        { label: 'Apple', value: 'apple' },
        { label: 'Orange', value: 'orange' },
      ]);
    case 'pasta':
      return Promise.resolve([
        { label: 'Manicotti', value: 'manicotti' },
        { label: 'Rotini', value: 'rotini' },
        { label: 'Tortellini', value: 'tortellini' },
        { label: 'Bucatini', value: 'bucatini' },
      ]);
    default:
      return Promise.resolve([]);
  }
};

const counterMapper = (type) => {
  switch (type) {
    case 'vegetable':
      return 3;
    case 'fruit':
      return 2;
    case 'pasta':
      return 1;
    default:
      return 0;
  }
};

const schema = {
  fields: [
    {
      component: 'select',
      name: 'favorite',
      label: 'Select your favorite category of food',
      options: [
        { label: 'Vegetable', value: 'vegetable' },
        { label: 'Fruit', value: 'fruit' },
        { label: 'Pasta', value: 'pasta' },
      ],
    },
    {
      component: 'enhanced-select',
      name: 'food',
      label: 'Select your favorite food of the selected category',
      onInputChange: () => null,
      noOptionsMessage: 'Select category first',
      resolveProps: (_props, _field, { getState }) => {
        const favoriteValue = getState().values.favorite;

        return {
          loadOptionsChangeCounter: counterMapper(favoriteValue),
          loadOptions: () => mockApi(favoriteValue),
        };
      },
    },
  ],
};

const EnhancedSelect = (props) => <FormSpy subscription={{ values: true }}>{() => <Select {...props} />}</FormSpy>;

const componentMapper = {
  [componentTypes.SELECT]: Select,
  'enhanced-select': EnhancedSelect,
};

const CascadingSelect = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;
CascadingSelect.displayName = 'Cascading select';

export default CascadingSelect;
