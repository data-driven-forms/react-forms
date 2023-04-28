import { useRouter } from 'next/router';

const useComponentExample = () => {
  const { query, pathname } = useRouter();
  const activeMapper = query.mapper || 'mui';
  const activeSchema = query.schema || '';

  const component = pathname.split('/').pop();

  return [activeMapper, component, activeSchema];
};

export default useComponentExample;
