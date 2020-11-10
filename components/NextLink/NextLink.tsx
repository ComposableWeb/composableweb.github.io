import { Link, LinkProps } from '@chakra-ui/core';
import { PropsWithChildren } from 'react';
import { default as NLink, LinkProps as NLinkProps } from 'next/link';

type NextLinkProps = Omit<LinkProps, 'as'> & NLinkProps;

export const NextLink: React.FC<NextLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  ...rest
}: PropsWithChildren<NextLinkProps>) => (
  <NLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    passHref={passHref}
    prefetch={prefetch}
  >
    <Link {...rest} />
  </NLink>
);
export default NextLink;
