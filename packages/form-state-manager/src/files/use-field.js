import useSubscription from '../utils/use-subscription';

const useField = ({ name, ...rest }) => {
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
