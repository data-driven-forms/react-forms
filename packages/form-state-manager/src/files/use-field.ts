import useSubscription from '../utils/use-subscription';
import UseField from '../types/use-field';

const useField = ({ name, ...rest }: UseField) => {
  const [value, onChange] = useSubscription({ name });
  return {
    input: {
      name,
      onChange,
      value: value || ''
    },
    ...rest
  };
};

export default useField;
