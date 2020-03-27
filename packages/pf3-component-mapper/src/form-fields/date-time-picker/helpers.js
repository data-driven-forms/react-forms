const createDateObject = (value) => {
  if (value === 'today') {
    return new Date();
  }

  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
};

export const createDisabledDays = (disabledDays) =>
  disabledDays.map((item) => {
    if (typeof item === 'object' && !(item instanceof Date) && !Array.isArray(item)) {
      return Object.keys(item).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: createDateObject(item[curr])
        }),
        {}
      );
    }

    return createDateObject(item);
  });
