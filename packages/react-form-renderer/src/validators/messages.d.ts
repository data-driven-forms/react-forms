type DescriptorFunction = (partial: string) => string;

interface Descriptor {
  id: string;
  defaultMessage: string | number | RegExp | DescriptorFunction;
}

interface MessageDescriptors {
  even: Descriptor;
  equalTo: Descriptor;
  greaterThan: Descriptor;
  greaterThanOrEqualTo: Descriptor;
  lessThan: Descriptor;
  lessThanOrEqualTo: Descriptor;
  mustBeBool: Descriptor;
  mustBeString: Descriptor;
  notANumber: Descriptor;
  odd: Descriptor;
  otherThan: Descriptor;
  pattern: Descriptor;
  required: Descriptor;
  tooLong: Descriptor;
  tooShort: Descriptor;
  wrongLength: Descriptor;
}

export type MessageTypes = "even"|"equalTo"|"greaterThan"|"greaterThanOrEqualTo"|"lessThan"|"lessThanOrEqualTo"|"mustBeBool"|"mustBeString"|"notANumber"|"odd"|"otherThan"|"pattern"|"required"|"tooLong"|"tooShort"|"wrongLength";

export default MessageDescriptors;
