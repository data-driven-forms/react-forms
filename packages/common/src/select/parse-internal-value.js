/**
 * Parses internal select value based on isMulti attribute
 * @param {Array} value value of the ddf internal select implementaion
 * @param {Boolean} isMulti if true, select is multi value
 * @returns {Array|String|Number|Boolean|Object|undefined|null}
 */
const parseInternalValue = (value, isMulti = false) => {
  let internalValue = value;
  if (isMulti && Array.isArray(internalValue)) {
    internalValue = value.map((item) => (typeof item === 'object' ? item.value : item));
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
