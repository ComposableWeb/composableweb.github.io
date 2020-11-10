import { Box, BoxProps, Heading } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import { FrontMatter } from 'types/mdx';
import NextLink from '~components/NextLink';

export type BlogPostProps = BoxProps & FrontMatter;
export const BlogPostTeaser: React.FC<BoxProps> = ({
  title,
  path,
  readingTime,
}: PropsWithoutRef<PropsWithChildren<BlogPostProps>>) => (
  <NextLink css={{ textDecoration: 'none' }} href={`${path}`}>
    <Heading as="h2">{title}</Heading>
    <Box>{readingTime.text}</Box>
  </NextLink>
);
export default BlogPostTeaser;
