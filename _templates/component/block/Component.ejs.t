---
to: "<%= h.src() %>/blocks/<%= name %>.tsx"
---
import { Box, BoxProps } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';

/*
 **  Block template definition for the <%= Name %> block
 **/
export const <%= Name %>Block = {
  label: '<%= Name %>',
  key: '<%= name %>',
  defaultItem: {
    content: '',
  },
  fields: [
    { name: 'content', label: 'Content', component: 'markdown' },
  ],
};


export const <%= Name %>: React.FC<BoxProps> = (props: PropsWithoutRef<PropsWithChildren<BoxProps>>) => <Box {...props} />;
export default <%= Name %>;
