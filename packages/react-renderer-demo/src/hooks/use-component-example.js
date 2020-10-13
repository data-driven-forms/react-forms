import { useRouter } from 'next/router';

const useComponentExample = () => {
  const { query, pathname } = useRouter();
  const activeMapper = query.mapper || 'mui';

  const component = pathname.split('/').pop();

  return [activeMapper, component];
};

export default useComponentExample;
