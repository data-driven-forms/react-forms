// babel-plugin-react-intl.
const defineMessages = messageDescriptors => {
  return messageDescriptors;
};

let messages = defineMessages({
  even: {
    id: 'form.errors.even',
    defaultMessage: 'Number must be even',
  },
  equalTo: {
    id: 'form.errors.equalTo',
    defaultMessage: equal => `must be equal to ${equal}.`,
  },
  greaterThan: {
    id: 'form.errors.greaterThan',
    defaultMessage: number => `Value must be greater than ${number}.`,
  },
  greaterThanOrEqualTo: {
    id: 'form.errors.greaterThanOrEqualTo',
    defaultMessage: number => `Value must be greater than or equal to ${number}.`,
  },
  lessThan: {
    id: 'form.errors.lessThan',
    defaultMessage: number => `Value must be less than ${number}`,
  },
  lessThanOrEqualTo: {
    id: 'form.errors.lessThanOrEqualTo',
    defaultMessage: number => `Value must be less than or equal to ${number}`,
  },
  mustBeBool: {
    id: 'forms.errors.mustBeBool',
    defaultMessage: 'Value must be boolean.',
  },
  mustBeString: {
    id: 'form.errors.mustBeString',
    defaultMessage: 'Value must be a string',
  },
  notANumber: {
    id: 'form.errors.notANumber',
    defaultMessage: 'Value is not a number',
  },
  odd: {
    id: 'form.errors.odd',
    defaultMessage: 'Number must be odd',
  },
  otherThan: {
    id: 'form.errors.otherThan',
    defaultMessage: number => `Value must be other than ${number}.`,
  },
  pattern: {
    id: 'form.errors.required',
    defaultMessage: pattern => `Value does not match pattern: ${pattern}.`,
  },
  required: {
    id: 'form.errors.required',
    defaultMessage: 'Required',
  },
  tooLong: {
    id: 'form.errors.tooLong',
    defaultMessage: count => `Can have maximum of ${count} characters.`,
  },
  tooShort: {
    id: 'form.errors.tooShort',
    defaultMessage: count => `Must have at least ${count} characters.`,
  },
  wrongLength: {
    id: 'form.errors.wrongLength',
    defaultMessage: count => `Should be ${count} characters long.`,
  },
});

export default messages;
