import { Stack, StackProps } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import Image from 'next/image';

import config from '../../config';
import NextLink from '~components/NextLink';
import Heading from '~components/Heading';

export const PageHeaderBranding: React.FC<StackProps> = (props: PropsWithoutRef<PropsWithChildren<StackProps>>) => (
  <Stack
    {...props}
    flexDirection={['row', 'row', 'row', 'column']}
    textAlign={{ lg: 'center' }}
    spacing={[0, 0, 0, 1]}
    alignItems={['center']}
    mt={{ base: 0, lg: 20 }}
    h={'60px'}
  >
    <NextLink
      href="/"
      mr={[2, 4, 4, 0]}
      display="inline-block"
      opacity={0.75}
      lineHeight={1}
      sx={{ '& img': { w: { base: '48px', lg: '160px' } } }}
    >
      <Image width={160} height={160} alt="Composable Web" src="/static/favicons/android-chrome-192x192.png" />
    </NextLink>
    <Heading
      as="h2"
      my={{ base: 0, lg: 8 }}
      lineHeight={1}
      fontSize={{ base: 'xl', lg: '3xl' }}
      fontFamily="heading"
      fontWeight="heading"
    >
      <NextLink href="/">{config.common.title.toLowerCase()}</NextLink>
    </Heading>
    <Heading as="h3" my={0} fontSize={{ base: 'md', lg: 'xl' }} display={{ base: 'none', lg: 'block' }}>
      {config.common.tagline}
    </Heading>
  </Stack>
);
export default PageHeaderBranding;
