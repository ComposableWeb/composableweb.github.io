import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Text, Spinner } from '@chakra-ui/core';

import { titelize } from 'lib/slugHelpers';
import Layout from '~components/ArticleLayout';
import Heading from '~components/Heading';
import config from '../../config';
import { mdxHydrateMarkdown } from '~lib/client/utils';
import { MarkdownPageProps } from '~lib/propTypes';
import { PostFrontmatter } from '~lib/contentTypes';

export const Article = ({ file }: MarkdownPageProps<PostFrontmatter>): React.ReactElement => {
  const router = useRouter();
  const url = `${config.common.url}${router.asPath}`;

  const frontmatter = file.data.frontmatter;

  const markdown = mdxHydrateMarkdown(file.data.markdownObject, { scope: frontmatter });
  const title = `${titelize(frontmatter.title)} | ${config.common.title}`;
  const description =
    frontmatter.summary ||
    'Ideas and experiments in rapid prototyping, Front-End Development, Technical Leadership and Enterprise Architecture';
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      {router.isFallback ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <>
          <Heading as="h1">{frontmatter.title}</Heading>
          {frontmatter.summary && <Text as="p">{frontmatter.summary}</Text>}
          {markdown}
        </>
      )}
    </Layout>
  );
};

export default Article;
