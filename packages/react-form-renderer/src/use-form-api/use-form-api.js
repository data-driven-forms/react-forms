import { useContext } from 'react';
import RendererContext from '../renderer-context';

const useFormApi = () => {
  const { formOptions } = useContext(RendererContext);

  return formOptions;
};

export default useFormApi;
