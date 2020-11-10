import { Box, BoxProps, Divider, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { NextNavLink as NavLink } from '../NextNavLink';

export const MainNavigation: React.FC<BoxProps> = (props: PropsWithoutRef<PropsWithChildren<BoxProps>>) => {
  const { isOpen, onToggle } = useDisclosure();
  const { asPath } = useRouter();
  const color = useColorModeValue('gray.700', 'gray.50');
  const colorActive = useColorModeValue('pink.800', 'pink.200');
  const borderColor = useColorModeValue('teal.600', 'blue.600');
  return (
    <Box {...props} as="nav" position="relative">
      <IconButton
        icon={<FiMenu style={{ display: 'inline-block' }} />}
        aria-label="Show Navigation"
        position="absolute"
        bottom="calc(100% + 10px)"
        right="0"
        onClick={onToggle}
        display={{ lg: 'none' }}
        variant="ghost"
      />
      <Box display={{ base: `${isOpen ? 'block' : 'none'}`, lg: 'block' }} pt={5} pb={8}>
        <NavLink href="/resume/en" color={asPath.startsWith('/resume') ? colorActive : color}>
          About me
        </NavLink>
        <Divider my={2} borderColor={borderColor} />
        <NavLink href="/blog" color={asPath.startsWith('/blog') ? colorActive : color}>
          Writing
        </NavLink>
        <Divider my={2} borderColor={borderColor} />
        <NavLink href="/code-recipes" color={asPath.startsWith('/code-recipes') ? colorActive : color}>
          Code Recipes
        </NavLink>
      </Box>
    </Box>
  );
};
export default MainNavigation;
