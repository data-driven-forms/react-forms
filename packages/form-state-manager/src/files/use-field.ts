import useSubscription from '../utils/use-subscription';
import AnyObject from './any-object';

export interface UseField extends AnyObject {
  name: string;
}

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
