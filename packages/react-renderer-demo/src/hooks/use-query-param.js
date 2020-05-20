import { useRouter } from 'next/router';
/**
 * Returns a value of given query param from URL
 * @param {string} param name of the query param value to be extracted from URL
 */
const useQueryParam = (param) => {
  const { asPath } = useRouter();
  if (!param) {
    return '';
  }

  const queryParam = new URLSearchParams(`?${asPath.split('?').pop()}`).get(param);
  if (!queryParam) {
    return '';
  }

  return `?${param}=${queryParam}`;
};

export default useQueryParam;
