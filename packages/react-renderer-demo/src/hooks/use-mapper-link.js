import useQueryParam from './use-query-param';
import { query } from '../components/navigation/find-connected-links';

/**
 * Appends current query mapper value to URL
 * @param {string} link url string to be appended with current mapper query param
 */
const useMapperLink = (link = '') => {
  const mapperQuery = useQueryParam('mapper');
  return link.match(query) && mapperQuery ? `${link.replace(query, '')}${mapperQuery}` : link;
};

export default useMapperLink;
