import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

interface SelectOption {
  label: string | React.ReactNode;
  value?: any;
  key?: string;
  isDisabled?: boolean;
}

const options: SelectOption[] = [
  {
    label: 'Morton',
    value: 'Jenifer',
  },
  {
    label: 'Vega',
    value: 'Cervantes',
  },
  {
    label: 'Gilbert',
    value: 'Wallace',
  },
  {
    label: 'Jami',
    value: 'Cecilia',
  },
  {
    label: 'Ebony',
    value: 'Kay',
  },
];

const loadOptions = (inputValue: string = ''): Promise<SelectOption[]> => {
  return new Promise((res) =>
    setTimeout(() => {
      if (inputValue.length === 0) {
        return res(options.slice(0, 3));
      }

      return res(options.filter(({ label }) => typeof label === 'string' && label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())));
    }, 1500)
  );
};

const loadOptionsLong = (inputValue: string = ''): Promise<SelectOption[]> => {
  const longOptions: SelectOption[] = [...Array(99)].map((_v, index) => ({ label: `${index}`, value: { index } }));
  return new Promise((res) =>
    setTimeout(() => {
      if (inputValue.length === 0) {
        return res(longOptions.slice(0, 80));
      }

      return res(longOptions.filter(({ label }) => typeof label === 'string' && label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())));
    }, 1500)
  );
};

const selectSchema = {
  fields: [
    {
      component: componentTypes.SELECT,
      name: 'long-searchable-async-select',
      label: 'Long searchable async select',
      loadOptions: loadOptionsLong,
      compareValues: (a: any, b: any) => {
        console.log('Custom compare is beeing used.');
        return a.value === b.value;
      },
      isSearchable: true,
      menuIsPortal: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'simple-portal-select',
      label: 'Simple portal select',
      options,
      isSearchable: true,
      menuIsPortal: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'simple-async-select',
      label: 'Simple async select',
      loadOptions,
    },
    {
      component: componentTypes.SELECT,
      name: 'simple-searchable-async-select',
      label: 'Simple searchable async select',
      loadOptions,
      isSearchable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'multi-async-select',
      label: 'multi async select',
      loadOptions,
      isMulti: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'searchable-multi-async-select',
      label: 'Multi searchable async select',
      loadOptions,
      isSearchable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'multi-simple-select',
      label: 'Simple multi select',
      options,
      isMulti: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'multi-searchable-select',
      label: 'Searchable multi select',
      options,
      isMulti: true,
      isSearchable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'multi-clearable-searchable-select',
      label: 'Searchable clearable multi select',
      options,
      isMulti: true,
      isSearchable: true,
      isClearable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'simple-select',
      label: 'Simple-select',
      options,
    },
    {
      component: componentTypes.SELECT,
      name: 'disabled-select',
      label: 'Disabled-select',
      options,
      isDisabled: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'clearable-select',
      label: 'Clearable-select',
      options,
      isClearable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'searchable-select',
      label: 'Clearable-select',
      options,
      isSearchable: true,
    },
    {
      component: componentTypes.SELECT,
      name: 'dosbaled-option-select',
      label: 'Disabled-option-select',
      options: [...options, { label: 'Disabled option', value: 'disabled', isDisabled: true }],
    },
    {
      component: componentTypes.SELECT,
      name: 'translated-select',
      label: 'Translated-select',
      options: [
        {
          label: <span>None</span>,
          key: 'none',
        },
        {
          label: <span>Jack</span>,
          value: 'jack',
        },
      ],
    },
    {
      component: componentTypes.SELECT,
      name: 'translated-select-multi',
      label: 'Translated-select-multi',
      isMulti: true,
      options: [
        {
          label: <span>Jack</span>,
          value: 'jack',
        },
        {
          label: <span>Mary</span>,
          value: 'Mary',
        },
      ],
    },
  ],
};

export default {
  ...selectSchema,
  fields: [selectSchema.fields[0]],
};
