import React from 'react';
import { useFormState } from 'react-final-form';

const FieldSpy = ({ fields, field, children }) => {
  const previousValues = React.useRef(Object.fromEntries(fields.map((field) => [field, null])));
  const [renderCounter, setRenderCounter] = React.useState(0);
  const memoizedChildren = React.useMemo(() => children(), [renderCounter, field]);
  const getChangedFields = React.useCallback((prev, next, arr) =>
    arr.filter((field) => {
      const nextVal = field.split('.').reduce((o, i) => (o ? o[i] : null), next);
      if (!prev[field] && !nextVal) {
        return false;
      }

      if (prev[field] !== nextVal) {
        return true;
      }

      return false;
    })
  );

  useFormState({
    subscription: { values: true },
    onChange: ({ values }) => {
      const changedFields = getChangedFields(previousValues.current, values, fields);
      if (changedFields.length) {
        setRenderCounter(renderCounter + 1);
        previousValues.current = { ...values };
      }
    },
  });

  return memoizedChildren;
};

export default FieldSpy;
