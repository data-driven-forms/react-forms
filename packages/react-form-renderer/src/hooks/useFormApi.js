import { useContext } from 'react';
import RendererContext from '../components/renderer-context';

const useFormApi = () => {
  const { formOptions } = useContext(RendererContext);

  return formOptions;
};

export default useFormApi;
