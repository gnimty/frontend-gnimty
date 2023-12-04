import Link from 'next/link';
import { useRouter } from 'next/router';

import type { Theme, Interpolation } from '@emotion/react';
import type { LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

interface ActiveLinkProps extends LinkProps, Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps> {
  inActiveCSS: Interpolation<Theme>;
  activeCSS: Interpolation<Theme>;
}

export default function ActiveLink(props: ActiveLinkProps) {
  const { inActiveCSS, activeCSS, href, ...restProps } = props;
  const router = useRouter();
  const hrefPathname = typeof href === 'string' ? href.split('?')[0] : href.pathname;

  const isActive = router.pathname === hrefPathname;

  return <Link css={isActive ? activeCSS : inActiveCSS} href={href} {...restProps} />;
}
