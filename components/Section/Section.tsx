import { Box, Flex, FlexProps, AspectRatio, Stack } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import Image from 'next/image';
import { SectionBlockData } from '~lib/blocks/section';
import { Heading } from '~components/Heading';
import NextLink from '~components/NextLink';
export type SectionProps = FlexProps & {
  data: SectionBlockData;
};
export const Section: React.FC<SectionProps> = ({
  data,
  ...props
}: PropsWithoutRef<PropsWithChildren<SectionProps>>) => (
  <Flex {...props}>
    {data.image && (
      <AspectRatio
        ratio={1}
        maxWidth="33vh"
        w="33vh"
        h="33vh"
        minWidth="33vh"
        sx={{ '& img': { objectFit: 'cover' } }}
        _hover={{ transform: 'scale(1.05)', zIndex: 'docked', transition: 'transform 0.1s ease-in-out' }}
      >
        <NextLink href={data.link}>
          <Image src={data.image} layout="fill" />
        </NextLink>
      </AspectRatio>
    )}
    <Stack px={10}>
      {data.heading && (
        <Heading>
          <NextLink href={data.link}>{data.heading}</NextLink>
        </Heading>
      )}
      {data.subheading && (
        <Heading as="h3" size="md">
          <NextLink href={data.link}>{data.subheading}</NextLink>
        </Heading>
      )}
      {data.content && <Box>{data.content}</Box>}
    </Stack>
  </Flex>
);
export default Section;
