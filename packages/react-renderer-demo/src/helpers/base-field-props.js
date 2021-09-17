const baseFieldProps = [
  {
    name: 'name',
    type: 'string',
    required: true,
  },
  {
    name: 'label',
    type: 'string',
    required: false,
  },
  {
    name: 'helperText',
    type: 'string',
    required: false,
  },
  {
    name: 'description',
    type: 'string',
    required: false,
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    required: false,
  },
  {
    name: 'isReadOnly',
    type: 'boolean',
    required: false,
  },
];

export default baseFieldProps;
