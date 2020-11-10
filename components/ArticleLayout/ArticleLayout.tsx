import { Box, BoxProps, Flex } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import TinaEditLink from '~components/TinaEditLink';

export const ArticleLayout: React.FC<BoxProps> = ({
  children,
  ...rest
}: PropsWithoutRef<PropsWithChildren<BoxProps>>) => (
  <Box as="article" {...rest} mx={['auto']} w={['90%', '90%', '80%', '100%']} maxWidth="70em" p={[1, 4, 6, 8, 10]}>
    <Flex justifyContent="flex-end">
      <TinaEditLink mb={2} />
    </Flex>

    {children}
  </Box>
);
export default ArticleLayout;
