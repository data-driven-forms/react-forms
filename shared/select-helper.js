/**
 * Returns an simple select value instead of whole object.
 * @param {Array} options list of select options. Options are objects with label and value keys
 * @param {boolean} multi mark multi select variat
 * @param {Any} value current value of input
 */
export const getSelectSimpleValue = (options, multi, selectedValue) => options.filter(({ value }) => multi ? selectedValue.includes(value) : value === selectedValue)

/**
 * Returns sorted simple multi select value
 * @param {Object} option select option
 */
export const pickSelectValue = option => option.map(item => item.value);

/**
 * Handles react-select onChange event
 * @param {Function} onChange function that handles selection
 * @param {Object} option selected object
 * @param {boolean} multi marks multi select variant
 * @param {boolean} simpleValue decides what type of value should be returned from selection
 */
export const selectChange = (onChange, option, multi, simpleValue) => {
  return simpleValue ? onChange(multi ? pickSelectValue(option) : option ? option.value : undefined) : onChange(option)
}
