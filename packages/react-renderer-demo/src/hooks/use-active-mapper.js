import { useRouter } from 'next/router';

const useActiveMapper = () => {
  const { query } = useRouter();
  const activeMapper = query.mapper || 'mui';
  return activeMapper;
};

export default useActiveMapper;
