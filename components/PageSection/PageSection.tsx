import { Box, BoxProps } from '@chakra-ui/core';
import { PropsWithChildren } from 'react';

export const PageSection: React.FC<BoxProps> = ({ children, ...rest }: PropsWithChildren<BoxProps>) => (
  <Box {...rest}>
    <Box>{children}</Box>
  </Box>
);
export default PageSection;
