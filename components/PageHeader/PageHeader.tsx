import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';

export const PageHeader: React.FC<FlexProps> = ({
  children,
  ...rest
}: PropsWithoutRef<PropsWithChildren<FlexProps>>) => {
  const bg = useColorModeValue('blue.200', 'blue.900');
  return (
    <Box as="header" backgroundColor={bg} position="relative" {...rest}>
      <Flex
        flexDirection="column"
        justifyContent={['flex-start', 'flex-start', 'flex-start', 'space-between']}
        position={{ base: 'relative', lg: 'fixed' }}
        w={{ base: '100%', lg: '350px', xl: '450px' }}
        h={{ base: '100%' }}
        top={0}
        left={0}
        bottom={0}
        zIndex={2}
      >
        <Box
          backgroundImage={`url('${require('../../public/static/images/james-owen-oFHMk5fD8-s-unsplash.jpg?resize&size=600')}')`}
          backgroundSize="cover"
          position="absolute"
          w="100%"
          h="100%"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={0}
          opacity={0.15}
          display={{ base: 'block', lg: 'block' }}
        />
        {children}
      </Flex>
    </Box>
  );
};
export default PageHeader;
