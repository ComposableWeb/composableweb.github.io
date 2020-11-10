import { Box, Flex, FlexProps, Heading } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';
import get from 'lodash.get';
import Image from 'next/image';
/*
 **  Block template definition for the Article-teaser block
 **/
export const ArticleTeaserBlock = {
  label: 'Article-Teaser',
  key: 'article-teaser',
  defaultItem: {
    content: '',
    heading: '',
    image: '',
    subheading: '',
    link: '',
    tags: [],
  },
  fields: [
    { name: 'content', label: 'Content', component: 'markdown' },
    { name: 'heading', label: 'Heading', component: 'text' },
    {
      name: 'image',
      label: 'Image',
      component: 'image',
      uploadDir: (): string => {
        return '/static/images/';
      },

      parse: (filename: string): string => `/static/images/${filename}`,
      previewSrc: (formValues, fieldProps): string => {
        const imageNode = get(formValues, fieldProps.input.name);
        return imageNode || '';
      },
    },
    { name: 'subheading', label: 'Sub-Heading', component: 'text' },
    { name: 'link', label: 'Link', component: 'text' },
    { name: 'tags', label: 'Tags', component: 'tags' },
  ],
};
export type ArticleTeaserProps = FlexProps & {
  data: {
    content: string;
    heading: string;
    subheading: string;
    image: string;
    link: string;
    tags: string[];
  };
};
export const ArticleTeaser: React.FC<ArticleTeaserProps> = ({
  data,
  ...props
}: PropsWithoutRef<PropsWithChildren<ArticleTeaserProps>>) => (
  <Flex {...props}>
    {data.image && <Image src={data.image} width={100} height={100} />}
    <Box>
      {data.heading && <Heading>{data.heading}</Heading>}
      {data.subheading && <Heading as="h3">{data.subheading}</Heading>}
      {data.content && <Box>{data.content}</Box>}
    </Box>
  </Flex>
);
