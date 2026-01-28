import Validators from '../validators';
import { assign } from '../common/helpers';

interface UrlOptions {
  emptyProtocol?: boolean;
  protocolIdentifier?: boolean;
  basicAuth?: boolean;
  local?: boolean;
  ipv4?: boolean;
  ipv6?: boolean;
  host?: boolean;
  port?: boolean;
  path?: boolean;
  search?: boolean;
  hash?: boolean;
  protocol?: string | string[];
  protocols?: string | string[];
}

// user:pass BasicAuth (optional)
const BASIC_AUTH = '(?:\\S+(?::\\S*)?@)?';

// IP address dotted notation octets
const IPV4 = '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';

// the IPv6 matching part is from here: https://gist.github.com/syzdek/6086792
const IPV6 =
  '((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}|::1|1::'; // eslint-disable-line max-len

// host & domain names, may end with dot
const HOST =
  // can be replaced by
  // '(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+' +
  '(?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+' +
  // TLD identifier name, may end with dot
  '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)';

// port number (optional)
const PORT = '(?::\\d{2,5})?';

// resource path (optional)
const PATH = '(?:[/][^\\s?#]*)?';

const SEARCH = '(?:[?][^\\s#]*)?';

const HASH = '(?:[#]\\S*)?';

const DEFAULT_OPTIONS: UrlOptions = {
  emptyProtocol: true,
  protocolIdentifier: true,
  basicAuth: true,
  local: true,
  ipv4: true,
  ipv6: true,
  host: true,
  port: true,
  path: true,
  search: true,
  hash: true,
};

interface ProcessedOptions extends Required<Omit<UrlOptions, 'protocol' | 'protocols'>> {
  protocols: string;
}

let url = (options?: UrlOptions): RegExp => buildReg(defaultOptions(options), false);

export default url;

function defaultOptions(options?: UrlOptions): ProcessedOptions {
  const mergedOptions = assign({}, DEFAULT_OPTIONS, options) as UrlOptions;
  return {
    ...mergedOptions,
    protocols: ([] as string[]).concat(mergedOptions.protocol || mergedOptions.protocols || Validators.urlProtocols).join('|'),
  } as ProcessedOptions;
}

function group(option: boolean, regPart: string, capture: boolean): string {
  return option ? (capture ? `(${regPart})` : regPart) : '';
}

function buildReg(options: ProcessedOptions, capture: boolean): RegExp {
  return new RegExp(
    '^' +
      group(true, `(?:(?:(?:${options.protocols}):)${options.emptyProtocol ? '?' : ''}\\/\\/)${options.protocolIdentifier ? '' : '?'}`, capture) +
      group(options.basicAuth, BASIC_AUTH, capture) +
      `(?:${[
        group(options.ipv4, IPV4, capture),
        group(options.ipv6, IPV6, capture),
        group(options.host, HOST, capture),
        group(options.local, 'localhost', capture),
      ]
        .filter((g: string) => g)
        .join('|')})` +
      group(options.port, PORT, capture) +
      group(options.path, PATH, capture) +
      group(options.search, SEARCH, capture) +
      group(options.hash, HASH, capture) +
      '$',
    'i'
  );
}
