export const getScopedLink = (pathname, scope) => {
  if (scope === 'mui') {
    return pathname.replace(/^\/(pf4|pf3)/, '');
  }

  if (pathname.match(new RegExp(`^/${scope}/`))) {
    return pathname;
  }

  if (!pathname.match(/^\/(pf4|pf3)/, '/')) {
    return `/${scope}${pathname}`;
  }

  return pathname.replace(/^\/(pf4|pf3)/, `/${scope}`);
};

export const getPrefix = (pathname) => {
  if (!pathname.match(/^\/(pf4|pf3)/, '/')) {
    return 'mui';
  }

  return pathname
    .match(/^\/[a-z0-9]+\//)
    .pop()
    .replace(/\//g, '');
};
