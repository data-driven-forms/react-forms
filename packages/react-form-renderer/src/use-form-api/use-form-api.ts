import { useContext } from 'react';
import RendererContext from '../renderer-context';
import { FormOptions } from '../renderer-context';

const useFormApi = (): FormOptions => {
  const { formOptions } = useContext(RendererContext);

  return formOptions;
};

export default useFormApi;
