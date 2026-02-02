/**
 * Parses internal select value based on isMulti attribute
 * @param value value of the ddf internal select implementaion
 * @param isMulti if true, select is multi value
 * @returns parsed value
 */
const parseInternalValue = (value: any, isMulti: boolean = false): any => {
  let internalValue = value;
  if (isMulti && Array.isArray(internalValue)) {
    internalValue = value.map((item: any) => (typeof item === 'object' ? item.value : item));
  }

  if (!isMulti && Array.isArray(internalValue) && internalValue[0]) {
    internalValue = typeof internalValue[0] === 'object' ? internalValue[0].value : internalValue[0];
  }

  if (!isMulti && Array.isArray(internalValue) && !internalValue[0]) {
    internalValue = undefined;
  }

  return internalValue;
};

export default parseInternalValue;
