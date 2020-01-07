const loadOptions = () => new Promise((res) => {
  setTimeout(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(data => data.json())
    .then(({ message: { bulldog }}) => bulldog.map(dog => ({ label: dog, value: dog })))
    .then(data => res(data));
  }, 1000);
});

const selectSchema = {
  fields: [{
    component: 'select-field',
    name: 'async-single',
    label: 'Async single',
    multi: true,
    loadOptions,
  }, {
    component: 'select-field',
    name: 'async-single-search',
    label: 'Async single search',
    isSearchable: true,
    loadOptions,
  }, {
    component: 'select-field',
    name: 'async-multi-search',
    label: 'Async multi search',
    isSearchable: true,
    multi: true,
    loadOptions,
  }, {
    component: 'select-field',
    name: 'select-single',
    label: 'Select single',
    isDisabled: true,
    options: [{
      label: 'foo',
      value: 123,
    }, {
      label: 'bar',
      value: 231,
    }],
  }, {
    component: 'select-field',
    name: 'select-search',
    label: 'Select search',
    isRequired: true,
    validateOnMount: true,
    isDisabled: true,
    isClearable: true,
    multi: true,
    isSearchable: true,
    placeholder: 'Placeholder',
    initialValue: [ 123 ],
    validate: [{
      type: 'required-validator',
    }],
    options: [{
      label: 'foo',
      value: 123,
    }, {
      label: 'bar',
      value: 231,
    }, {
      label: 'Super long option label, Super long option label, Super long option label, Super long option label, Super long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option label',
      value: 'x',
    }],
  }, {
    component: 'select-field',
    name: 'select',
    label: 'Select',
    isRequired: true,
    validateOnMount: true,
    isClearable: true,
    multi: false,
    isSearchable: true,
    placeholder: 'Placeholder',
    validate: [{
      type: 'required-validator',
    }],
    options: [{
      label: 'foo',
      value: 123,
    }, {
      label: 'bar',
      value: 231,
    }, {
      label: 'Super long option label, Super long option label, Super long option label, Super long option label, Super long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option labelSuper long option label, Super long option label',
      value: 'x',
    }],
  }],
};

export default selectSchema;
