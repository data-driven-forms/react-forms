const flatOptions = (options) => options.flatMap((option) => (option.options ? [{ group: option.label }, ...option.options] : [option]));

export default flatOptions;
