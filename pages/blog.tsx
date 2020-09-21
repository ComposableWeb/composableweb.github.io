/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextSeo } from 'next-seo';
import BlogPostTeaser from '~components/BlogPostTeaser';

import { frontMatter as blogPosts } from './blog/**/*.mdx';
import PageSection from '~components/PageSection';

import { Text } from 'prestyled';

const url = 'https://composableweb.com/blog';
const title = 'Blog – ComposableWeb - Andreas Adam (@pixelmord)';
const description =
  'Ideas and experiments in rapid prototyping, Front-End Development, technical leadership and enterprise architecture';
const Blog = () => {
  const filteredBlogPosts = blogPosts
    .filter((post) => !post.draft)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));
  console.log(filteredBlogPosts);
  return (
    <>
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
      <PageSection>
        {!filteredBlogPosts.length && <Text>Constant procrastination led to an empty page</Text>}
        {filteredBlogPosts.map((post) => (
          <BlogPostTeaser {...post} key={post.title} />
        ))}
      </PageSection>
    </>
  );
};
export default Blog;
