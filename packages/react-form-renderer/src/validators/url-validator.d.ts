export interface UrlValidatorOptions {
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
}

export default function url(options: UrlValidatorOptions): RegExp;
