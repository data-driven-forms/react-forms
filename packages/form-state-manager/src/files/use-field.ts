import useSubscription from '../utils/use-subscription';
import UseField, { UseFieldConfig } from '../types/use-field';

const useField = ({ name, validate, subscription, initialValue, ...rest }: UseFieldConfig): UseField => {
  const [value, onChange, onFocus, onBlur, meta] = useSubscription({ name, validate, subscription, initialValue });
  return {
    input: {
      name,
      onChange,
      value: value || '',
      onBlur,
      onFocus
    },
    meta,
    ...rest
  };
};

export default useField;
