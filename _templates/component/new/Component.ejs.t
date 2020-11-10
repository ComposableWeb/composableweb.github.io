---
to: "<%= h.src() %>/components/<%= name %>/<%= name %>.tsx"
---
import { Box, BoxProps } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';

export const <%= name %>: React.FC<BoxProps> = (props: PropsWithoutRef<PropsWithChildren<BoxProps>>) => <Box {...props} />;
export default <%= name %>;
