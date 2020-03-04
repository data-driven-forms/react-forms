import { useEffect } from 'react';
import { useFormState } from 'react-final-form';

const useComponentSpy = (onStateUpdate) => {
  const state = useFormState();
  useEffect(() => {
    if (onStateUpdate) {
      onStateUpdate(state);
    }
  });
};

export default useComponentSpy;
