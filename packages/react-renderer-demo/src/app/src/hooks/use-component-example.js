import { useRouter } from 'next/router';
import { baseExamples } from '@docs/components/navigation/examples-definitions';

const useComponentExample = () => {
  const { query, pathname } = useRouter();
  const activeMapper = query.mapper || 'mui';

  const component = pathname.split('/').pop();

  const baseStructure = baseExamples.find((item) => item.component === component);

  return [component, baseStructure, activeMapper];
};

export default useComponentExample;
