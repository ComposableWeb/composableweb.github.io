import { Box, BoxProps } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';

import { NextNavLink as NavLink } from '../NextNavLink';

export const FooterNavigation: React.FC<BoxProps> = (props: PropsWithoutRef<PropsWithChildren<BoxProps>>) => (
  <Box {...props} as="nav">
    <NavLink href="/pages/imprint">Imprint</NavLink>
  </Box>
);
export default FooterNavigation;
