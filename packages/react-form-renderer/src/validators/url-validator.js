import Validators from '../validators';
import { assign } from '../common/helpers';

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

const DEFAULT_OPTIONS = {
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
  hash: true
};

let url = (options) => buildReg(defaultOptions(options), false);

export default url;

function defaultOptions(options) {
  options = assign({}, DEFAULT_OPTIONS, options);
  options.protocols = [].concat(options.protocol || options.protocols || Validators.urlProtocols).join('|');
  return options;
}

function group(option, regPart, capture) {
  return option ? (capture ? `(${regPart})` : regPart) : '';
}

function buildReg(options, capture) {
  return new RegExp(
    '^' +
      group(true, `(?:(?:(?:${options.protocols}):)${options.emptyProtocol ? '?' : ''}\\/\\/)${options.protocolIdentifier ? '' : '?'}`, capture) +
      group(options.basicAuth, BASIC_AUTH, capture) +
      `(?:${[
        group(options.ipv4, IPV4, capture),
        group(options.ipv6, IPV6, capture),
        group(options.host, HOST, capture),
        group(options.local, 'localhost', capture)
      ]
        .filter((g) => g)
        .join('|')})` +
      group(options.port, PORT, capture) +
      group(options.path, PATH, capture) +
      group(options.search, SEARCH, capture) +
      group(options.hash, HASH, capture) +
      '$',
    'i'
  );
}
