/*
We need to collect all field-level conditions (legacy conditions) and remap those to the new
conditions structure.

Legacy example:
fields: [
    {
      name: 'Foo', // controlled field
      component: 'text-field',
    }, {
      name: 'BarFoo',
      label: 'Foo is Bar!',
      component: 'text-field',
      condition: {
        when: 'Foo', // name of controlled field
        is: 'Bar', // condition
      },
    },
  ]

Remapped condition
- unique key for each condition needs to be generated
- fieldName needed as key under then/else:

"legacy-BarFoo-0": {
  when: 'Foo',
  is: 'Bar',
  then: {
    BarFoo: {
      visible: true
    }
  }
  else: {
    BarFoo: {
      visible: false
    }
  }
},


*/

export const collectLegacyConditions = ({fields}) => {
  const conditions = {};
  let counter = 0;
  let prevName;

  fields.forEach(field => {
    const {name, condition} = field;
    if (name !== prevName) counter = 0;
    if (!condition) return;

    const key = `legacy-${name}-${counter}`;

    conditions[key] = {
      when: condition.when,
      is: condition.is,
      then: {
        [name]: {visible: false},
      },
      else: {
        [name]: {visible: true},
      },
    };

    prevName = name;
    counter++;
  });

  return conditions;
};
