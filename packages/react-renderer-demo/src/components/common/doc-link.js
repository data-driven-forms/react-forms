import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('span')({});

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(props, ref) {
  const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

NextLinkComposed.propTypes = {
  to: PropTypes.string,
  linkAs: PropTypes.string,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  prefetch: PropTypes.bool,
  legacyBehavior: PropTypes.bool,
  locale: PropTypes.string,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const DocLink = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    legacyBehavior,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior,
    locale,
  };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} className={className} ref={ref} {...nextjsProps} {...other} />;
});

DocLink.propTypes = {
  role: PropTypes.any,
  noLinkStyle: PropTypes.bool,
  activeClassName: PropTypes.string,
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  linkAs: PropTypes.string,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  prefetch: PropTypes.bool,
  legacyBehavior: PropTypes.bool,
  locale: PropTypes.string,
  className: PropTypes.string,
};

export default DocLink;
