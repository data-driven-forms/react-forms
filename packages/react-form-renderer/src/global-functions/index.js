export function __(translateThis) {
  if (window.__) {
    return window.__(translateThis);
  }

  return translateThis;
}

export function sprintf(mask, ...rest) {
  if (window.sprintf) {
    return window.sprintf(mask, ...rest);
  }

  return mask;
}
