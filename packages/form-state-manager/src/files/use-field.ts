import useSubscription from '../utils/use-subscription';
import UseField from '../types/use-field';

const useField = ({ name, ...rest }: UseField) => {
  const [value, onChange, onFocus, onBlur] = useSubscription({ name });
  return {
    input: {
      name,
      onChange,
      value: value || '',
      onBlur,
      onFocus
    },
    ...rest
  };
};

export default useField;
